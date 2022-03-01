import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import services from '../../../../services';
import { useIntersectionObserver } from '../../../../utils/hooks/useIntersectionObserver';
import { useGetListByPage } from '../../../../utils/hooks/useGetListByPage';
import { SitesItemView } from './SitesItemView';
import { InfiniteScrollContainer } from '../../../common/InfiniteScrollContainer';

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
  const [sites, loading, hasFinished] = useGetListByPage(services.getSites, pageNumber);

  useEffect(() => {
    isBottomVisible && setPageNumber((pageNumber) => pageNumber + 1);
  }, [isBottomVisible]);

  const isListEmpty = sites?.length === 0;

  return (
    <Card className="container p-0 mt-2 ">
      <Card.Header>Sites</Card.Header>
      <Card.Body className="list-view-container">
        <InfiniteScrollContainer
          hasFinished={hasFinished}
          loading={loading}
          refForComp={ref}
          isListEmpty={isListEmpty}>
          {sites.map((item: any) => (
            <SitesItemView key={item._id} data={item} />
          ))}
        </InfiniteScrollContainer>
      </Card.Body>
    </Card>
  );
}
