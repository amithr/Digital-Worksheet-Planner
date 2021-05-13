import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './components/DashboardComponents/Dashboard.js';
import Worksheets from './components/WorksheetComponents/Worksheets.js';
import NotFound from './components/NotFound.js';
import App from './App.js';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/:studentPinCode?" component = {App} />
            <Route exact path = "/:userType/:userId/:studentPinCode?" component = {Worksheets} />
            <Route path = "/dashboard/:userId" component = {Dashboard} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;
