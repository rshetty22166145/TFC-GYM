import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("username") !== null) {
            setLoggedIn(true);
        }
    }, [])

    useEffect(() => {
        console.log("User logged in? " + loggedIn);
    }, [loggedIn])

    if (loggedIn) {
        return (
            <div style={{all: "revert"}}>
                <ul>
                    <li><Link to={`/`}><i className="fa fa-fw fa-home"></i>Home</Link></li>
                    <li><Link to={`/studio`}><i className="fa fa-fw fa-search"></i>Studio</Link></li>
                    <li><Link to={`/somewhere`}>Contact</Link></li>
                    <li><Link to={`/somewhere`}>About</Link></li>
                    <li style={{float:"right"}}>
                        <Link to={`/logout`}>
                        Logout
                        </Link>
                    </li>
                    <li style={{float:"right"}}>
                        <Link>
                        Profile
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <ul>
                <li><Link to={`/somewhere`}>Plan</Link></li>
                <li><Link to={`/somewhere`}>Hello {localStorage.getItem("username")}</Link></li>
                <li><Link to={`/somewhere`}>Contact</Link></li>
                <li><Link to={`/somewhere`}>About</Link></li>
                <li style={{float:"right"}}><Link to={`/register`}>Register</Link></li>
                <li style={{float:"right"}}><Link to={`/login`}>Log in</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;