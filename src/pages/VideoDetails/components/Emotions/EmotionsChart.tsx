import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';
import { useSelector } from 'react-redux';
import useIsMobile from '../../../../hooks/useIsMobile';

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

            currentLabels.push('Others');
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
                    colors: [
                        '#FFC850',
                        '#6BE898',
                        '#CD92D8',
                        '#825A50',
                        '#999999',
                    ],
                    labels: emotion.labels,
                    legend: {
                        horizontalAlign: 'center',
                        position: 'right',
                        showForSingleSeries: true,
                        showForNullSeries: true,
                        showForZeroSeries: true,
                        floating: true,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        offsetY: 80,
                        offsetX: isMobile ? 80 : 0,
                        labels: {
                            useSeriesColors: true,
                        },
                    },
                }}
                series={emotion.series}
                type="donut"
                width="100%"
                height={300}
            />
        </div>
    );
};

const MemoziedEmotionChart = React.memo(EmotionsChart);
export default MemoziedEmotionChart;
