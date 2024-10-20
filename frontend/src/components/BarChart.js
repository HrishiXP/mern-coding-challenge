import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BarChart = ({ month }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/bar-chart`, { params: { month } });
            setData(data);
        };
        fetchData();
    }, [month]);

    const chartData = {
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
        datasets: [{
            label: 'Items',
            data: data.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
    };

    return <Bar data={chartData} />;
};

export default BarChart;
