import React from 'react';
import { PlusCircle } from 'react-feather';

import { fileStore } from './fileStore';

export class FileUploadButton extends React.Component<{}, {}> {
  private fileInput = React.createRef<HTMLInputElement>();

  constructor(props: {}) {
    super(props);
    this.fileInput = React.createRef();
  }

  private openFileSelection = (): void => {
    this.fileInput.current?.click();
  };

  private onFileSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      fileStore.createAndUploadFile(file);
    }
  };

  render(): JSX.Element {
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
          type="button"
          onClick={this.openFileSelection}
          title="Upload new file"
        >
          <PlusCircle size={18} />
        </button>
      </div>
    );
  }
}
