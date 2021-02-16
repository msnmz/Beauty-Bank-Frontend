import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import {
    Signup,
    Signin,
    SignupDetail,
    SignupMenu,
    DashboardAdmin,
    DashboardClient,
    DashboardConnector,
    DashboardProfessional,
    DashboardSponsor,
    EmailVerify,
    ProfileClient,
    ClientTicket,
} from '../pages/Index';
import { Footer } from '../components/Index';
import { AppContext } from '../context/AppContext';

const AppRouter = () => {

    const { user } = useContext(AppContext);
    // console.log(user);
    // console.log(user?.role);
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={SignupMenu} />
                <Route exact path='/register/:id' component={SignupDetail} />
                <Route exact path='/login' component={Signin} />
                <Route exact path='/admin' component={DashboardAdmin} />
                <Route exact path='/client' component={user?.role === 'Client' ? DashboardClient : Signin} />
                <Route exact path='/client-profile' component={user?.role === 'Client' ? ProfileClient : Signin} />
                <Route exact path='/connector' component={user?.role === 'Connector' ? DashboardConnector : Signin} />
                <Route exact path='/professional' component={user?.role === 'Professional' ? DashboardProfessional : Signin} />
                <Route exact path='/sponsor' component={user?.role === 'Professional' ? DashboardSponsor : Signin} />
                <Route exact path='/create-ticket' component={ClientTicket} />
                <Route path='/email-verify/:token' component={EmailVerify} />
            </Switch>
            <Footer />
        </Router>
    )
}

export default AppRouter;

