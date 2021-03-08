import React from 'react';

import './AlertModule.css';
import { alertStore } from './alertStore';
import { Alert } from './Alert';
import { AlertInterface } from '../types';

interface State {
  alerts: AlertInterface[];
}

export class AlertModule extends React.Component<
  Record<string, unknown>,
  State
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { alerts: [] };
  }

  public componentDidMount(): void {
    alertStore.on('update', this.updateAlerts);
  }

  public componentWillUnmount(): void {
    alertStore.removeListener('update', this.updateAlerts);
  }

  updateAlerts = (alerts: AlertInterface[]): void => {
    this.setState({ alerts });
  };

  render(): JSX.Element {
    const { alerts } = this.state;

    return (
      <div
        id="notification-container"
        className="d-flex flex-column align-items-end m-4"
      >
        {alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} />
        ))}
      </div>
    );
  }
}
