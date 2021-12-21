import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

const SignRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />           
        </BrowserRouter>
    );
}

export default SignRoutes;