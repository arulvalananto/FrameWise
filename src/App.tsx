import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import { AppDispatch } from './store';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import MemoziedDashboard from './pages/Dashboard';
import MemoziedVideoDetails from './pages/VideoDetails';
import { getAllSupportedLanguages } from './store/reducers/app/index.thunk';
import MemoziedLoader from './components/Loader';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(isLoading);

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <MemoziedLoader message="Loading...Please wait" />
            </div>
        );
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            path="/library/:id"
                            element={<MemoziedVideoDetails />}
                        />
                        <Route path="/" element={<MemoziedDashboard />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" reverseOrder={true} />
        </div>
    );
};

export default App;
