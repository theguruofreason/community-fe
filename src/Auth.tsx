import { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router';

const { VITE_BACKEND_DOMAIN, VITE_BACKEND_PORT } = import.meta.env;

export type UserInfo = {
    id: number;
    uname: string;
};

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { userInfo } = useContext(AuthContext);
    if (!userInfo) return <Navigate to={'/login'} replace />;

    return children;
}

export const AuthContext = createContext<{
    errorMessage: string;
    userInfo: UserInfo | null;
    onLogin: (event: React.FormEvent) => void;
    onLogout: () => void;
}>({
    errorMessage: '',
    userInfo: null,
    onLogin: () => {},
    onLogout: () => {},
});

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const password = target.password.value;
        if (!username || !password) {
            console.error('Login failed: username and password required.');
            return null;
        }

        const port: string = VITE_BACKEND_PORT ? ':' + VITE_BACKEND_PORT : '';
        const loginUrl: URL = new URL(
            'http://' + VITE_BACKEND_DOMAIN + port + '/login'
        );
        const requestBody = { uname: username, pass: password };
        const request: Request = new Request(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            mode: 'cors',
            credentials: 'include',
        });
        const res = await fetch(request);
        if (!res.ok) {
            console.error('Login failure');
            setErrorMessage(await res.text());
            return;
        }
        document.cookie = 'loggedIn=true';
        setUserInfo({
            id: 1,
            uname: username,
        });
    };

    const handleLogout = async () => {
        const backendAPIDomain: string =
            VITE_BACKEND_DOMAIN +
            (VITE_BACKEND_PORT ? `:${VITE_BACKEND_PORT}` : '');
        const url = new URL(`http://${backendAPIDomain}/login/out`);
        const request: Request = new Request(url, {
            body: JSON.stringify({ uname: userInfo?.uname }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        });
        const response: Response = await fetch(request);
        if (!response.ok) {
            console.error(response);
            return;
        }
        setUserInfo(null);
    };

    const value = {
        userInfo,
        errorMessage,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
