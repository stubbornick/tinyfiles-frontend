import React from 'react';
import { File } from '../types';
import FileTable from './FileTable';
import FileUploader from './FileUploader';

interface Props {
}

interface State {
  files: File[]
}

export default class FileModule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { files: [] };
  }

  render() {
    return (
      <div className="pt-2 my-md-3 p-md-3">
        <h4 className="text-muted">
          Uploaded files
          <FileUploader />
        </h4>
        <FileTable files={ this.state.files } />
      </div>
    );
  }
}
