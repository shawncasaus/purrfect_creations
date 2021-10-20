const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { GetOrders, GetInProgressOrders, CountInProgressOrders, GetRecentOrders, CountRevenue, GetOrdersByDate, OrdersThisMonth } = require('./middleware/get-orders');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/api/get-orders/:pagination/:offset?/', GetOrders, (req, res, next) => {
    res.send(res.locals.result);
});

app.get('/api/get-in-progress-orders/:pagination/:offset?/', GetInProgressOrders, (req, res, next) => {
    res.send(res.locals.result);
});

app.get('/api/get-orders-by-date/:pagination/:offset?/', GetOrdersByDate, (req, res, next) => {
    res.send(res.locals.result);
});

app.get('/api/get-total-num-in-progress-orders/', [GetInProgressOrders, CountInProgressOrders], (req, res, next) => {
    res.send(res.locals.result);
});

app.get('/api/get-recent-orders/:num', GetRecentOrders, (req, res, next) => {
    res.send(res.locals.result);
});

app.get('/api/get-revenue/', [GetOrders, CountRevenue], (req, res, next) => {
    res.send(res.locals.result);
});

app.get('/api/orders-this-month', [GetOrdersByDate, OrdersThisMonth], (req, res, next) => {
    res.send(res.locals.result);
});

app.listen(PORT, () => console.log('Server running on port ', PORT));