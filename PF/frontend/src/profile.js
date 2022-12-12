import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import NavBar from "./components/NavBar";

//regex checks
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
function ProfileView() {
    const [user, setUser] = useState([]);
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);


    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarChanged, setAvatarChanged] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

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
    }, []);
    useEffect(() => {
        console.log("first name loaded: "+ first_name);
    }, [first_name]);
    useEffect(() => {
        console.log("last name loaded: "+ last_name);
    }, [last_name]);
    useEffect(() => {
        console.log("email loaded: "+ email);
    }, [email]);
    useEffect(() => {
        console.log("phone number loaded: "+ phone_number);
    }, [phone_number]);
    useEffect(() => {
        console.log("avatar changed :"+ avatarChanged);
    }, [avatarChanged]);
    useEffect(() => {
        console.log(avatar);
        console.log("avatar loaded: "+ avatar);
    }, [avatar]);


    useEffect(() => {
        if (user.first_name !== null) {
            setFirst_name(user.first_name);
        }
        if (user.last_name !== null) {
            setLast_name(user.last_name);
        }
        if (user.email !== null) {
            setEmail(user.email);
        }
        if (user.phone_number !== null) {
            setPhone_number(user.phone_number);
        }
        if (user.avatar !== null) {
            setAvatar(user.avatar);
        }
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("phone_number", phone_number);
            if (avatarChanged) {
                formData.append("avatar", avatar);
            }

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
    
    function Image() {
        if (avatarChanged) {
            return <img src={URL.createObjectURL(avatar)} alt="Avatar" className="photo"/>
        } else {
            return <img src={avatar} alt="Avatar" className="photo"/>
        }
    }

    return (
        <>
            <NavBar></NavBar>
            {success ? (
                <div>
                    <section class="outer">
                        <h1 class="prompt">Profile Edited!</h1>
                        <p>
                            <a href="http://localhost:3000/"> Go Back Home!</a>
                        </p>
                    </section>
                </div>
            ) : (
                <section class="outer" style={{marginTop:"100px"}}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 class="prompt">Edit Profile</h1>
                    <form onSubmit={handleSubmit} class="basicform">
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
                            defaultValue={email}
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
                            defaultValue={first_name}
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
                            defaultValue={last_name}
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
                            defaultValue={phone_number}
                            required
                        />

                        <label htmlFor="avatar">
                            Avatar:
                        </label>
                        <Image/>
                        <input
                            type="file"
                            id="Avatar"
                            autoComplete="off"
                            onChange={(e) => {
                                setAvatar(e.target.files[0]);
                                setAvatarChanged(true);
                            }}
                            defaultValue={avatar}
                        />

                        <button disabled={!validEmail ? true : false}>Edit</button>
                    </form>
                </section>
            )}
        </>
    )

}
export default ProfileView;