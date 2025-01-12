const { VITE_USERNAME_MAX_LENGTH, VITE_USERNAME_MIN_LENGTH, VITE_PASSWORD_MAX_LENGTH, VITE_PASSWORD_MIN_LENGTH, VITE_COMMUNITY_NAME } = import.meta.env;

const Login = (props) => {
    return (
        <div className="Login">
            <form>
                <h2>Welcome to {VITE_COMMUNITY_NAME}!</h2>
                <label htmlFor="username">username</label>
                <input className="formItem" type="text" name="username" id="username" maxLength={VITE_USERNAME_MAX_LENGTH} minLength={VITE_USERNAME_MIN_LENGTH}></input>
                <br />
                <label htmlFor="password">password</label>
                <input className="formItem" type="password" name="password" id="password" maxLength={VITE_PASSWORD_MAX_LENGTH} minLength={VITE_PASSWORD_MIN_LENGTH}></input>
                <br />
                <input type="submit" value="Login"></input>
                <input className="formButton" type="button" value="Register" ></input>
            </form>
        </div>
    )
}

export default Login;