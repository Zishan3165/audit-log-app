import React from 'react';
import { PageLoadingFailure } from '../PageLoadingFailure';
import SpinnerComponent from '../SpinnerComponent';

export function InfiniteScrollContainer(props: any) {
  const { hasFinished, refForComp, loading, isListEmpty } = props;
  if (hasFinished && isListEmpty && !loading) {
    console.log('gothere');
  }
  return (
    <>
      {hasFinished && isListEmpty && !loading && <PageLoadingFailure message="No data" />}
      {props.children}
      {loading && <SpinnerComponent />}
      {!hasFinished && <div ref={refForComp} style={{ width: '100%', height: '20px' }} />}
    </>
  );
}
