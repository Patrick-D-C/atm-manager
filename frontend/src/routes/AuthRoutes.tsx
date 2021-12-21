import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { Edit as ClientEdit } from '../pages/Client/Edit';
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { Create as OperacoesCreate } from '../pages/Operations/Create';
import { List as OperacoesList } from '../pages/Operations/List';
import { List as PacotesList } from '../pages/Packages/List';



const AuthRoutes: React.FC = () => {
    const { user } = useAuth();
    return (
        <BrowserRouter>
            <Route path="/painel" component={Dashboard} />
            <Route path="/operacoes" exact component={OperacoesList} />
            <Route path="/operacoes/novo" component={OperacoesCreate} />
            {user?.admin && (
                <Route path="/pacotes" component={PacotesList} />
            )}
            <Route path="/usuario/edit" component={ClientEdit} />
            <Route path="/" exact component={Home} />
        </BrowserRouter>
    )

}

export default AuthRoutes;