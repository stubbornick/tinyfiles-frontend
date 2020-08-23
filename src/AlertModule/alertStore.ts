import { EventEmitter } from 'events';

import { AlertInterface, AlertType } from '../types';

class AlertStore extends EventEmitter {
  alerts: AlertInterface[];

  constructor() {
    super();
    this.alerts = [];
  }

  public showSuccess(message: string, title: string | undefined): void {
    this.addAlert('success', message, title);
  }

  public showInfo(message: string, title: string | undefined): void {
    this.addAlert('info', message, title);
  }

  public showError(message: string, title: string | undefined): void {
    this.addAlert('danger', message, title);
  }

  private addAlert(
    type: AlertType,
    message: string,
    title: string | undefined
  ): void {
    this.alerts.push({
      id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
      type,
      title,
      message,
    });

    this.emit('update', this.alerts);
  }

  public async deleteAlert(alertToDelete: AlertInterface): Promise<void> {
    this.alerts = this.alerts.filter((alert) => alert.id !== alertToDelete.id);
    this.emit('update', this.alerts);
  }
}

export const alertStore = new AlertStore();
