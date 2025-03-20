const { VITE_BACKEND_DOMAIN, VITE_BACKEND_PORT, VITE_DEFAULT_ROLE } =
    import.meta.env;
import { useFormStatus } from 'react-dom';
import { useNavigate } from 'react-router';

export default function Registration() {
    const navigate = useNavigate();
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
                    <input name="username" required />
                </label>
                <label>
                    <span>password</span>
                    <input name="password" type="password" required />
                </label>
                <label>
                    <span>email</span>
                    <input name="email" type="email" />
                </label>
                <label>
                    <span>name</span>
                    <input name="name" required />
                </label>
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
