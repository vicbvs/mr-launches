import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// ------------------------------------------------------------------------------------------
// ======================================== Layout ======================================== ↓
import BasicLayout from '@/layout/BasicLayout';
import * as path from '@/routes/path';
// ^ New layout to here...
// ======================================== Layout ======================================== ↑
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// =================================== Pages(lazy load) =================================== ↓
const NotFound = lazy(() => import('@/pages/NotFound'));
const Home = lazy(() => import('@/pages/Home'));
const Launches = lazy(() => import('@/pages/Launches'));

// ^ New page to here...
// =================================== Pages(lazy load) =================================== ↑
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// ===================================== Route config ===================================== ↓
const routes: RouteObject[] = [
    {
      path: path.HOME,
      element: <BasicLayout />,
      children: [
        {
          path: path.HOME,
          element: <Home />,
        },
      ],
    },
    {
      path: path.LAUNCHES,
      element: <BasicLayout />,
      children: [
        {
          path: path.LAUNCHES,
          element: <Launches />,
        },
      ],
    },
    {
        path: path.ANY,
        element: <NotFound />,
    },
];
// ===================================== Route config ===================================== ↑
// ------------------------------------------------------------------------------------------

export default routes;
