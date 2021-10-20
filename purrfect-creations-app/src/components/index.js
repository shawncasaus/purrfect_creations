import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './home-page/index';
import NavBar from './nav-bar/index';
import Footer from './footer/index';

const Components = () => {
    return (
        <div>
            <Router>
                <NavBar />
                <Switch>
                    <Route path='/' component={HomePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default Components;