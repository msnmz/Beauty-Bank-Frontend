import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Signup, Signin, SignupDetail, SignupMenu } from '../pages/Index';
import { Footer } from '../components/Index';

const AppRouter = () => {

    return (
        <Router>
            <Switch>
                <Route exact path='/register' component={SignupMenu} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Signin} />
                <Route exact path='/register/:id' component={SignupDetail} />
            </Switch>
            <Footer />
        </Router>
    )
}

export default AppRouter;

