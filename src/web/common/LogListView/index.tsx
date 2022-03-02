import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import services from '../../../services';
import { useGetListByPage } from '../../../utils/hooks/useGetListByPage';
import { useIntersectionObserver } from '../../../utils/hooks/useIntersectionObserver';
import { InfiniteScrollContainer } from '../InfiniteScrollContainer';
import { LogItemView } from '../LogItemView';

interface LogListViewProps {
  showId?: boolean;
}

export function LogListView(props: LogListViewProps) {
  const { showId = true } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const { id } = useParams();
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      threshold: 1
    },
    false
  );
  const [logs, loading, hasFinished] = useGetListByPage(
    (params) => services.getLogs({ siteId: id, ...params }),
    pageNumber
  );

  useEffect(() => {
    isBottomVisible && !loading && !hasFinished && setPageNumber((pageNumber) => pageNumber + 1);
  });

  const isListEmpty = logs?.length === 0;

  return (
    <Card className="container p-0 mt-2 ">
      <Card.Header>Audit Log</Card.Header>
      <Card.Body className="list-view-container">
        <InfiniteScrollContainer
          isListEmpty={isListEmpty}
          refForComp={ref}
          hasFinished={hasFinished}
          loading={loading}>
          {logs.map((item: any) => (
            <LogItemView item={item} key={item._id} showId={showId} />
          ))}
        </InfiniteScrollContainer>
      </Card.Body>
    </Card>
  );
}
