import React from 'react';

import { fileStore } from './fileStore';
import { FileTableRaw } from './FileTableRaw';
import { MessageRaw } from './MessageRaw';
import { FileInterface } from '../types';

interface State {
  files: FileInterface[];
  fetched: boolean;
}

export class FileTable extends React.Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { files: [], fetched: false };
  }

  public componentDidMount(): void {
    fileStore.on('update', this.updateFiles);
    fileStore.refetchFiles();
  }

  public componentWillUnmount(): void {
    fileStore.removeListener('update', this.updateFiles);
  }

  private updateFiles = (files: FileInterface[]): void => {
    this.setState({
      files,
      fetched: true,
    });
  };

  private renderFilesTable = (): JSX.Element | JSX.Element[] => {
    const { files, fetched } = this.state;

    if (fetched) {
      if (files.length > 0) {
        return files.map((file) => <FileTableRaw key={file.id} file={file} />);
      }

      return <MessageRaw message="There is no uploaded files yet" />;
    }

    return <MessageRaw message="Loading data..." />;
  };

  render(): JSX.Element {
    return (
      <div className="table-responsive border rounded">
        <table className="table table-hover table-sm mb-0">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>{this.renderFilesTable()}</tbody>
        </table>
      </div>
    );
  }
}
