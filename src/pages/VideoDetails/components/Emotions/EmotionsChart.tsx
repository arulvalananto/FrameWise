import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { chartColors } from '../../../../static/data';
import useIsMobile from '../../../../hooks/useIsMobile';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

type EmotionChartProps = {
    labels: string[];
    series: number[];
};

const EmotionsChart: React.FC = () => {
    const { videoDetails } = useSelector(videoDetailsSelector);
    const isMobile = useIsMobile();

    const [emotion, setEmotion] = useState<EmotionChartProps>({
        labels: [],
        series: [],
    });

    useEffect(() => {
        const currentEmotions = videoDetails.summarizedInsights?.emotions;
        if (currentEmotions) {
            const currentLabels = [];
            const currentSeries = [];

            currentEmotions.forEach((emotion) => {
                currentLabels.push(emotion.type);
                const series = emotion.seenDurationRatio
                    ? emotion.seenDurationRatio * 100
                    : 0;
                currentSeries.push(series);
            });

            currentLabels.push('Other');
            const totalEmotionSeenRatio = currentEmotions.reduce(
                (prev, curr) =>
                    prev +
                    (curr?.seenDurationRatio
                        ? curr?.seenDurationRatio * 100
                        : 0),
                0
            );
            const remainingEmotionSeenRatio = 100 - totalEmotionSeenRatio;
            currentSeries.push(remainingEmotionSeenRatio);

            setEmotion({
                ...emotion,
                labels: currentLabels,
                series: currentSeries,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!videoDetails.summarizedInsights?.emotions) {
        return null;
    }

    return (
        <div>
            <Chart
                options={{
                    colors: chartColors,
                    labels: emotion.labels,
                    legend: {
                        horizontalAlign: 'center',
                        position: isMobile ? 'bottom' : 'right',
                        showForSingleSeries: true,
                        showForNullSeries: true,
                        showForZeroSeries: true,
                        floating: true,
                        fontSize: isMobile ? '10px' : '14px',
                        fontWeight: 'bold',
                        labels: {
                            useSeriesColors: true,
                        },
                    },
                    plotOptions: {
                        pie: {
                            customScale: isMobile ? 0.8 : 1,
                        },
                    },
                    xaxis: {
                        type: 'category',
                    },
                    yaxis: {},
                }}
                series={emotion.series}
                type="donut"
                height={isMobile ? 200 : 250}
            />
        </div>
    );
};

const MemoziedEmotionChart = React.memo(EmotionsChart);
export default MemoziedEmotionChart;
