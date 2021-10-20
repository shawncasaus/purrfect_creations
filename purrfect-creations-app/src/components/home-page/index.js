import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePageContextProvider from './context';
import Metrics from './metrics';
import DropDown from './dropdown';
import DashboardsTable from './orders-table';

const HomePage = () => {
    const PAGINATION = 100;

    const [orders, setOrders] = useState([]);
    const [metric, setMetric] = useState('totalRevenue');
    const [metricData, setMetricData] = useState('');
    const [ordersUrl, setOrdersUrl] = useState(`http://localhost:5000/api/get-orders-by-date/${PAGINATION}/`);
    const [metricsUrl, setMetricsUrl] = useState('http://localhost:5000/api/get-revenue/');
    const [offset, setOffset] = useState('');
    const [prevOffset, setPrevOffset] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMetrics, setLoadingMetrics] = useState(true);

    const [tableHeader, setTableHeader] = useState('')

    //get orders
    useEffect(() => {    
        const fetchUrl = ordersUrl;

        const options = {
            method: 'GET',
            mode: 'no-cors'
        };

        axios(fetchUrl, options).then(response => {
                setOrders((response.data?.records) ? response.data.records : response.data);
                setOffset((response.data?.offset) ? response.data.offset : '');
            }).catch (err => {
                console.error('Error: ', err);
                setError(true);
            }).finally(() => {
                setLoading(false);
            });
    }, [ordersUrl]);

    //get metrics
    useEffect(() => {    
        const fetchUrl = metricsUrl;

        const options = {
            method: 'GET',
            mode: 'no-cors'
        };

        axios(fetchUrl, options).then(response => {
            if (metric === 'totalRevenue') {
                let revenue = `${response.data.totalRevenue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                setMetricData(`£${revenue}`);
            } else if (metric === 'inProgressOrders') {
                setMetricData(`${response.data.totalInProgress}`);
            } else if (metric === 'numberOfOrdersThisMonth') {
                setMetricData(`${response.data.length}`);
            }
            }).catch (err => {
                console.error('Error: ', err);
                setError(true);
            }).finally(() => {
                setLoadingMetrics(false);
            });
    }, [metricsUrl, metric]);

    useEffect(() => {
        if (metric === 'totalRevenue') {
            setTableHeader('Orders by date');
        } else if (metric === 'inProgressOrders') {
            setTableHeader('Orders in progress');
        } else if (metric === 'numberOfOrdersThisMonth') {
            setTableHeader('Orders this month');
        }
    }, [metric]);

    return (
        <HomePageContextProvider 
            orders={orders}
            setOrders={setOrders}
            ordersUrl={ordersUrl}
            setOrdersUrl={setOrdersUrl}
            metric={metric}
            setMetric={setMetric}
            metricData={metricData}
            setMetricData={setMetricData}
            metricsUrl={metricsUrl}
            setMetricsUrl={setMetricsUrl}
            offset={offset}
            setOffset={setOffset}
            prevOffset={prevOffset}
            setPrevOffset={setPrevOffset}
            revenue={metric}
            setRevenue={setMetric}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            loadingMetrics={loadingMetrics}
            setLoadingMetrics={setLoadingMetrics}
        >
            <div className="home-page">    
                <h1>Welcome to Purrfect Creations</h1>       
                <Metrics />
                <div className="table-header">
                    <DropDown pagination={PAGINATION} />
                    <h1>{tableHeader}</h1>  
                </div>
                <DashboardsTable />
            </div>
        </HomePageContextProvider>
    )
}

export default HomePage;