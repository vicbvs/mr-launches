import React from 'react';

import { Content } from '@/layout/BasicLayout/Content';
import { Footer } from '@/layout/BasicLayout/Footer';
import { Header } from '@/layout/BasicLayout/Header';
import { Sidebar } from '@/layout/BasicLayout/Sidebar';

import './style.scss';
const BasicLayout = () => {
  return (
    <div className='main-layout'>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  );
};

export default BasicLayout;
