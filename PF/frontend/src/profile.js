import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';

//regex checks
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function ProfileView() {
    const [user, setUser] = useState([]);
    const { username } = useParams();
    const getUser = async () => {
        const token = localStorage.getItem('token')
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
    }, []);

    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [first_name, setFirst_name] = useState('');

    const [last_name, setLast_name] = useState('');

    const [phone_number, setPhone_number] = useState('');

    const [avatar, setAvatar] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [password, email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
    }, [password])

    /*
    {
    "username": "rohit",
    "first_name": "rohit",
    "last_name": "",
    "email": "rshetty22166@gmail.com",
    "phone_number": "",
    "avatar": null
    }
    */

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v2 = PWD_REGEX.test(password);
        //const v3 = PWD_REGEX.test(email);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("password", password);
            formData.append("email", email);
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("phone_number", phone_number);
            formData.append("avatar", avatar);

            const token = localStorage.getItem('token')
            console.log(token)
            const response = await axios.put(`http://localhost:8000/api/accounts/${username}/`, formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    'Authorization': `token ${token}`,
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
    /*
    return (
        <div>
            <h2>{ user.username }</h2>
            <h3>{ user.first_name }</h3>
            <h3>{ user.last_name }</h3>
            <h3>{ user.email }</h3>
            <h3>{ user.phone_number }</h3>
            <h3>{ user.avatar }</h3>
        </div>
    )
    */


    return (
        <>
            {success ? (
                <section>
                    <p>
                        <a href="http://localhost:3000/"> Go Back Home!</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
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
                            defaultValue={user.password}
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
                            defaultValue={user.email}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
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
                            defaultValue={user.first_name}
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
                            defaultValue={user.last_name}
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
                            defaultValue={user.phone_number}
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
                            defaultValue={user.avatar}
                        />

                        <button disabled={!validPwd || !validEmail ? true : false}>Edit</button>
                    </form>
                </section>
            )}
        </>
    )

}
export default ProfileView;