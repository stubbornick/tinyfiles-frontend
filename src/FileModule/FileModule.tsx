import React from 'react';
import { RefreshCcw } from 'react-feather';

import './FileModule.css';
import { FileTable } from './FileTable';
import { FileUploader } from './FileUploader';

export function FileModule() {
  return (
    <div className="pt-2 my-md-3 p-md-3">
      <div className="d-flex justify-content-start">
        <h4 className="d-flex px-2 text-muted">Uploaded files</h4>
        <button
          className="btn btn-inline btn-outline-secondary"
          title="Refresh list"
        >
          <RefreshCcw size={18} />
        </button>
        <FileUploader />
      </div>
      <FileTable />
    </div>
  );
}
