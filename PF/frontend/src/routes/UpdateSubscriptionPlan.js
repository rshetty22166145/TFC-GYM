import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from '../api/axios';
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import './subscriptions.css';

function SubscriptionDetail(){
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [subscriber, setSubscriber] = useState(false);
    
    let history = useHistory();

    useEffect(() => {
        getUserSubscriptionData();
    }, [])

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
        console.log("data incoming");
        console.log(data)
    }, [data])

    const getUserSubscriptionData = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8000/api/subscriptions/${username}/`,
            {
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `token ${token}`
                },
                withCredentials: true
            }
        );
        console.log("response")
        console.log(response.data);
        setData(response.data);
        setLoaded(true);
    }
    
    function UserSubscriptonInfo(){
        if(!subscriber){
            return(
                <div>
                    <h1>
                        <Link to={`/subscribe`}>Let's get to subscribe</Link>
                    </h1>
                </div>
            )
        }
        if(loaded){
            return(
                <section>
                <h1 class="prompt left">Subscription Plan Details</h1>
                <form class="basicform" key ={data.id}>
                    {/* <div className='card' key ={data.id} style={{margin:"20px"}}> */}
                    <div class="left">Current Plan: {data.curr_plan.name}<br></br>
                    Last Payment: {data.last_paid}<br></br>
                    Subscription End Date: {data.next_pay}<br></br>
                    Renewal:{
                        data.renew ? (
                            <FontAwesomeIcon icon={faCheck} style={{marginLeft:"5px"}}/>
                        ):(
                            <FontAwesomeIcon icon={faTimes} style={{marginLeft:"5px"}}/>
                        )}
                    </div>
                    <br></br>
                    <h1 class="prompt left">Payment Information</h1>
                    <div class="left">Card Number: {data.cardnumber}<br></br>
                    Expiry Date: {data.expiry}<br></br>
                    CVV: {data.cvv}</div>
                    {/* </div> */}
                </form>
                </section>
            )
        }
        return null;
    }

    function CancelSubscription(){
        const handleCancel = (e) => {
            e.preventDefault();
            try {
                const renew = async() => {
                    const username = localStorage.getItem("username");
                    const url = `http://localhost:8000/api/subscriptions/${username}/`;
                    const token = localStorage.getItem("token");
                    const formData = new FormData(); 
                    formData.append('curr_plan', Number(data.curr_plan.id));
                    formData.append('cardnumber', data.cardnumber);
                    formData.append('expiry', data.expiry)
                    formData.append('cvv', data.cvv);
                    formData.append('renew', false)
                    const response = await axios.put(url, formData,
                        {
                            headers: { 
                                'Content-Type': 'application/json' ,
                                'Authorization': `token ${token}`,
                            },
                            withCredentials: true
                        }
                    );
                    console.log(response);
                    getUserSubscriptionData();
                }
                renew();
                console.log("Subscription plan now renew");
            } catch (err) {
                console.log("you are not subscriber");
            }
        }
        if (subscriber){
            return (
                <div>
                    <button onClick={(e) => {
                        history.push(`/accounts/subscription/edit`)
                    }}>Edit Subscription</button>
                    <button onClick={handleCancel}>Cancel Subscription</button>
                </div>
            )
        }
        return null;
    }

    function RenewSubscription(){
        const handleCancel = (e) => {
            e.preventDefault();
            try {
                const renew = async() => {
                    const username = localStorage.getItem("username");
                    const url = `http://localhost:8000/api/subscriptions/${username}/`;
                    const token = localStorage.getItem("token");
                    const formData = new FormData(); 
                    formData.append('curr_plan', Number(data.curr_plan.id));
                    formData.append('cardnumber', data.cardnumber);
                    formData.append('expiry', data.expiry)
                    formData.append('cvv', data.cvv);
                    formData.append('renew', true)
                    const response = await axios.put(url, formData,
                        {
                            headers: { 
                                'Content-Type': 'application/json' ,
                                'Authorization': `token ${token}`,
                            },
                            withCredentials: true
                        }
                    );
                    console.log(response);
                    getUserSubscriptionData();
                }
                renew();
                console.log("Subscription plan now renew");
            } catch (err) {
                console.log("you are not subscriber");
            }
        }
        if (subscriber){
            return (
                <div>
                    <button onClick={(e) => {
                        history.push(`/accounts/subscription/edit`)
                    }}>Edit Subscription</button>
                    <button onClick={handleCancel}>Restart Subscription</button>
                </div>
            )
        }
        return null;
    }

    return(
        <div>
            <NavBar></NavBar>
            <br></br>
            <br></br>
            <section class="outer" style={{minHeight:"0px"}}>
            <UserSubscriptonInfo></UserSubscriptonInfo>
            { data.renew ? (
                <CancelSubscription></CancelSubscription>
            ):(
                <RenewSubscription></RenewSubscription>
            )}
            </section>
        </div>
    )

}

export default SubscriptionDetail
