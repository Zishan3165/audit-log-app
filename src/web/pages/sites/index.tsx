import React from 'react';
import { Link } from 'react-router-dom';
import { MainPageLayout } from '../../layouts/MainPageLayout';
import { SitesListView } from './@components/SitesListView';
import { FaPlus } from 'react-icons/fa';

export function Sites() {
  return (
    <MainPageLayout>
      <div className="container max-auto mt-2">
        <div className="buttons-container d-flex justify-content-end">
          <Link className="btn link-button" role="button" to="./create">
            <FaPlus /> New Site
          </Link>
        </div>
        <SitesListView />
      </div>
    </MainPageLayout>
  );
}
