import React from 'react';
import { PlusCircle } from 'react-feather';
import api from '../api';
import { FileHandler } from '../types';

const MIN_UPLOAD_CHUNK_SIZE = 1024*50 // 50kb
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

interface Props {
  newFileHandler: FileHandler
}

interface State {
  selectedFile: any,
  uploaded: number
}

export default class FileUploader extends React.Component<Props, State> {
  private fileInput = React.createRef<HTMLInputElement>();
  private newFileHandler: FileHandler;

  constructor(props: Props) {
    super(props);
    this.newFileHandler = props.newFileHandler;
    this.fileInput = React.createRef();
    this.state = {
      selectedFile: null,
      uploaded: 0
    };
  }

  private openFileSelection = () => {
    this.fileInput.current?.click();
  };

  private onFileSelected = (event: any) => {
    this.setState({
      selectedFile: event.target.files[0],
      uploaded: 0
    }, this.uploadFile);
  };

  private uploadFile = async () => {
    const file = this.state.selectedFile;

    const createResponse = await api.post('/files', {
      name: file.name,
      size: file.size,
    });

    if (createResponse.status === 201) {
      const newFileId = createResponse.data.id;

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

      this.newFileHandler(createResponse.data);
    }
  }

  render() {
    return (
      <div className="d-flex">
        <input
          type="file"
          className="d-none"
          onChange={this.onFileSelected}
          ref={this.fileInput}
        />
        <button
          className="btn btn-inline btn-outline-secondary"
          onClick={this.openFileSelection}
          title="Upload new file"
        >
          <PlusCircle size={18} />
        </button>
      </div>
    );
  }
}
