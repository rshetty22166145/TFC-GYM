import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from '../api/axios';
import { useParams } from "react-router-dom";

function ClassDetail(){
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [subscriber, setSubscriber] = useState(false);
    const [clas, setClas] = useState(null);
    const [loaded2, setLoaded2] = useState(false);
    const [data, setData] = useState(null);
    const [next, setNext] = useState(null);
    const { id } = useParams();

    useEffect(() => (
        console.log(loaded)
    ), [loaded])

    useEffect(() => {
        if (localStorage.getItem("username") !== null) {
            setLoggedIn(true);
        }
    }, [])

    useEffect(() => {
        const getSubscribe = async () => {
            const username = localStorage.getItem("username");
            const token = localStorage.getItem("token");
            const json = await(await fetch(`http://localhost:8000/api/accounts/${username}/`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${token}`,
            }})).json();
            console.log(json)
            setSubscriber(json.subscribe);
        }
        console.log("Are you logged in? : " + loggedIn);
        if (loggedIn) {
            getSubscribe()
        }
    }, [loggedIn])

    useEffect(() => {
        console.log("Are you subscriber? : " + subscriber);
    }, [subscriber])

    useEffect(() => {
        getClass();
    }, []);

    useEffect(() => (
        console.log(clas)
    ), [clas])

    const getClass = async () => {
        const json = await(
            await fetch(`http://localhost:8000/classes/${id}/`)
        ).json();
        setClas(json);
        setLoaded(true);
    }

    function ClassInfo(){

        if(loaded){
            return(
                <div>
                    <h2>Studio {clas.studio.name}</h2>
                    <h3>Welcome to the class {clas.name}</h3>
                </div>
            )
        }
        return null;
    }

    function ClassEnrol(){

        const handleEnrol = (e) => {
            e.preventDefault();
            try {
                const enrol = async() => {
                    const url = `http://127.0.0.1:8000/api/accounts/admin/enrol/`;
                    const token = localStorage.getItem("token");
                    const class_id = id;
                    const response = await axios.post(url,
                        JSON.stringify({ class_id }),
                        {
                            headers: { 
                                'Content-Type': 'application/json' ,
                                'Authorization': `token ${token}`,
                            },
                            withCredentials: true
                        }
                    );
                    console.log(response);
                }
                enrol();
                console.log("enrolled");
            } catch (err) {
                console.log("you are not subscriber");
            }
        }

        if (subscriber){
            return (
                <div>
                    <button onClick={handleEnrol}>Enrol All Upcoming Classes</button>
                </div>
            )
        }
        return null;
    }

    function ClassDrop(){

        const handleDrop = (e) => {
            e.preventDefault();
            try {
                const drop = async() => {
                    const url = `http://127.0.0.1:8000/api/accounts/admin/drop/`;
                    const token = localStorage.getItem("token");
                    const class_id = id;
                    const response = await axios.post(url,
                        JSON.stringify({ class_id }),
                        {
                            headers: { 
                                'Content-Type': 'application/json' ,
                                'Authorization': `token ${token}`,
                            },
                            withCredentials: true
                        }
                    );
                    console.log(response);
                }
                drop();
                console.log("you dropped");
            } catch (err) {
                console.log("you are not subscriber");
            }
        }

        if (subscriber){
            return (
                <div>
                    <button onClick={handleDrop}>Drop All Upcoming Classes</button>
                </div>
            )
        }
        return null;
    }

    return(
        <div>
            <NavBar></NavBar>
            <ClassInfo></ClassInfo>
            <ClassEnrol></ClassEnrol>
            <ClassDrop></ClassDrop>
        </div>
    )
}

export default ClassDetail