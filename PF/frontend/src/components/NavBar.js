import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

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
                <ul>
                    <li><Link to={`/somewhere`}>Plan</Link></li>
                    <li><Link to={`/somewhere`}>Hello {localStorage.getItem("username")}</Link></li>
                    <li><Link to={`/somewhere`}>Contact</Link></li>
                    <li><Link to={`/somewhere`}>About</Link></li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <ul>
                <li><Link to={`/somewhere`}>Plan</Link></li>
                <li><Link to={`/somewhere`}>Hello You should log in</Link></li>
                <li><Link to={`/somewhere`}>Contact</Link></li>
                <li><Link to={`/somewhere`}>About</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;