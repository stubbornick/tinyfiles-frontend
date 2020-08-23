import React from 'react';
import readableFileSize from 'filesize';
import moment from 'moment';
import { Download as DownloadIcon } from 'react-feather';

import { FileUploadRaw } from './FileUploadRaw';
import { fileStore } from './fileStore';
import { getDownloadLink } from '../api';
import { alertStore } from '../AlertModule';
import { FileInterface } from '../types';

interface Props {
  file: FileInterface;
}

type State = Props;

export class FileTableRaw extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { file: props.file };
  }

  delete = async (): Promise<void> => {
    const { file } = this.state;
    await fileStore.deleteFile(file);
    alertStore.showInfo(`File '${file.name}' was deleted!`, 'Deleted!');
  };

  render(): JSX.Element {
    const { file } = this.state;

    return (
      <>
        <tr>
          <td>{file.name}</td>
          <td>{file.id}</td>
          <td>{readableFileSize(file.size)}</td>
          <td>
            {file.uploadedAt ? moment(file.uploadedAt).format('lll') : '—'}
          </td>
          <td className="col-3">
            {file.uploadedAt && (
              <button
                className="btn btn-inline btn-outline-secondary"
                type="button"
              >
                <a href={getDownloadLink(file.id, file.name)}>
                  <DownloadIcon />
                  Download
                </a>
              </button>
            )}
            <button
              className="btn btn-inline btn-outline-danger"
              type="button"
              onClick={this.delete}
            >
              Delete
            </button>
          </td>
        </tr>
        {!file.uploadedAt && <FileUploadRaw file={file} />}
      </>
    );
  }
}
