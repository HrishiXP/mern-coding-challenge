import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';

const PieChart = ({ month }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/pie-chart`, { params: { month } });
            setData(data);
        };
        fetchData();
    }, [month]);

    const chartData = {
        labels: data.map(item => item._id),
        datasets: [{
            data: data.map(item => item.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return <Pie data={chartData} />;
};

export default PieChart;
