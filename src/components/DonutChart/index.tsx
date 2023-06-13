import React from 'react';
import Chart from 'react-apexcharts';

import { chartColors } from '../../static/data';
import useIsMobile from '../../hooks/useIsMobile';

type DonutChartProps = {
    labels: string[];
    series: number[];
};

const DonutChart: React.FC<DonutChartProps> = ({ labels, series }) => {
    const isMobile = useIsMobile();

    return (
        <Chart
            options={{
                colors: chartColors,
                labels: labels,
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
            series={series}
            type="donut"
            height={isMobile ? 200 : 250}
        />
    );
};

export default DonutChart;
