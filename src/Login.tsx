import { useFormStatus } from 'react-dom';
import { useLocation, useNavigate } from 'react-router';
import { Error } from './Error';
import { useAuth } from './Auth';

const {
    VITE_USERNAME_MAX_LENGTH,
    VITE_USERNAME_MIN_LENGTH,
    VITE_PASSWORD_MAX_LENGTH,
    VITE_PASSWORD_MIN_LENGTH,
    VITE_COMMUNITY_NAME,
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
    const { errorMessage, userInfo, onLogin } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const fromRegistration = state?.fromRegistration;
    if (userInfo) {
        navigate('/home');
    }

    return (
        <div className="Login">
            <form onSubmit={onLogin} method="POST">
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
                <div className="flex-center form-buttons">
                    <LoginButton />
                    <RegisterButton />
                </div>
            </form>
        </div>
    );
}
