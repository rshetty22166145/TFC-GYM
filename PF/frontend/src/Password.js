import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import './accounts.css';
import NavBar from "./components/NavBar";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function PasswordView() {
    const [user, setUser] = useState([]);
    const errRef = useRef();
    
    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const username = localStorage.getItem('username');

    const getUser = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        const json = await(await fetch(`http://localhost:8000/api/accounts/${username}/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `token ${token}`,
        }})).json();
        console.log(json);
        setUser(json);
    }

    useEffect(() => {
        getUser();
    },[])

    useEffect(() => {
        console.log(user);
    },[user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("password", password);
            formData.append("first_name", user.first_name);
            formData.append("email", user.email);
            formData.append("last_name", user.last_name);
            formData.append("phone_number", user.phone_number);

            const token = localStorage.getItem('token')
            console.log(token)
            const response = await axios.put(`http://localhost:8000/api/accounts/${username}/`, formData,
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}`},
                    withCredentials: true,
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
  
        } catch (err) {
            console.log(err.response)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Invalid Info');
            } else {
                setErrMsg('Invalid Info')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <NavBar></NavBar>
            {success ? (
                <section class="outer">
                    <h1 class="prompt">Password Changed!</h1>
                    <p>
                        <a href="http://localhost:3000/"> Go Back Home!</a>
                    </p>
                </section>
            ) : (
                <section class="outer" style={{marginTop:"100px"}}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 class="prompt">Change Password</h1>
                    <form onSubmit={handleSubmit} class="basicform">
                        New Password:<input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                        <button disabled={!validPwd ? true : false}>Change</button>
                    </form>
                </section>
            )}
        </>
    )

}
export default PasswordView;