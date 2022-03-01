import React, { ReactElement } from 'react';

interface PageLoadingFailureProps {
  message?: string;
  children?: ReactElement;
  title?: string;
}

export function PageLoadingFailure(props: PageLoadingFailureProps) {
  const { title, message, children } = props;

  return (
    <div className="d-flex justify-content-center" style={{ height: '200px' }}>
      <div className="text-center my-auto">
        <h6 className=" my-auto">{title || 'Sorry!'}</h6>
        <br />
        {message && <h6 className="text-muted my-auto">{message + ''}</h6>}
        <br />
        {children && <div className="small">{children}</div>}
      </div>
    </div>
  );
}
