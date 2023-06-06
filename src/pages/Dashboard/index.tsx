import React from 'react';

import Header from './components/Header';
import AllVideos from './components/AllVideos';

const Dashboard: React.FC = () => {
    return (
        <section id="dashboard">
            <Header />
            <AllVideos />
        </section>
    );
};

export default Dashboard;
