import React from 'react';
import { useAuth } from '../context/auth';
import AuthRoutes from './AuthRoutes';
import SignRoutes from './SignRoutes';



const Routes: React.FC = () => {
    const { signed } = useAuth();
    return signed ? <AuthRoutes /> : <SignRoutes />;
}

export default Routes;