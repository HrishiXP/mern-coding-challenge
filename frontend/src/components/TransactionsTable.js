import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data } = await axios.get(`/api/transactions`, {
                params: { month, page, search }
            });
            setTransactions(data);
        };
        fetchTransactions();
    }, [month, page, search]);

    return (
        <div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
            <table>
                <thead>
                    <tr><th>Title</th><th>Price</th></tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}><td>{tx.title}</td><td>{tx.price}</td></tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage(prev => prev - 1)}>Previous</button>
            <button onClick={() => setPage(prev => prev + 1)}>Next</button>
        </div>
    );
};

export default TransactionsTable;
