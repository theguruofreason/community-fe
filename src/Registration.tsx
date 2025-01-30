export default function Registration() {
    async function register(formData: FormData) {
        'use server'
        console.log(formData);
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