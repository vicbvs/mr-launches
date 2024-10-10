import { Outlet } from 'react-router-dom';

import './style.scss';
export const Content = () => {
  return (
    <main className='main-layout--content'>
      <Outlet />
    </main>
  );
};
