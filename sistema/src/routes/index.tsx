import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LogIn from '../pages/LogIn';
import Dashboard from '../pages/Dashboard';
import EditUser from '../pages/EditUser';

import NewUser from '../pages/NewUser';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LogIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/newUser" component={NewUser} />
    <Route path="/editUser" component={EditUser} isPrivate />
    <Route path="/forgotPassword" component={ForgotPassword} />
  </Switch>
);

export default Routes;
