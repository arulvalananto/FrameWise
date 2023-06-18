import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import routes from './static/routes';
import { AppDispatch } from './store';
import Loader from './components/Loader';
import constants from './static/constants.json';
import { getAllSupportedLanguages } from './store/reducers/app/index.thunk';

const FallbackLoader = () => {
    return (
        <div className="container-screen-center">
            <Loader message={constants.LOADER_MESSAGE.DEFAULT} />
        </div>
    );
};

const App = () => {
    const shouldRender = useRef(true);
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useAuth0();

    useEffect(() => {
        (async () => {
            if (shouldRender.current) {
                shouldRender.current = false;
                dispatch(getAllSupportedLanguages());
            }
        })();
    }, [dispatch]);

    if (isLoading) {
        return <FallbackLoader />;
    }

    return (
        <React.Suspense fallback={<FallbackLoader />}>
            <React.Fragment>
                <BrowserRouter>
                    <Routes>
                        {routes.map(({ path, Element, sub }) => (
                            <Route key={path} path={path} element={<Element />}>
                                {sub && sub.length
                                    ? sub.map((subRoute) => (
                                          <Route
                                              key={subRoute.path}
                                              path={subRoute.path}
                                              element={<subRoute.Element />}
                                          />
                                      ))
                                    : null}
                            </Route>
                        ))}
                    </Routes>
                </BrowserRouter>
                <Toaster position="top-right" reverseOrder={true} />
            </React.Fragment>
        </React.Suspense>
    );
};

export default App;
