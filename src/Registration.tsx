const { VITE_BACKEND_DOMAIN, VITE_BACKEND_PORT, VITE_DEFAULT_ROLE } =
    import.meta.env;
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useNavigate } from 'react-router';
import { Error } from './Error';

export default function Registration() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function register(formData: FormData) {
        'use server';
        const fields = {
            uname: formData.get('username'),
            email: formData.get('email'),
            name: formData.get('name'),
            pass: formData.get('password'),
            roles: [+VITE_DEFAULT_ROLE],
        };
        try {
            const port: string = VITE_BACKEND_PORT
                ? ':' + VITE_BACKEND_PORT
                : '';
            const url: URL = new URL(
                `http://${VITE_BACKEND_DOMAIN + port}/register`
            );
            const body = {
                ...fields,
            };
            const req: Request = new Request(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                mode: 'cors',
            });
            const response: Response = await fetch(req);
            if (!response.ok) {
                console.error(response.status, response.statusText);
                setErrorMessage(await response.text());
                return;
            }
        } catch (e) {
            console.error(e);
        }
        await navigate('/login', {
            state: {
                fromRegistration: true,
            },
        });
    }

    return (
        <div className="Registration">
            <h1>Register!</h1>
            <form action={register}>
                <label>
                    <span>username</span>
                    <input
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>password</span>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>email</span>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>name</span>
                    <input
                        name="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <Error text={errorMessage} />
                <RegisterButton />
            </form>
        </div>
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type="submit">
            {pending ? 'Registering...' : 'Register'}
        </button>
    );
}
