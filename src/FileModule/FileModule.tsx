import React from 'react';

import './FileModule.css';
import { fileStore } from './fileStore';
import { FileTable } from './FileTable';
import { FileUploadButton } from './FileUploadButton';
import { alertStore } from '../AlertModule';
import { FileInterface } from '../types';

const onFileUploaded = (file: FileInterface): void => {
  alertStore.showSuccess(`File '${file.name}' uploaded!`);
};

const onFileDeleted = (file: FileInterface): void => {
  alertStore.showWarning(`File '${file.name}' deleted!`);
};

export class FileModule extends React.Component<{}, {}> {
  public componentDidMount(): void {
    fileStore.on('uploaded', onFileUploaded);
    fileStore.on('deleted', onFileDeleted);
    fileStore.refetchFiles();
  }

  public componentWillUnmount(): void {
    fileStore.removeListener('uploaded', onFileUploaded);
    fileStore.removeListener('deleted', onFileDeleted);
  }

  render(): JSX.Element {
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
}
