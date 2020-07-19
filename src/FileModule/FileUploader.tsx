import React from 'react';
import { PlusCircle } from 'react-feather';
import api from '../api';
import { File, FileHandler } from '../types';

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
    const result = await api.post('/files', {
      name: this.state.selectedFile.name
    });

    if (result.status === 201) {
      this.newFileHandler(result.data);
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
