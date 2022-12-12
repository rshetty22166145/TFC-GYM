
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from '../api/axios';
import { useParams } from "react-router-dom";

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


    useEffect(() => (
        console.log(data)
    ), [data])

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
        console.log(response.data);
        setData(response.data.results);
        setLoaded(true);
    }
    
    function UserSubscriptonInfo(){
        if(loaded){
            return(
                <div>
                    {data.map((data) => (
                    <div className='card' key ={data.id} style={{margin:"20px"}}>
                        <h2>Subscription Plan Details</h2><br></br>
                    <h3>Current Plan: {data.curr_plan}</h3><br></br>
                    <h3>Renewal Option: {data.renew}</h3><br></br>
                    <h3>Next Payment: {data.next_pay}</h3><br></br>
                    <h2>Payment Information</h2><br></br>
                    <h3>Card Number: {data.cardnumber}</h3>
                    <h3>Expiry Date: {data.expiry}</h3>
                    <h3>CVV: {data.cvv}</h3>
                    </div>
                    ))}
                </div>
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
                    const usersubscription_id = id;
                    const response = await axios.delete(url,         //delete?
                        JSON.stringify({ usersubscription_id }),
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
            <UserSubscriptonInfo></UserSubscriptonInfo>
            <CancelSubscription></CancelSubscription>
        </div>
    )

}

export default SubscriptionDetail
