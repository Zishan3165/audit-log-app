import React from 'react';
import { Card } from 'react-bootstrap';
import { MainPageLayout } from '../../../layouts/MainPageLayout';
import { useParams } from 'react-router';
import { useFutureLoader } from '../../../../utils/hooks/useFutureLoader';
import { PageLoadingSpinner } from '../../../common/PageLoadingSpinner';
// import { SiteInfo } from './@components/SiteInfo';
import { PageLoadingFailure } from '../../../common/PageLoadingFailure';
import services from '../../../../services';
import { LogInfo } from './@components/LogInfo';

export default function ViewLog() {
  const { id } = useParams();
  const [log, loading, error] = useFutureLoader(() => services.getLog({ logId: id }), [id]);
  console.log(log);
  if (loading)
    return (
      <MainPageLayout>
        <PageLoadingSpinner status={'Loading log..'} />
      </MainPageLayout>
    );

  if (error)
    return (
      <MainPageLayout>
        <PageLoadingFailure message={'Failed to load log.'} />
      </MainPageLayout>
    );

  const idString = `(ID : ${log?._id})`;

  return (
    <MainPageLayout>
      <div className="mt-2" style={{ maxWidth: '825px', margin: '0 auto' }}>
        <Card className="container p-0 mt-2">
          <Card.Header>
            <Card.Title>Log details {idString}</Card.Title>
          </Card.Header>
          <Card.Body>{log && <LogInfo item={log} />}</Card.Body>
        </Card>
      </div>
    </MainPageLayout>
  );
}
