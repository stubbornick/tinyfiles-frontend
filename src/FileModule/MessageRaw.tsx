import React from 'react';

interface Props {
  message: string;
}

export function MessageRaw(props: Props): JSX.Element {
  const { message } = props;

  return (
    <tr className="text-center">
      <td colSpan={5}>{message}</td>
    </tr>
  );
}
