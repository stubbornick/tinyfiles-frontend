import { EventEmitter } from 'events';

import { api } from '../api';
import { FileInterface } from '../types';

const MIN_UPLOAD_CHUNK_SIZE = 1024 * 50; // 50kb
const MAX_UPLOAD_CHUNK_SIZE = 1024 * 1024 * 50; // 50mb
const MIN_REQUEST_TIME = 3;
const MAX_REQUEST_TIME = 10;

let uploadChunkSize = 1024 * 200; // 200kb

const adjustChunkSize = (requestStartTime: number): void => {
  const requestTime = (Date.now() - requestStartTime) / 1000;
  if (
    requestTime > MAX_REQUEST_TIME &&
    uploadChunkSize > MIN_UPLOAD_CHUNK_SIZE
  ) {
    uploadChunkSize /= 2;
  } else if (
    requestTime < MIN_REQUEST_TIME &&
    uploadChunkSize < MAX_UPLOAD_CHUNK_SIZE
  ) {
    uploadChunkSize *= 2;
  }
};

class FileStore extends EventEmitter {
  files: FileInterface[];

  constructor() {
    super();
    this.files = [];
  }

  public async refetchFiles(): Promise<void> {
    const result = await api.get<FileInterface[]>('/files');
    this.update(
      result.data.map((file) => {
        file.uploading = false;
        return file;
      })
    );
  }

  public async createAndUploadFile(file: File): Promise<void> {
    const createResponse = await api.post<FileInterface>('/files', {
      name: file.name,
      size: file.size,
    });

    if (createResponse.status === 201) {
      const newFile = createResponse.data;
      newFile.fileObject = file;

      this.files.push(newFile);
      this.update();

      if (await this.uploadFile(newFile)) {
        this.emit('uploaded', newFile);
      }
    }
  }

  public createAndUploadFiles(files: FileList): Promise<void>[] {
    const promises = [];
    for (let i = 0; i < files.length; i += 1) {
      promises.push(this.createAndUploadFile(files[i]));
    }
    return promises;
  }

  public async deleteFile(file: FileInterface): Promise<void> {
    const result = await api.delete(`/files/${file.id}`);

    if (result.status === 200) {
      this.update(this.files.filter((f) => f.id !== file.id));
      this.emit('deleted', file);
    }
  }

  public async uploadFile(file: FileInterface): Promise<boolean> {
    if (!file.fileObject) {
      throw new Error('Uploding: cannot find fileObject!');
    }

    const { fileObject } = file;

    file.uploading = true;

    for (let chunkFrom = file.uploadedSize; chunkFrom < fileObject.size; ) {
      if (!file.uploading) {
        return false;
      }

      const currentChunkSize = Math.min(
        fileObject.size - chunkFrom,
        uploadChunkSize
      );
      const chunkTo = chunkFrom + currentChunkSize;

      const requestStartTime = Date.now();

      // eslint-disable-next-line no-await-in-loop
      const res = await api.patch<FileInterface>(
        `/files/upload/${file.id}`,
        fileObject.slice(chunkFrom, chunkTo),
        {
          headers: {
            'Content-Type': 'text/octet-stream',
          },
        }
      );

      if (res.status !== 200) {
        console.error('Bad answer from server while uploading:', res);
        file.uploading = false;
        return false;
      }

      if (currentChunkSize === uploadChunkSize) {
        adjustChunkSize(requestStartTime);
      }

      file.uploadedAt = res.data.uploadedAt;
      file.uploadedSize = res.data.uploadedSize;

      this.update();

      chunkFrom = chunkTo;
    }

    file.uploading = false;

    return true;
  }

  private update(files?: FileInterface[]): void {
    if (files) {
      this.files = files;
    }

    this.emit('update', this.files);
  }
}

export const fileStore = new FileStore();
