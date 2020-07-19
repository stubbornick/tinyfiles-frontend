import React from 'react';
import { RefreshCcw } from 'react-feather';
import api from '../api';
import { File } from '../types';
import FileTable from './FileTable';
import FileUploader from './FileUploader';

interface Props {
}

interface State {
  files: File[],
  fetched: boolean
}

export default class FileModule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { files: [], fetched: false };
  }

  public componentDidMount = () => {
    this.fetchFiles();
  }

  private fetchFiles = async () => {
    const result = await api.get('/files');
    this.setState({
      files: result.data,
      fetched: true
    });
  }

  private addFile = (file: File) => {
    const { files } = this.state;
    files.push(file);
    this.setState({ files });
  }

  private deleteFile = async (delFile: File) => {
    const result = await api.delete(`/files/${delFile.id}`);

    if (result.status === 200) {
      this.setState({
        files: this.state.files.filter(f => f.id !== delFile.id)
      });
    }
  }

  render() {
    return (
      <div className="pt-2 my-md-3 p-md-3">
        <div className="d-flex justify-content-start">
          <h4 className="d-flex px-2 text-muted">Uploaded files</h4>
          <button
            className="btn btn-inline btn-outline-secondary"
            onClick={this.fetchFiles}
            title="Refresh list"
          >
            <RefreshCcw size={18} />
          </button>
          <FileUploader newFileHandler={this.addFile} />
        </div>
        <FileTable
          files={this.state.files}
          fetched={this.state.fetched}
          deleteFile={this.deleteFile}
        />
      </div>
    );
  }
}
