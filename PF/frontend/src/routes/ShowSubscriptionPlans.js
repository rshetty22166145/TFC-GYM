import CarouselPlans from "../components/subscriptionpgcar"
import './subscriptions.css';
import axios from '../api/axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
import "../css/index.css";



function ShowSubscriptionPlans(){

    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [subscriber, setSubscriber] = useState(false);

    useEffect(() => {
        getPlans();
    }, [])

    useEffect(() => {
        console.log(loaded);
    }, [loaded])

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

    const getPlans = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/plans/?limit=5000`,
            {
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `token ${token}`
                },
                withCredentials: true
            }
        );
        console.log(response.data);
        setData(response.data);
        setLoaded(true);
    }

    function BottomLink() {
        if (!loggedIn) {
            return (
                <div>
                    <Link to={`/login`}>Let's subscribe</Link>
                </div>
            )
        }
        if (!subscriber) {
            return (
                <div>
                    <Link to={`/subscribe`}>Let's subscribe</Link>
                </div>
            )
        }
        return (
            <div>
                <Link to={`/accounts/subscription`}>Let's subscribe</Link>
            </div>
        )
    }

    return(
        <div>
        <NavBar></NavBar>
        <h1 class="welcome" style={{width:"100vw", marginTop:"100px"}}><p>The Best Classes at Toronto Fitness Club</p></h1>
        <CarouselPlans></CarouselPlans>
        <div  style={{width:"100vw"}}>
        <h3 class="welcome">Limited time offers! Subscribe today!</h3>
            {loaded ? (
                <div class="welcome">
                    {data.results.map((data) => (
                        <div key ={data.id}>
                            <h4>Our Plan #{data.id} : {data.name}</h4>
                            {data.plan} ${data.price}
                            <br></br>
                            {data.description}
                            <br></br>
                        </div>
                    ))}
                    <BottomLink></BottomLink>
                    <br></br>
                </div>
            ) : (
                <div></div>
            )}
        </div>
        </div>
    )
}

export default ShowSubscriptionPlans;