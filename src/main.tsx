import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import './main.css';
import App from './App.tsx';
import { store } from './store';
import constants from './static/constants.json';

const {
    AUTH0_CONFIG: { DEV_CLIENT_ID, PROD_CLIENT_ID },
} = constants;
const clientId =
    process.env.NODE_ENV === 'development' ? DEV_CLIENT_ID : PROD_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Auth0Provider
                domain={constants.AUTH0_CONFIG.DOMAIN}
                clientId={clientId}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                }}
            >
                <App />
            </Auth0Provider>
        </Provider>
    </React.StrictMode>
);
