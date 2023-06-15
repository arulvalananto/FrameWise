import React from 'react';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const Settings = React.lazy(() => import('../pages/Settings'));
const VideoDetails = React.lazy(() => import('../pages/VideoDetails'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

export default [
    {
        path: '/',
        Element: Home,
        sub: [
            { path: '/settings', Element: Settings },
            { path: '/library/:id', Element: VideoDetails },
            { path: '/', Element: Dashboard },
        ],
    },
    {
        path: '*',
        Element: NotFound,
    },
];
