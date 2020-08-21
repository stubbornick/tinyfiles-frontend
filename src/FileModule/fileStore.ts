import { EventEmitter } from 'events'

import api from '../api';
import { FileInterface } from '../types'

const MIN_UPLOAD_CHUNK_SIZE = 1024*50      // 50kb
const MAX_UPLOAD_CHUNK_SIZE = 1024*1024*50 // 50mb
const MIN_REQUEST_TIME = 3
const MAX_REQUEST_TIME = 10

let uploadChunkSize = 1024*200; // 200kb

const adjustChunkSize = (requestStartTime: number) => {
  const requestTime = (Date.now() - requestStartTime) / 1000;
  if (requestTime > MAX_REQUEST_TIME && uploadChunkSize > MIN_UPLOAD_CHUNK_SIZE) {
    uploadChunkSize = uploadChunkSize / 2;
  } else if (requestTime < MIN_REQUEST_TIME && uploadChunkSize < MAX_UPLOAD_CHUNK_SIZE) {
    uploadChunkSize = uploadChunkSize * 2;
  }
}

class FileStore extends EventEmitter {
  files: FileInterface[]

  constructor() {
    super();
    this.files = [];
  }

  public async refetchFiles() {
    const result = await api.get('/files');
    this.update(result.data);
  }

  public async createAndUploadFile(file: File) {
    const createResponse = await api.post<FileInterface>('/files', {
      name: file.name,
      size: file.size,
    });

    if (createResponse.status === 201) {
      const newFile = createResponse.data;

      await this.uploadFile(file, newFile.id)

      this.files.push(newFile);
      this.update();
    }
  }

  public async deleteFile(file: FileInterface) {
    const result = await api.delete(`/files/${file.id}`);

    if (result.status === 200) {
      this.update(this.files.filter(f => f.id !== file.id));
    }
  }

  private async uploadFile(file: File, newFileId: string) {
    for (let chunkFrom = 0; chunkFrom < file.size;) {
      const currentChunkSize = Math.min(file.size - chunkFrom, uploadChunkSize);
      const chunkTo = chunkFrom + currentChunkSize;

      const requestStartTime = Date.now();

      const res = await api.patch(
        `/files/upload/${newFileId}`,
        file.slice(chunkFrom, chunkTo),
        {
          headers: {
            'Content-Type': 'text/octet-stream',
          },
        }
      );

      if (res.status !== 200) {
        console.error("Bad answer from server while uploading:", res)
        return;
      }

      chunkFrom = chunkTo;

      if (currentChunkSize === uploadChunkSize) {
        adjustChunkSize(requestStartTime)
      }
    }
  }

  private async update(files: FileInterface[] | null = null) {
    if (files) {
      this.files = files;
    }

    this.emit('update', this.files);
  }
}

export const fileStore = new FileStore()
