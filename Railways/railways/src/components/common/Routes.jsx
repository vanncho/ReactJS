import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Catalog from '../catalog/Catalog';
import CatalogUnitDetails from '../catalog/CatalogUnitDetails.jsx';
import PrivateRoute from '../common/PrivateRoute.jsx';
import CartList from '../cart/CartList.jsx';
import TicketList from '../tickets/TicketList';

const Routes = () => (
    <Switch>
        <Route path="/" exact component={ Catalog }></Route>
        <Route path="/register" component={ Register }></Route>
        <Route path="/login" component={ Login }></Route>
        <PrivateRoute path="/trips/:id" component={ CatalogUnitDetails }></PrivateRoute>
        <PrivateRoute path="/cart" component={ CartList }></PrivateRoute>
        <PrivateRoute path="/myTickets" component={ TicketList }></PrivateRoute>
    </Switch>
);

export default Routes;