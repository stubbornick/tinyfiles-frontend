import React from 'react';
import readableFileSize from 'filesize';
import { Download as DownloadIcon } from 'react-feather';

import { fileStore } from './fileStore';
import { getDownloadLink } from '../api';
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

  render(): JSX.Element {
    const { file } = this.state;

    return (
      <tr key={file.id}>
        <td>{file.name}</td>
        <td>{file.id}</td>
        <td>{readableFileSize(file.size)}</td>
        <td>
          <button
            className="btn btn-inline btn-outline-secondary"
            type="button"
          >
            <a href={getDownloadLink(file.id, file.name)}>
              <DownloadIcon />
              Download
            </a>
          </button>
          <button
            className="btn btn-inline btn-outline-secondary"
            type="button"
          >
            Rename
          </button>
          <button
            className="btn btn-inline btn-outline-danger"
            type="button"
            onClick={(): Promise<void> => fileStore.deleteFile(file)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
