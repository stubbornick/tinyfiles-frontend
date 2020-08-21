import React from 'react';
import readableFileSize from 'filesize';
import { Download as DownloadIcon } from 'react-feather';

import { fileStore } from './fileStore'
import { getDownloadLink } from '../api';
import { FileInterface, NoProps } from '../types';

const renderFileRaw = (file: FileInterface) => {
  return (
    <tr key={file.id}>
      <td>{file.name}</td>
      <td>{file.id}</td>
      <td>{readableFileSize(file.size)}</td>
      <td>
        <button className="btn btn-inline btn-outline-secondary">
          <a href={getDownloadLink(file.id, file.name)}>
            <DownloadIcon />
            Download
          </a>
        </button>
        <button className="btn btn-inline btn-outline-secondary">Rename</button>
        <button
          className="btn btn-inline btn-outline-danger"
          onClick={() => fileStore.deleteFile(file)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

const renderMessageRaw = (message: string) => {
  return (
    <tr className="text-center">
      <td colSpan={4}>
        {message}
      </td>
    </tr>
  )
}

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
          (file) => renderFileRaw(file)
        );
      }

      return renderMessageRaw("There is no uploaded files yet");
    }

    return renderMessageRaw("Loading data...");
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
