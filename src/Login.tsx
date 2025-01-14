import crypto from 'crypto';

const { VITE_USERNAME_MAX_LENGTH, VITE_USERNAME_MIN_LENGTH, VITE_PASSWORD_MAX_LENGTH, VITE_PASSWORD_MIN_LENGTH, VITE_COMMUNITY_NAME, VITE_BACKEND_DOMAIN, VITE_BACKEND_PORT, VITE_ENCRYPT_SECRET } = import.meta.env;

export async function login(formData: FormData) {
    const port: string = VITE_BACKEND_PORT ? ':' + VITE_BACKEND_PORT : '';
    const loginUrl: URL = new URL('https://' + VITE_BACKEND_DOMAIN + port + '/login');
    // encrypt password for transmission
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', VITE_ENCRYPT_SECRET, iv);
    let encryptedPass = cipher.update(formData.get('password') as string, 'utf-8', 'hex');
    encryptedPass += cipher.final('hex');
    const requestBody = { uname: formData.get('username'), pass: encryptedPass }
    const request: Request = new Request(loginUrl, { method: 'POST', body: JSON.stringify(requestBody) })
    const res = await fetch(request);
}

export default function Login() {
    return (
        <div className="Login">
            <form action={login}>
                <h2>Welcome to {VITE_COMMUNITY_NAME}!</h2>
                <label htmlFor="username">username</label>
                <input className="formItem" type="text" name="username" id="username" maxLength={VITE_USERNAME_MAX_LENGTH} minLength={VITE_USERNAME_MIN_LENGTH}></input>
                <br />
                <label htmlFor="password">password</label>
                <input className="formItem" type="password" name="password" id="password" maxLength={VITE_PASSWORD_MAX_LENGTH} minLength={VITE_PASSWORD_MIN_LENGTH}></input>
                <br />
                <input type="submit" value="Login"></input>
                <input className="formButton" type="button" value="Register"></input>
            </form>
        </div>
    )
}