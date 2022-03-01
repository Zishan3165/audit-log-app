import React from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import './index.scss';

interface Props {
  children: any;
}
export function MainPageLayout(props: Props) {
  return (
    <div id="main-layout">
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
