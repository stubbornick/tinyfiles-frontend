import React from 'react';

import { fileStore } from './fileStore'
import { FileTableRaw } from './FileTableRaw'
import { MessageRaw } from './MessageRaw'
import { FileInterface, NoProps } from '../types';

interface State {
  files: FileInterface[],
  fetched: boolean,
}

export class FileTable extends React.Component<NoProps, State> {
  constructor(props: NoProps) {
    super(props);
    this.state = { files: [], fetched: false };
  }

  public componentDidMount = async () => {
    fileStore.on('update', this.updateFiles);
    await fileStore.refetchFiles();
  }

  public componentWillUnmount = async () => {
    fileStore.removeListener('update', this.updateFiles);
  }

  private updateFiles = (files: FileInterface[]) => {
    this.setState({
      files,
      fetched: true
    });
  }

  private renderFilesTable = () => {
    if (this.state.fetched) {
      if (this.state.files.length > 0) {
        return this.state.files.map(
          (file) => (<FileTableRaw file={file}/>)
        );
      }

      return (<MessageRaw message="There is no uploaded files yet" />);
    }

    return (<MessageRaw message="Loading data..." />);
  }

  render() {
    return (
      <div className="table-responsive border rounded">
        <table className="table table-hover table-sm mb-0">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Size</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {this.renderFilesTable()}
          </tbody>
        </table>
      </div>
    );
  }
}
