import CarouselPlans from "../components/subscriptionpgcar"
import './subscriptions.css';
import axios from '../api/axios';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import "../css/index.css";



function ShowSubscriptionPlans(){

    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getPlans();
    }, [])

    useEffect(() => {
        console.log(loaded);
    }, [loaded])

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

    return(
        <div style={{width:"100vh"}}>
        <NavBar></NavBar>
        <br></br>
        <br></br>
        <h1 class="welcome">The Best Classes at Toronto Fitness Club</h1>
        <CarouselPlans></CarouselPlans>
        <h3 class="welcome">Limited time offers! Subscribe today!</h3>
            {loaded ? (
                <div class="welcome">
                    {data.results.map((data) => (
                        <div key ={data.id}>
                            {data.name}
                        </div>
                    ))}
                </div>
                ) : (
                    <div></div>
                    )}
        </div>
    )
}

export default ShowSubscriptionPlans;