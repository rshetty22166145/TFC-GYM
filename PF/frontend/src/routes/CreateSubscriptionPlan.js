import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import e from 'cors';

const CARDNUMBER_REGEX = /^\d{16}$/;
const EXPIRY_REGEX = /^\d{4}$/;
const CVV_REGEX = /^\d{3}$/;
const SUBSCRIPTION_URL = 'http://localhost:8000/api/subscriptions/'

function CreateSubscriptionPlan(){
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const [curr_plan, setCurr_plan] = useState('');

    const [renew, setRenew] = useState('');

    const [cardnumber, setCardnumber] = useState('');
    const [validCardnumber, setValidCardnumber] = useState(false);
    const [cardnumberFocus, setCardnumberFocus] = useState(false);


    const [expiry, setExpiry] = useState('');
    const [validExpiry, setValidExpiry] = useState(false);
    const [expiryFocus, setExpiryFocus] = useState(false);

    const [cvv, setCvv] = useState('');
    const [validCvv, setValidCvv] = useState(false);
    const [cvvFocus, setCvvFocus] = useState(false);

    useEffect(() => {
        getPlans();
    }, [])

    useEffect(() => {
        console.log(curr_plan);
    }, [curr_plan])

    useEffect(() => {
        console.log("data changed");
        console.log(data);
    }, [data])

    useEffect(() => {
        console.log(loaded);
    }, [loaded])

    useEffect(() => {
        setValidCardnumber(CARDNUMBER_REGEX.test(cardnumber));
    }, [cardnumber])

    useEffect(() => {
        setValidExpiry(EXPIRY_REGEX.test(expiry));
    }, [expiry])

    useEffect(() => {
        setValidCvv(CVV_REGEX.test(cvv));
    }, [cvv])

    const getPlans = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/plans/`,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); 
            formData.append('curr_plan', data.name);
            formData.append('cardnumber', cardnumber);
            formData.append('expiry', expiry)
            formData.append('cvv', cvv);
            // Display the key/value pairs
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }

            const response = await axios.post(SUBSCRIPTION_URL, formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setCurr_plan('');
            setRenew('');
            setCardnumber('');
            setExpiry('');
            setCvv('');
        } catch (err) {
            console.log(err.response)
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <section>
                <h1>Subscribe to a Plan</h1>
                <form onSubmit={handleSubmit}>
                <label htmlFor="curr_plan">
                Select a Subscription Plan:
                <FontAwesomeIcon icon={faCheck} className={validCardnumber ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validCardnumber || !cardnumber ? "hide" : "invalid"} />
                </label>
                {loaded ? (
                    <div>
                        {data.results.map((data) => (
                            <div key ={data.id}>
                                <input
                                    type="radio"
                                    value={data.id}
                                    checked={curr_plan === `${data.id}`}
                                    onChange={(e) => setCurr_plan(e.target.value)}
                                    style={{marginRight:"10px"}}
                                >
                                </input>
                                {data.plan} {data.name} {data.price}
                            </div>
                        ))}
                        <label htmlFor="cardnumber">
                            Card Number:
                            <FontAwesomeIcon icon={faCheck} className={validCardnumber ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCardnumber || !cardnumber ? "hide" : "invalid"} />
                        </label>
                        <input
                        type="text"
                        id="cardnumber"
                        autoComplete="off"
                        onChange={(e) => setCardnumber(e.target.value)}
                        value={cardnumber}
                        required
                        aria-invalid={validCardnumber ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setCardnumberFocus(true)}
                        onBlur={() => setCardnumberFocus(false)}
                        />
                        <p id="cardnumbernot" className={cardnumberFocus && cardnumber && !validCardnumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a valid card number.<br />
                        </p>
                        <br></br>
                        <label htmlFor="expiry">
                            Expiry Date:
                            <FontAwesomeIcon icon={faCheck} className={validExpiry ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validExpiry || !expiry ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="expiry"
                            autoComplete="off"
                            onChange={(e) => setExpiry(e.target.value)}
                            value={expiry}
                            required
                            aria-invalid={data.validCardnumber ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setExpiryFocus(true)}
                            onBlur={() => setExpiryFocus(false)}
                        />
                        <p id="expirynot" className={expiryFocus && expiry && !validExpiry ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a valid expiry date.<br />
                        </p>
                        <br></br>
                        <label htmlFor="cvv">
                            CVV:
                            <FontAwesomeIcon icon={faCheck} className={validCvv ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCvv || !cvv ? "hide" : "invalid"} />
                        </label>
                        <input
                        type="text"
                        id="cvv"
                        autoComplete="off"
                        onChange={(e) => setCvv(e.target.value)}
                        value={cvv}
                        required
                        aria-invalid={validCardnumber ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setCvvFocus(true)}
                        onBlur={() => setCvvFocus(false)}
                        />
                        <p id="cvvnot" className={cvvFocus && cvv && !validCvv ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a valid CVV.<br />
                        </p>
                        <br></br>
                        <label htmlFor="renew">Would you like recurring payments?</label>
                        <input
                        type="checkbox"
                        id="renew"
                        value={renew}
                        onChange={(e) => setRenew(!renew)}>
                        </input>
                        <button>Submit</button>
                    </div>
                ) : (
                    <div></div>
                )}
            </form>
            </section>
        </div>
    )
}

//     return(
//         <div>
//             <NavBar></NavBar>
//             <h1>Available Subscription Plans</h1>
//             <div className='item-container'>
//                 <CreateSubscriptionPlan></CreateSubscriptionPlan>
//             </div>
//         </div>
//     );
// }

export default CreateSubscriptionPlan;