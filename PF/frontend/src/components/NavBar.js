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
            <div>
                <ul className="navbar">
                    <li><Link to={`/`}><i className="fa fa-fw fa-home"></i>Home</Link></li>
                    <li><Link to={`/studio`}><i className="fa fa-fw fa-search"></i>Studio</Link></li>
                    <li><Link to={`/somewhere`}><i className="fa fa-fw fa-book"></i>Plan</Link></li>
                    <li style={{float:"right"}}>
                        <Link to={`/logout`}>
                        Logout
                        </Link>
                    </li>
                    <li style={{float:"right"}}>
                        <Link to={`/profile`}>
                        <i className="fa fa-fw fa-user"></i>
                        Profile
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <ul className="navbar">
                <li><Link to={`/`}><i className="fa fa-fw fa-home"></i>Home</Link></li>
                <li><Link to={`/studio`}><i className="fa fa-fw fa-search"></i>Studio</Link></li>
                <li><Link to={`/somewhere`}><i className="fa fa-fw fa-book"></i>Plan</Link></li>
                <li style={{float:"right"}}><Link to={`/register`}>Register</Link></li>
                <li style={{float:"right"}}><Link to={`/login`}>Log in</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;