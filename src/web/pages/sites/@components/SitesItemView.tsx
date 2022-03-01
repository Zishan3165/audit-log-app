import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';

interface SiteViewProps {
  data: {
    _id: string;
    name: string;
    region: string;
    description?: string;
    lat: number;
    long: number;
  };
}

export function SitesItemView(props: SiteViewProps) {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <Card className="my-2 list-item">
      <Card.Header className="list-item-header" onClick={() => navigate(`./${data?._id}`)}>
        <b>Name : {data?.name}</b>
      </Card.Header>
      <Card.Body>
        <ListGroup horizontal="md">
          <ListGroup.Item> Region : {data?.region}</ListGroup.Item>
          <ListGroup.Item> Latitude : {data?.lat}°</ListGroup.Item>
          <ListGroup.Item> Longitude : {data?.long}°</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
