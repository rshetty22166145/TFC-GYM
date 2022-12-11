import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import './accounts.css';
import axios from './api/axios';
const LOGIN_URL = 'http://localhost:8000/api/accounts/login/';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(username);
            console.log(password);
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' ,},
                    withCredentials: true
                }
            );
            console.log(response);
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
            //save token to local storage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username);
            //const roles = response?.data?.roles;
            setAuth({ username, password, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Login Information!');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Invalid Login Information!');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success  ? (
                <section class="outer">
                    <h1 class="prompt">You are logged in!</h1>
                    <br />
                    <p>
                        <a href="http://localhost:3000/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section class="outer">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 class="prompt">Login</h1>
                    <form onSubmit={handleSubmit} class="basicform">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p class="smallprompt">
                        Create a new account:<br />
                        <span className="line">
                            <a href="http://localhost:3000/Register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login