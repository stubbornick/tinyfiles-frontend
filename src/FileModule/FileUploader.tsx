import React from 'react';
import { PlusCircle } from 'react-feather';

import { fileStore } from "./fileStore";

interface Props {
}

interface State {
}

export class FileUploader extends React.Component<Props, State> {
  private fileInput = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.fileInput = React.createRef();
  }

  private openFileSelection = () => {
    this.fileInput.current?.click();
  };

  private onFileSelected = (event: any) => {
    const file = event.target.files[0];
    return fileStore.createAndUploadFile(file);
  };

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
