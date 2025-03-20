// import { useContext, createContext, useState } from "react";
// import Cookies from "./Cookies";
// import { useNavigate } from "react-router-dom";
// const { VITE_BACKEND_DOMAIN, VITE_BACKEND_PORT } = process.env;

// const AuthContext = createContext<AuthData>();

// export default function AuthProvider({children}) {
//     const [loggedIn, setLoggedIn] = useState(Cookies.get("loggedIn"));
//     const navigate = useNavigate();
//     const loginAction = async (data) => {
//         try {
//             const loginUrl = new URL(`${VITE_BACKEND_DOMAIN}${VITE_BACKEND_PORT ? ":" + VITE_BACKEND_PORT : ""}/login`)
//             const response = await fetch(loginUrl, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });
//             const res = await response.json();
//             if (res.ok) {
//                 return;
//             }
//         } catch (e: unknown) {
//             console.error(e);
//         }
//     }
//     return <AuthContext.Provider value={}>{children}</AuthContext.Provider>
// };

// export function useAuth() {
//     return useContext(AuthContext);
// }
