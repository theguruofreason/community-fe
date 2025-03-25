import { useAuth } from './Auth';

export default function Homepage() {
    const { userInfo } = useAuth();
    return (
        <div className="Homepage">
            <h1>Welcome to the homepage, {userInfo?.uname}!</h1>
        </div>
    );
}
