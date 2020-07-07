import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './components/DashboardComponents/Dashboard.js';
import Worksheet from './components/WorksheetComponents/Worksheet.js';
import NotFound from './components/NotFound.js';
import App from './App.js';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/" component = {App} />
            <Route path = "/worksheet/:worksheetId" component = {Worksheet} />
            <Route path = "/dashboard/:userId" component = {Dashboard} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;
