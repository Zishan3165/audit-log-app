import React from 'react';
import { formatAction, formatDateTime } from '../../../utils/formatter';
import { Log } from '../../models';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface LogItemViewProps {
  item: Log;
  showId?: boolean;
}
export function LogItemView(props: LogItemViewProps) {
  const { item } = props;
  const { user } = item;
  const navigate = useNavigate();
  const message = `${formatAction(item?.action)} by ${user?.username || 'User'} on ${formatDateTime(
    item?.createdAt
  )} `;

  return (
    <ListGroup.Item className="list-item-header" onClick={() => navigate(`/logs/${item?._id}`)}>
      <h6 className="mb-2">{message} </h6>
    </ListGroup.Item>
  );
}
