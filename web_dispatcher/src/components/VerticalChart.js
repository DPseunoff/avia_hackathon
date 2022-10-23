import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};


export function VerticalChart({stat}) {

    const data = {
        labels: stat.map(stat => stat.label),
        datasets: [
            {
                label: 'Количество заданий',
                data: stat.map(stat => stat.data),
                backgroundColor: 'rgba(0,21,255,0.5)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
