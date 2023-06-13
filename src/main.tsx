import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';
import App from './App.tsx';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Auth0Provider
                domain="framewise.au.auth0.com"
                clientId="mfkzdfSOXE0BclGxSChhdcvIvCkkqblY"
                authorizationParams={{
                    redirect_uri: window.location.origin,
                }}
            >
                <App />
            </Auth0Provider>
        </Provider>
    </React.StrictMode>
);
