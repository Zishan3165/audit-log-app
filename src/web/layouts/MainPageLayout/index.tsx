import React, { PropsWithChildren } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import './index.scss';

export function MainPageLayout(props: PropsWithChildren) {
  return (
    <div id="main-layout">
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
