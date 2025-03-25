import { Link, Routes, Route } from 'react-router';
import Login from './Login';
import './App.css';
import Homepage from './Homepage';
import LandingPage from './Landing';
import Registration from './Registration';
import { AuthProvider, ProtectedRoute, useAuth } from './Auth';

const Nav = () => {
    const { userInfo, onLogout } = useAuth();
    return (
        <nav className="nav">
            <Link to="/" className="nav-item">
                Main
            </Link>
            {userInfo ? (
                <Link to="/" onClick={onLogout} className="nav-item">
                    Logout
                </Link>
            ) : (
                <Link to="/login" className="nav-item">
                    Login
                </Link>
            )}
            <Link to="/register" className="nav-item">
                Register
            </Link>
            <Link to="/home" className="nav-item">
                Home
            </Link>
        </nav>
    );
};

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Nav />
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route index element={<LandingPage />} />
                    <Route
                        path="home"
                        element={
                            <ProtectedRoute>
                                <Homepage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="register" element={<Registration />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
