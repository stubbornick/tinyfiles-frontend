import React from 'react';

import './FileModule.css';
import { FileTable } from './FileTable';
import { FileUploadButton } from './FileUploadButton';

export function FileModule(): JSX.Element {
  return (
    <>
      <div className="d-flex justify-content-start">
        <h4 className="d-flex px-2 text-muted">Uploaded files</h4>
        <FileUploadButton />
      </div>
      <FileTable />
    </>
  );
}
