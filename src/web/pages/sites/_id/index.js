import React, { createContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { MainPageLayout } from '../../../layouts/MainPageLayout';
import { useParams } from 'react-router';
import { useFutureLoader } from '../../../../utils/hooks/useFutureLoader';
import { PageLoadingSpinner } from '../../../common/PageLoadingSpinner';
import { DeleteSiteButton } from './@components/DeleteSiteButton';
import { SiteInfo } from './@components/SiteInfo';
import { PageLoadingFailure } from '../../../common/PageLoadingFailure';
import { LogListView } from '../../../common/LogListView';
import EditSite from './edit';
import services from '../../../../services';

export const ViewSiteContext = createContext();

export default function ViewSite() {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [site, loading, error] = useFutureLoader(() => services.getSite({ siteId: id }), [
    id,
    count
  ]);

  if (loading)
    return (
      <MainPageLayout>
        <PageLoadingSpinner status={'Loading list..'} />
      </MainPageLayout>
    );

  if (error)
    return (
      <MainPageLayout>
        <PageLoadingFailure message={'Failed to load Site.'} />
      </MainPageLayout>
    );

  const idString = site?._id ? `(ID : ${site?._id})` : '';

  return (
    <MainPageLayout>
      <ViewSiteContext.Provider value={{ setCount }}>
        <div className="mt-2" style={{ maxWidth: '825px', margin: '0 auto' }}>
          <div className="buttons-container d-flex justify-content-end" style={{ gap: '1rem' }}>
            <DeleteSiteButton item={site} />
            <EditSite item={site} />
          </div>
          <Card className="container p-0 mt-2">
            <Card.Header>
              <Card.Title>Site details {idString}</Card.Title>
            </Card.Header>
            <Card.Body>{site && <SiteInfo item={site} />}</Card.Body>
          </Card>
          <LogListView showId={false} />
        </div>
      </ViewSiteContext.Provider>
    </MainPageLayout>
  );
}
