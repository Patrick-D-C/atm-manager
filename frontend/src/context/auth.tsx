import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../config/api";
import { addMinutes, compareAsc } from 'date-fns';
import { createUser, deleteUser, IUserProps, updateUser } from "../services/User";

type TLoginProps = {
    email: string;
    password: string;
}

interface IAuthContext {
    signed: boolean;
    user: IUserProps | null;
    signIn(data: TLoginProps): Promise<boolean>;
    logout(): void;
    signUp(data: IUserProps): Promise<boolean>;
    update(data: IUserProps): Promise<boolean>;
    deleteAccount(id_user: string): Promise<boolean>;
    notification: string | null;
    createNotification(data: string | null): void;
}


const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

function useProvideAuth() {
    const [user, setUser] = useState<IUserProps | null>(null);
    const [timeSession, setTimeSession] = useState<Date>(new Date());
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            console.log(timeSession);
            if (!compareAsc(timeSession, new Date())) {
                createNotification("Sessão Expirou");
                logout();
            }
        } else {
            const storageUser = sessionStorage.getItem('@App:user');
            const storageToken = sessionStorage.getItem('@App:token');
            if (storageToken && storageUser) {
                setUser(JSON.parse(storageUser));
                api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
            }
        }
    }, []);

    async function signIn(data: TLoginProps) {
        return await api.post('/login', data).then(response => {
            setUser(response.data.user);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
            sessionStorage.setItem('@App:token', response.data.token);
            setTimeSession(addMinutes(new Date(), 30));
            return true;
        }).catch(err => {
            createNotification(err.response.data.error);
            return false;
        })
    }

    async function signUp(data: IUserProps) {
        if (await createUser(data)) {
            createNotification("Cadastro realizado com sucesso");
            return true
        } else {
            return false;
        }
    }

    async function update(data: IUserProps) {
        const response = await updateUser(data);
        if (response) {
            setUser(response);
            createNotification("Dados atualizados com sucesso");
            return true;
        } else {
            createNotification("Erro ao alterar usuario");
            return false;
        }
    }
    async function deleteAccount(id_user: string) {
        const response = await deleteUser(id_user);
        if (response) {
            logout()
            createNotification("Conta Excluida com sucesso!");
            return true;
        } else {
            createNotification("Erro ao remover conta");
            return false;
        }
    }

    function logout() {
        setUser(null);
        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('@App:token');
    }


    async function createNotification(data: string | null) {
        setNotification(data);
    }
    return {
        signed: Boolean(user),
        user,
        signIn,
        logout,
        signUp,
        update,
        deleteAccount,
        notification,
        createNotification
    }
}
const AuthProvider: React.FC = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}


export { AuthContext, AuthProvider, useAuth };