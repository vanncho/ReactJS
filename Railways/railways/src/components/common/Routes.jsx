import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Catalog from '../catalog/Catalog';

const Routes = () => (
    <Switch>
        <Route path="/" exact component={ Catalog }></Route>
        <Route path="/register" component={ Register }></Route>
        <Route path="/login" component={ Login }></Route>
    </Switch>
);

export default Routes;