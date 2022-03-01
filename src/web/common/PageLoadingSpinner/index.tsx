import React from 'react';
import { Spinner } from 'react-bootstrap';
import './index.scss';

interface PageLoadingSpinnerProps {
  status?: string;
}
/** @param {{status: string, borderless: boolean}} props */
export function PageLoadingSpinner(props: PageLoadingSpinnerProps) {
  const { status } = props;

  return (
    <div className="spinner-container">
      <Spinner animation="border" />
      {status && <div className="small py-2 mx-2">{status}</div>}
    </div>
  );
}
