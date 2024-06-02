import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import services from '../../../../services';
import { useIntersectionObserver } from '../../../../utils/hooks/useIntersectionObserver';
import { useGetListByPage } from '../../../../utils/hooks/useGetListByPage';
import { SitesItemView } from './SitesItemView';
import { InfiniteScrollContainer } from '../../../common/InfiniteScrollContainer';
import { Site } from '../../../types';

export function SitesListView() {
  const [pageNumber, setPageNumber] = useState(0);
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      threshold: 0
    },
    false
  );
  const [sites, loading, hasFinished] = useGetListByPage<Site>(services.getSites, pageNumber);

  useEffect(() => {
    isBottomVisible && !loading && !hasFinished && setPageNumber((pageNumber) => pageNumber + 1);
  });

  const isListEmpty = sites?.length === 0;

  return (
    <Card className="container p-0 mt-2 ">
      <Card.Header>Sites</Card.Header>
      <Card.Body className="list-view-container">
        <InfiniteScrollContainer
          hasFinished={hasFinished}
          loading={loading}
          ref={ref}
          isListEmpty={isListEmpty}>
          {sites.map((item) => (
            <SitesItemView key={item._id} data={item} />
          ))}
        </InfiniteScrollContainer>
      </Card.Body>
    </Card>
  );
}
