import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHomePage } from '../context';

const DropDown = ({pagination}) => {
    const { setOrdersUrl, setMetricsUrl, setMetric } = useHomePage();
    const URLS = [`http://localhost:5000/api/get-orders-by-date/${pagination}/`, `http://localhost:5000/api/get-in-progress-orders/${pagination}/`, `http://localhost:5000/api/orders-this-month`]
    const METRICS_URLS = ['http://localhost:5000/api/get-revenue/', 'http://localhost:5000/api/get-total-num-in-progress-orders/', 'http://localhost:5000/api/orders-this-month']
    const METRICS = ['totalRevenue', 'inProgressOrders','numberOfOrdersThisMonth'];
    
    const handleClickByDate = () => {
        setMetric(METRICS[0]);
        setOrdersUrl(URLS[0]);
        setMetricsUrl(METRICS_URLS[0]);
    }

    const handleInProgress = () => {
        setMetric(METRICS[1]);
        setOrdersUrl(URLS[1]);
        setMetricsUrl(METRICS_URLS[1]);
    }

    const handleClickRecentOrders = () => {
        setMetric(METRICS[2]);
        setOrdersUrl(URLS[2]);
        setMetricsUrl(METRICS_URLS[2]);
    }

    return (
        <div className='dropdown'>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Organize By:
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleClickByDate}>Get orders by date</Dropdown.Item>
                    <Dropdown.Item onClick={handleInProgress}>Get in progress orders </Dropdown.Item>
                    <Dropdown.Item onClick={handleClickRecentOrders}>Get orders this month</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

DropDown.defaultProps = {
    pagination: 10
}

DropDown.propTypes = {
    pagination: PropTypes.number.isRequired
}

export default DropDown;