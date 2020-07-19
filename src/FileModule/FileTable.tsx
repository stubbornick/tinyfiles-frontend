import React from 'react';
import readableFileSize from 'filesize';
import { Download } from 'react-feather';
import './FileModule.css';
import { File } from '../types';

const renderFileRaw = (file: File) => {
  return (
    <tr>
      <td>{file.name}</td>
      <td>{file.id}</td>
      <td>{readableFileSize(file.size)}</td>
      <td>
        <button className="btn btn-inline btn-outline-secondary">
          <span><Download /></span>
          Download
        </button>
        <button className="btn btn-inline btn-outline-secondary">Rename</button>
        <button className="btn btn-inline btn-outline-danger">Delete</button>
      </td>
    </tr>
  );
}

const renderEmptyRaw = () => {
  return (
    <tr className="text-center">
      <td colSpan={4}>
        There is no uploaded files yet
      </td>
    </tr>
  )
}

const renderFilesTable = (files: File[]) => {
  if (files.length > 0) {
    return files.map((file) => renderFileRaw(file));
  }

  return renderEmptyRaw();
}

interface Props {
  files: File[]
}

export default function FileTable({ files }: Props) {
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
          {renderFilesTable(files)}
        </tbody>
      </table>
    </div>
  );
}
