import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface LogInfoItemProps {
  title?: string;
  value?: string | number;
}

export function LogInfoItem(props: LogInfoItemProps) {
  const { title, value } = props;
  if (value == null) {
    return null;
  }

  return (
    <>
      <ListGroup.Item>
        {title} : {value}
      </ListGroup.Item>
    </>
  );
}
