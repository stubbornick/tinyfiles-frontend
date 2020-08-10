import React from 'react';
import { PlusCircle } from 'react-feather';
import api from '../api';
import { FileHandler } from '../types';

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
      const file = this.state.selectedFile;
      const newFileId = createResponse.data.id;
      const uploadResult = await api.patch(
        `/files/upload/${newFileId}`,
        file,
        {
          headers: {
            'Content-Type': 'text/octet-stream',
          }
        }
      );
      if (uploadResult.status === 200) {
        this.newFileHandler(createResponse.data);
      }
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
