import React from 'react';

import { alertStore } from './alertStore';
import { AlertInterface } from '../types';

const DESTROY_DELAY = 5000;

interface Props {
  alert: AlertInterface;
}

interface State extends Props {
  destroyTimeout: NodeJS.Timeout;
}

export class Alert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { alert } = props;

    this.state = {
      alert,
      destroyTimeout: setTimeout(this.destroy, DESTROY_DELAY),
    };
  }

  destroy = (): void => {
    const { alert, destroyTimeout } = this.state;
    clearTimeout(destroyTimeout);
    alertStore.deleteAlert(alert);
  };

  render(): JSX.Element {
    const {
      alert: { title, message, type },
    } = this.state;

    return (
      <div className={`alert alert-${type} alert-dismissible`} role="alert">
        {title && <strong>{title}</strong>} {message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={this.destroy}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
