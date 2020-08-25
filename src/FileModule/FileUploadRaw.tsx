import React from 'react';
import { Pause as PauseIcon, Play as PlayIcon } from 'react-feather';
import readableFileSize from 'filesize';

import { fileStore } from './fileStore';
import { alertStore } from '../AlertModule';
import { FileInterface } from '../types';

interface Props {
  file: FileInterface;
}

export class FileUploadRaw extends React.Component<Props, Props> {
  private fileInput = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.state = { file: props.file };
  }

  private openFileSelection = (): void => {
    this.fileInput.current?.click();
  };

  private onFileSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { file } = this.state;

    if (event.target.files && event.target.files[0]) {
      const fileObject = event.target.files[0];

      if (file.name !== fileObject.name || file.size !== fileObject.size) {
        alertStore.showError(
          'File name and/or size mismatched. ' +
            'Please choose same file as the one was interrupted',
          'Error!'
        );
        return;
      }

      file.fileObject = fileObject;
      this.resumeFileUploading();
    }
  };

  private resumeFileUploading = (): void => {
    const { file } = this.state;

    if (!file.fileObject) {
      this.openFileSelection();
      return;
    }

    fileStore.uploadFile(file);
  };

  private pauseFileUploading = (): void => {
    const { file } = this.state;
    file.uploading = false;
  };

  render(): JSX.Element {
    const { file } = this.state;

    const uploaded = file.uploadedSize ? file.uploadedSize : 0;
    const percent = Math.round((uploaded / file.size) * 100);

    return (
      <tr>
        <td colSpan={4}>
          <div className="d-flex align-items-center px-2">
            <span className="stars">
              <span>Uploading:</span>
            </span>
            <div className="col">
              <div className="progress">
                <div
                  className={`progress-bar ${
                    file.uploading ? '' : 'progress-bar-striped'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <span className="percent">
              <span>{`${readableFileSize(uploaded)} / ${readableFileSize(
                file.size
              )} (${percent}%)`}</span>
            </span>
          </div>
        </td>
        <td>
          {file.uploading ? (
            <button
              className="btn btn-inline btn-outline-secondary"
              type="button"
              onClick={this.pauseFileUploading}
              title="Pause uploading"
            >
              <PauseIcon /> Pause
            </button>
          ) : (
            <>
              <input
                type="file"
                className="d-none"
                onChange={this.onFileSelected}
                ref={this.fileInput}
              />
              <button
                className="btn btn-inline btn-outline-secondary"
                type="button"
                onClick={this.resumeFileUploading}
                title="Resume uploading"
              >
                <PlayIcon /> Resume
              </button>
            </>
          )}
        </td>
      </tr>
    );
  }
}
