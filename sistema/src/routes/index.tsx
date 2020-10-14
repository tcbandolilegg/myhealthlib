import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LogIn from '../pages/LogIn';
import Dashboard from '../pages/Dashboard';
import EditUser from '../pages/EditUser';

import NewUser from '../pages/NewUser';
import ForgotPassword from '../pages/ForgotPassword';
import ListaConsultas from '../pages/ListaConsultas';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LogIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/newUser" component={NewUser} />
    <Route path="/editUser" component={EditUser} isPrivate />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/listaConsultas" component={ListaConsultas} />
    <Route path="/listaExames" component={ListaConsultas} />
    <Route path="/novaConsulta" component={ListaConsultas} />
    <Route path="/novoExame" component={ListaConsultas} />
  </Switch>
);

export default Routes;
