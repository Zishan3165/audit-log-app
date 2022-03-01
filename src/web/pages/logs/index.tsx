import React from 'react';
import { LogListView } from '../../common/LogListView';
import { MainPageLayout } from '../../layouts/MainPageLayout';

export function Logs() {
  return (
    <MainPageLayout>
      <LogListView />
    </MainPageLayout>
  );
}
