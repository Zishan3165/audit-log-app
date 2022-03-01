import React from 'react';
import { formatAction, formatDateTime } from '../../../utils/formatter';
import { Log } from '../../models';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface LogItemViewProps {
  item: Log;
  showId?: boolean;
}
export function LogItemView(props: LogItemViewProps) {
  const { item, showId } = props;
  const { user, site } = item;
  const message = `${formatAction(item?.action)} by ${user?.username} on ${formatDateTime(
    item?.createdAt
  )} `;
  const shouldShowId = site?._id && showId;

  return (
    <ListGroup.Item>
      <h6 className="mb-2">{message} </h6>
      {shouldShowId && (
        <h6 style={{ cursor: 'pointer' }}>
          <Link to={`/sites/${site?._id}`}>Site ID: {site?._id}</Link>
        </h6>
      )}
    </ListGroup.Item>
  );
}
