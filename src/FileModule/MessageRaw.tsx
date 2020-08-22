import React from 'react';

interface Props {
  message: string
}

export function MessageRaw(props: Props) {
  return (
    <tr className="text-center">
      <td colSpan={4}>
        {props.message}
      </td>
    </tr>
  )
}