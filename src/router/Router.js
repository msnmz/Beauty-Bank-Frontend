import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Signup, Signin } from '../pages/Index';
import { Footer } from '../components/Index';

const AppRouter = () => {

    return (
        <Router>
            <Switch>
                <Route exact path='/register' component={Signup} />
                <Route exact path='/login' component={Signin} />
            </Switch>
            <Footer />
        </Router>
    )
}

export default AppRouter;

