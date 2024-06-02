import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Site } from '../../../../../types';

interface SiteInfo {
  item: Site;
}

export function SiteInfo(props: SiteInfo) {
  const { item } = props;
  const { name, region, description, lat, long } = item;
  return (
    <ListGroup>
      <ListGroup.Item>Name : {name}</ListGroup.Item>
      <ListGroup.Item>Region : {region}</ListGroup.Item>
      <ListGroup.Item>Description : {description}</ListGroup.Item>
      <ListGroup.Item>Latitude : {lat}</ListGroup.Item>
      <ListGroup.Item>Longitude : {long}</ListGroup.Item>
    </ListGroup>
  );
}
