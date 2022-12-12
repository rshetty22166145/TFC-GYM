
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from '../api/axios';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import './subscriptions.css';

function SubscriptionDetail(){
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [subscriber, setSubscriber] = useState(false);

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

    function Redirect(){
        return <Redirect to='/' />
    }
    
    function UserSubscriptonInfo(){
        if(loaded){
            return(
                <section>
                <h1 class="prompt left">Subscription Plan Details</h1>
                <form class="basicform" key ={data.id}>
                    {/* <div className='card' key ={data.id} style={{margin:"20px"}}> */}
                    <div class="left">Current Plan: {data.curr_plan.name}<br></br>
                    Renewal Option:{
                        data.renew ? (
                            <FontAwesomeIcon icon={faCheck}/>
                        ):(
                            <FontAwesomeIcon icon={faTimes}/>
                        )}
                    <br></br>
                    Last Payment: {data.last_paid}<br></br>
                    Subscription End Date: {data.next_pay}</div>
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
                const cancel = async() => {
                    const username = localStorage.getItem("username");
                    const url = `http://localhost:8000/api/subscriptions/${username}/`;
                    const token = localStorage.getItem("token");
                    const response = await axios.delete(url,
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
                cancel();
                console.log("Subscription plan cancelled");
            } catch (err) {
                console.log("you are not subscriber");
            }
        }
        if (subscriber){
            return (
                <div>
                    <button onClick={handleCancel}>Cancel Subscription</button>
                </div>
            )
        }
        return null;
    }

    return(
        <div>
            <NavBar></NavBar>
            <section class="outer">
            <UserSubscriptonInfo></UserSubscriptonInfo>
            <CancelSubscription></CancelSubscription>
            </section>
        </div>
    )

}

export default SubscriptionDetail
