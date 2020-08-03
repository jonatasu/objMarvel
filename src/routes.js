import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import List from './pages/List';
import Details from './pages/Details';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={List} />
                <Route path="/character/:id" exact component={Details} />
            </Switch>
        </BrowserRouter>
    );
}