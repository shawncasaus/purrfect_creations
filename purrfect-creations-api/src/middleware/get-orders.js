const axios = require('axios');
const key = require('../../configs/key');

const fetchUrlContent = (url, config) => {
    return axios.get(url, {headers: config})
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error(error);
        return 'error';
    });
}

const GetOrders = async (req, res, next) => {
    const pagination = (req.params?.pagination !== undefined) ? req.params.pagination : 100;
    const url = `https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders?pageSize=${pagination}&sort%5B0%5D%5Bfield%5D=order_id`;
    let offset = req.params?.offset;
    const config = {'Authorization': `Bearer ${key}`};
    let content = {};

    if (offset !== undefined) {
        offset = offset.replace(/\-/, '/');
        content = await fetchUrlContent(url + `&offset=${offset}`, config);
    } else {
        content = await fetchUrlContent(url, config)
    }

    if (content === 'error') {
        res.status(500);
        res.locals.result = 'oops... something went wrong';
    } else {
        res.status(200);
        res.locals.result = content; 
    }
    next();
}

const GetInProgressOrders = async (req, res, next) => {
    const pagination = (req.params?.pagination !== undefined) ? req.params.pagination : 100;
    const url = `https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders?pageSize=${pagination}&sort%5B0%5D%5Bfield%5D=order_id&filterByFormula=%28%7Border_status%7D%20%3D%20%27in_progress%27%29`;
    let offset = req.params?.offset;
    const config = {'Authorization': `Bearer ${key}`};
    let content = {};

    if (offset !== undefined) {
        offset = offset.replace(/\-/, '/');
        content = await fetchUrlContent(url + `&offset=${offset}`, config);
    } else {
        content = await fetchUrlContent(url, config)
    }

    if (content === 'error') {
        res.status(500);
        res.locals.result = 'oops... something went wrong';
    } else {
        res.status(200);
        res.locals.result = content; 
    }
    next();
}

const GetOrdersByDate = async (req, res, next) => {
    const pagination = (req.params?.pagination !== undefined) ? req.params.pagination : 100;
    const url = `https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders?pageSize=${pagination}&sort%5B0%5D%5Bfield%5D=order_placed&sort%5B0%5D%5Bdirection%5D=desc`;
    let offset = req.params?.offset;
    const config = {'Authorization': `Bearer ${key}`};
    let content = {};

    if (offset !== undefined) {
        offset = offset.replace(/\-/, '/');
        content = await fetchUrlContent(url + `&offset=${offset}`, config);
    } else {
        content = await fetchUrlContent(url, config)
    }

    if (content === 'error') {
        res.status(500);
        res.locals.result = 'oops... something went wrong';
    } else {
        res.status(200);
        res.locals.result = content; 
    }
    next();
}

const CountInProgressOrders = async (req, res, next) => {
    let curContent = res.locals.result;
    let curInProgress = res.locals.result.records.length;
    let offset = res.locals.result?.offset;

    if (curContent === 'oops... something went wrong') {
        res.status(500);
        res.locals.result = 'oops... something went wrong';
    } else if (offset === undefined) {
        res.status(200);
        res.locals.result = {totalInProgress: curInProgress}; 
    } else {
        const url = `https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders?&sort%5B0%5D%5Bfield%5D=order_id&fields%5B%5D=order_id&fields%5B%5D=order_status&filterByFormula=%28%7Border_status%7D%20%3D%20%27in_progress%27%29`;
        const config = {'Authorization': `Bearer ${key}`};

        while (offset !== undefined) {
            curContent = await fetchUrlContent(url + `&offset=${offset}`, config);
            curInProgress += curContent.records.length;
            offset = curContent.offset;
        }
        res.status(200);
        res.locals.result = {totalInProgress: curInProgress};
    }
    next();
}

const GetRecentOrders = async (req, res, next) => {
    const numRecent = req.params.num;

    if (parseInt(numRecent, 10) > 100 || isNaN(numRecent)) {
        res.status(200);
        res.locals.result = 'Error: number of most recent cannot exceed 100'; 
    } else {
        const url = `https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders?maxRecords=${numRecent}&sort%5B0%5D%5Bfield%5D=order_placed&sort%5B0%5D%5Bdirection%5D=desc`;
        const config = {'Authorization': `Bearer ${key}`};
        const content = await fetchUrlContent(url, config);

        if (content === 'error') {
            res.status(500);
            res.locals.result = 'oops... something went wrong';
        } else {
            res.status(200);
            res.locals.result = content; 
        }
    }
    next();
}

const CountRevenue = async (req, res, next) => {
    let curContent = res.locals.result;
    let curRevenue = 0;
    let offset = res.locals.result?.offset;

    for (var i = 0; i < curContent.records.length; i++) {
        curRevenue += curContent.records[i].fields.price;
    }

    if (curContent === 'oops... something went wrong') {
        res.status(500);
        res.locals.result = 'oops... something went wrong';
    } else if (offset === undefined) {
        res.status(200);
        res.locals.result = {totalRevenue: curRevenue}; 
    } else {
        const url = `https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders?&sort%5B0%5D%5Bfield%5D=order_placed&fields%5B%5D=order_id&fields%5B%5D=order_status&filterByFormula=%28%7Border_status%7D%20%3D%20%27in_progress%27%29`;
        const config = {'Authorization': `Bearer ${key}`};

        while (offset !== undefined) {
            curContent = await fetchUrlContent(url + `&offset=${offset}`, config);
            for (var i = 0; i < curContent.records.length; i++) {
                curRevenue += curContent.records[i].fields.price;
            }
            offset = curContent.offset;
        }
        res.status(200);
        res.locals.result = {totalRevenue: parseFloat(curRevenue).toFixed(2)}; 
    }
    next();
}

const OrdersThisMonth = async (req, res, next) => {
    const curMonth = new Date().getMonth() + 1;
    let content = res.locals.result;
    let ordersThisMonth = [];
    let offset = res.locals.result?.offset;
    let isThisMonth = true;

    if (content === 'error') {
        res.status(500);
        res.locals.result = 'oops... something went wrong';
    } else {
        const url = `https://api.airtable.com/v0/app8wLQrrIMrnn673/Orders?&sort%5B0%5D%5Bfield%5D=order_placed&sort%5B0%5D%5Bdirection%5D=desc`;
        const config = {'Authorization': `Bearer ${key}`};

        for (var i = 0; i < content.records.length; i++) {
            const thisDate = new Date(content.records[i].fields.order_placed).getMonth() + 1;
            if (thisDate === curMonth) {
                ordersThisMonth.push(content.records[i]);
            } else {
                isThisMonth === false;
            }
        }

        while (isThisMonth && offset !== undefined) {
            content = await fetchUrlContent(url + `&offset=${offset}`, config);

            for (var i = 0; i < content.records.length; i++) {
                const thisDate = new Date(content.records[i].fields.order_placed).getMonth() + 1;
                if (thisDate === curMonth) {
                    ordersThisMonth.push(content.records[i]);
                } else {
                    isThisMonth === false;
                }
            }
            offset = content.offset;
        }
        res.status(200);
        res.locals.result = ordersThisMonth; 
    }
    next();
}

module.exports = { GetOrders, GetInProgressOrders, CountInProgressOrders, GetRecentOrders, CountRevenue, GetOrdersByDate, OrdersThisMonth };