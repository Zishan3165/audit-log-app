import React from 'react';
import { PageLoadingFailure } from '../PageLoadingFailure';
import SpinnerComponent from '../SpinnerComponent';

export function InfiniteScrollContainer(props: any) {
  const { hasFinished, refForComp, loading, isListEmpty } = props;
  return (
    <>
      {hasFinished && isListEmpty && <PageLoadingFailure message="No data" />}
      {props.children}
      {loading && <SpinnerComponent />}
      {!hasFinished && <div ref={refForComp} style={{ width: '100%', height: '20px' }} />}
    </>
  );
}
