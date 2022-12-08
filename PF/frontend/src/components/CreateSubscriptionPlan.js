import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

//Allow user to subs
///api/subscriptions/

// const Subscriptions = () => {
//     const [subscriptions, setSubscriptions] = useState([]);
//     useEffect(() => {
//         fetchSunscriptions();
//     }, [])
//     const fetchSubscriptions = () =>{
//         axios.get('http://localhost:8000/subscriptions').then((res) => {
//             console.log(res);
//         }).catch((err) => {
//             console.log(err);
//         });
//     };

//     return (
//         <div>
//             <h1>Subscription Plans</h1>
//             <div className='item-container'>
//                 {subscriptions.map((subscription) => (
//                     <div className='card'>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
    
// }



export default CreateSubscriptionPlan;


// Let the user pick their subscription 
// Take the user's payment details 

///api/subscriptions/{{username}}

