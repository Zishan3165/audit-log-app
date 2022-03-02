import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { formatAction, formatDateTime } from '../../../../../../utils/formatter';
import { Log } from '../../../../../models';
import { LogInfoItem } from '../LogInfoItem';

interface LogInfo {
  item: Log;
}

export function LogInfo(props: LogInfo) {
  const { item } = props;
  const navigate = useNavigate();

  return (
    <>
      <ListGroup className="mb-5">
        <ListGroup.Item>Action : {item.action}</ListGroup.Item>
        <ListGroup.Item>Performed by : {item.user.username}</ListGroup.Item>
        <ListGroup.Item>Time : {formatDateTime(item?.createdAt)}</ListGroup.Item>
      </ListGroup>
      <h5>Information {formatAction(item?.action)}</h5>
      {item?.details && (
        <ListGroup>
          <LogInfoItem title={'Name'} value={item.details.name} />
          <LogInfoItem title={'Region'} value={item.details.region} />
          <LogInfoItem title={'Description'} value={item.details.description} />
          <LogInfoItem title={'Latitude'} value={item.details.lat} />
          <LogInfoItem title={'Longitude'} value={item.details.long} />
        </ListGroup>
      )}
      <ListGroup className="mb-5">
        {!item.details && <ListGroup.Item>None</ListGroup.Item>}
      </ListGroup>
      {item.site && (
        <div className="text-center">
          <Button variant="outline-primary" onClick={() => navigate(`/sites/${item.site?._id}`)}>
            View Site
          </Button>
        </div>
      )}
    </>
  );
}
