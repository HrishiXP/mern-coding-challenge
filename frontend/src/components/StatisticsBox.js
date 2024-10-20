import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatisticsBox = ({ month }) => {
    const [stats, setStats] = useState({ totalAmount: 0, soldCount: 0, notSoldCount: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const { data } = await axios.get(`/api/statistics`, { params: { month } });
            setStats(data);
        };
        fetchStats();
    }, [month]);

    return (
        <div>
            <p>Total Sales: {stats.totalAmount}</p>
            <p>Sold Items: {stats.soldCount}</p>
            <p>Not Sold Items: {stats.notSoldCount}</p>
        </div>
    );
};

export default StatisticsBox;
