import React from 'react';
import readableFileSize from 'filesize';

import { FileInterface } from '../types';

interface Props {
  file: FileInterface;
}

export function FileUploadRaw(props: Props): JSX.Element {
  const { file } = props;

  const uploaded = file.uploadedSize ? file.uploadedSize : 0;
  const percent = Math.round((uploaded / file.size) * 100);

  return (
    <tr>
      <td colSpan={5}>
        <div className="d-flex align-items-center px-2">
          <span className="stars">
            <span>Uploading:</span>
          </span>
          <div className="col">
            <div className="progress">
              <div className="progress-bar" style={{ width: `${percent}%` }} />
            </div>
          </div>
          <span className="percent">
            <span>{`${readableFileSize(uploaded)} / ${readableFileSize(
              file.size
            )} (${percent}%)`}</span>
          </span>
        </div>
      </td>
    </tr>
  );
}
