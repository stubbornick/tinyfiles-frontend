import React from 'react';
import readableFileSize from 'filesize';
import { Download as DownloadIcon } from 'react-feather';
import './FileModule.css';
import { getDownloadLink } from '../api';
import { File, FileHandler } from '../types';

const renderFileRaw = (file: File, deleteFile: FileHandler) => {
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
          onClick={() => deleteFile(file)}
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

const renderFilesTable = (props: Props) => {
  if (props.fetched) {
    if (props.files.length > 0) {
      return props.files.map((file) => renderFileRaw(file, props.deleteFile));
    }

    return renderMessageRaw("There is no uploaded files yet");
  }

  return renderMessageRaw("Loading data...");
}

interface Props {
  files: File[],
  fetched: boolean,
  deleteFile: FileHandler
}

export default function FileTable(props: Props) {
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
          {renderFilesTable(props)}
        </tbody>
      </table>
    </div>
  );
}
