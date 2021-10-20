import React, { useState, useEffect } from 'react';
import {Spinner} from 'react-bootstrap';
import { useHomePage } from '../context';

const Metrics = () => {
    const { metric, metricData, loadingMetrics } = useHomePage();
    const [metricString, setMetricString] = useState('');

    useEffect(() => {
        if (metric === 'totalRevenue') {
            setMetricString('Total revenue');
        } else if (metric === 'inProgressOrders') {
            setMetricString('Orders in progress');
        } else if (metric === 'numberOfOrdersThisMonth') {
            setMetricString('Number of orders this month');
        }
    }, [metric]);

    return (
        <div className='metrics'>
            <h1>Metrics:</h1>
            {(loadingMetrics) ? 
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            : <h3>{`${metricString}: ${metricData}`}</h3>}
        </div>
    )
}

export default Metrics;