import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import './accounts.css';
import { useHistory } from "react-router-dom";
import NavBar from "./components/NavBar";

//Regex Checks
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = 'http://localhost:8000/api/accounts/';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [password2, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    const [first_name, setFirst_name] = useState('');

    const [last_name, setLast_name] = useState('');

    const [phone_number, setPhone_number] = useState('');

    const [avatar, setAvatar] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    let history = useHistory();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        if (success) {
            history.push('/login');
        }
    }, [success])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === password2);
    }, [password, password2])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, password2, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        //const v3 = PWD_REGEX.test(email);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("password2", password2);
            formData.append("email", email);
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("phone_number", phone_number);
            formData.append("avatar", avatar);
            // Display the key/value pairs
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            
            const response = await axios.post(REGISTER_URL, formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
            setEmail('');
            setFirst_name('');
            setLast_name('');
            setPhone_number('');
            setAvatar('');
  
        } catch (err) {
            console.log(err.response)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <NavBar></NavBar>
            {success ? (
                <section className="outer">
                    <h1 className="prompt">Success!</h1>
                    <p>
                        <a href="http://localhost:3000/Login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className="outer" style={{marginTop:"150px"}}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="prompt">Register</h1>
                    <p className="prompt">All fields are required</p>
                    <form onSubmit={handleSubmit} className="basicform">
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
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


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && password2 ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !password2 ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={password2}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            required
                        />
                        <p id="emailnot" className={EmailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Email must be a valid email address.<br />
                        </p>

                        <label htmlFor="first_name">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            autoComplete="off"
                            onChange={(e) => setFirst_name(e.target.value)}
                            value={first_name}
                            required
                        />

                       <label htmlFor="last_name">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            autoComplete="off"
                            onChange={(e) => setLast_name(e.target.value)}
                            value={last_name}
                            required
                        />

                        <label htmlFor="phone_number">
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            id="phone_number"
                            autoComplete="off"
                            onChange={(e) => setPhone_number(e.target.value)}
                            value={phone_number}
                            required
                        />

                        <label htmlFor="avatar">
                            Avatar:
                        </label>
                        <input
                            type="file"
                            id="Avatar"
                            autoComplete="off"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            value={avatar.filename}
                            required
                        />

                        <button disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}>Sign Up</button>
                    </form>
                    <p className="smallprompt">
                        Already registered?<br />
                        <span className="line">
                            <a href="http://localhost:3000/Login">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register