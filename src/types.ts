export interface FileInterface {
  id: string;
  name: string;
  size: number;
  fileObject: File;
  uploading: boolean;
  uploadedSize: number;
  uploadedAt?: Date;
}

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface AlertInterface {
  id: number;
  title?: string;
  message: string;
  type: AlertType;
}
