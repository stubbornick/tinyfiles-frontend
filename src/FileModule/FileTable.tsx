import React from 'react';
import readableFileSize from 'filesize';
import { Download } from 'react-feather';
import './FileModule.css';
import { File } from '../types';

const renderFileRaw = (file: File) => {
  return (
    <tr key={file.id}>
      <td>{file.name}</td>
      <td>{file.id}</td>
      <td>{readableFileSize(file.size)}</td>
      <td>
        <button className="btn btn-inline btn-outline-secondary">
          <Download />
          Download
        </button>
        <button className="btn btn-inline btn-outline-secondary">Rename</button>
        <button className="btn btn-inline btn-outline-danger">Delete</button>
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

const renderFilesTable = (files: File[], fetched: boolean) => {
  if (fetched) {
    if (files.length > 0) {
      return files.map((file) => renderFileRaw(file));
    }

    return renderMessageRaw("There is no uploaded files yet");
  }

  return renderMessageRaw("Loading data...");
}

interface Props {
  files: File[],
  fetched: boolean
}

export default function FileTable({ files, fetched }: Props) {
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
          {renderFilesTable(files, fetched)}
        </tbody>
      </table>
    </div>
  );
}
