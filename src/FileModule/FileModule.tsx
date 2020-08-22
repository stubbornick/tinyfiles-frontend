import React from 'react';

import './FileModule.css';
import { FileTable } from './FileTable';
import { FileUploader } from './FileUploader';

export function FileModule() {
  return (
    <div className="pt-2 my-md-3 p-md-3">
      <div className="d-flex justify-content-start">
        <h4 className="d-flex px-2 text-muted">Uploaded files</h4>
        <FileUploader />
      </div>
      <FileTable />
    </div>
  );
}
