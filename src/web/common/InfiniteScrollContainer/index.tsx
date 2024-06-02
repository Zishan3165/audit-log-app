import React, { PropsWithChildren, forwardRef } from 'react';
import { PageLoadingFailure } from '../PageLoadingFailure';
import SpinnerComponent from '../SpinnerComponent';

interface InfiniteScrollContainerProps {
  hasFinished: boolean;
  loading: boolean;
  isListEmpty: boolean;
}

export const InfiniteScrollContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<InfiniteScrollContainerProps>
>((props, ref) => {
  const { hasFinished, loading, isListEmpty } = props;
  return (
    <>
      {hasFinished && isListEmpty && !loading && <PageLoadingFailure message="No data" />}
      {props.children}
      {loading && <SpinnerComponent />}
      {!hasFinished && <div ref={ref} style={{ width: '100%', height: '20px' }} />}
    </>
  );
});

InfiniteScrollContainer.displayName = 'InfiniteScrollContainer';
