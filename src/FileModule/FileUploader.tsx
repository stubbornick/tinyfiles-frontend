import React from 'react';
import { PlusCircle } from 'react-feather';

interface Props {
}

interface State {
  selectedFile: any
}

export default class FileUploader extends React.Component<Props, State> {
  private fileInput = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = { selectedFile: null };
  }

  private onFileUpload = () => {
    console.log('UPLOAD', this.state.selectedFile);
  };

  private onFileChange = (event: any) => {
    console.log('FILE CHANGE', event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  };

  render() {
    return (
      <div className="d-inline-flex">
        <input
          type="file"
          className="d-none"
          onChange={this.onFileChange}
          ref={this.fileInput}
        />
        <button className="btn btn-inline" onClick={() => {
          this.fileInput.current?.click();
        }}>
          <PlusCircle />
        </button>
      </div>
    );
  }
}
