export interface FileInterface {
  id: string;
  name: string;
  size: number;
  uploadedSize?: number;
  uploadedAt?: Date;
}

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface AlertInterface {
  id: number;
  title?: string;
  message: string;
  type: AlertType;
}
