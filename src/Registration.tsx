import bcrypt from 'bcryptjs';
const { VITE_SALT_ROUNDS, VITE_BACKEND_DOMAIN, VITE_BACKEND_PORT } = import.meta
    .env;

export default function Registration() {
    async function register(formData: FormData) {
        'use server';
        const fields = {
            uname: formData.get('username'),
            email: formData.get('email'),
            name: formData.get('name'),
            roles: [3]
        };
        try {
            const hash: string = await bcrypt.hash(
                formData.get('password') as string,
                +VITE_SALT_ROUNDS
            );
            const port: string = VITE_BACKEND_PORT
                ? ':' + VITE_BACKEND_PORT
                : '';
            const url: URL = new URL(
                `http://${VITE_BACKEND_DOMAIN + port}/register`
            );
            const body = {
                ...fields,
                pass: hash,
            };
            const req: Request = new Request(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    <input name="name" />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
