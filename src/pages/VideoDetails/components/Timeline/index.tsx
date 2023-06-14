import React from 'react';

import './index.css';
import MemoziedInstance from './components/Instance';
import { TimelineProps } from '../../../../interfaces/common';

interface TimelineCompProps {
    timeline: TimelineProps[];
}

const Timeline: React.FC<TimelineCompProps> = ({ timeline }) => {
    if (!timeline?.length) {
        return null;
    }

    return (
        <div className="w-full">
            <svg
                width="100%"
                height="25"
                tabIndex={-1}
                className="border-none outline-none"
            >
                <rect
                    width="100%"
                    height="12"
                    x="0%"
                    y="5"
                    className="transition bar cursor-pointer"
                ></rect>
                {timeline?.map((time, index) => (
                    <MemoziedInstance key={index} time={time} />
                ))}
            </svg>
        </div>
    );
};

const MemoziedTimeline = React.memo(Timeline);
export default MemoziedTimeline;
