import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useLocation, useNavigate } from 'react-router';
import { Error } from './Error';

const {
    VITE_USERNAME_MAX_LENGTH,
    VITE_USERNAME_MIN_LENGTH,
    VITE_PASSWORD_MAX_LENGTH,
    VITE_PASSWORD_MIN_LENGTH,
    VITE_COMMUNITY_NAME,
    VITE_BACKEND_DOMAIN,
    VITE_BACKEND_PORT,
} = import.meta.env;

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <button className="login-register" type="submit" disabled={pending}>
            {pending ? 'Logging in...' : 'Login'}
        </button>
    );
}

function RegisterButton() {
    const navigate = useNavigate();
    function clickRegister() {
        navigate('/register');
    }
    return (
        <button className="login-register" onClick={clickRegister}>
            Register
        </button>
    );
}

function FromRegistrationDiv({ display }: { display: boolean }) {
    return display ? (
        <div>
            <h5 style={{ margin: 0 }}>
                Registration successful! Please log in...
            </h5>
        </div>
    ) : null;
}

export default function Login() {
    const { state } = useLocation();
    const fromRegistration = state?.fromRegistration;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    async function login(event: React.FormEvent) {
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
        });
        const res = await fetch(request);
        if (!res.ok) {
            console.error('Login failure');
            setErrorMessage(await res.text());
            return;
        }
        navigate('/home');
    }

    return (
        <div className="Login">
            <form onSubmit={login} method="POST">
                <h2>Welcome to {VITE_COMMUNITY_NAME}!</h2>
                <FromRegistrationDiv display={fromRegistration} />
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        className="formItem"
                        type="text"
                        name="username"
                        id="username"
                        maxLength={+VITE_USERNAME_MAX_LENGTH}
                        minLength={+VITE_USERNAME_MIN_LENGTH}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        className="formItem"
                        type="password"
                        name="password"
                        id="password"
                        maxLength={+VITE_PASSWORD_MAX_LENGTH}
                        minLength={+VITE_PASSWORD_MIN_LENGTH}
                        required
                    ></input>
                </div>
                <Error text={errorMessage} />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <LoginButton />
                    <RegisterButton />
                </div>
            </form>
        </div>
    );
}
