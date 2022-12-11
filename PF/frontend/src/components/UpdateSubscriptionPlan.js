
import { useEffect } from 'react'
import axios from '../api/axios'
import { useParams } from 'react-router-dom'


const SUBSCRIPTON_PLAN_REGEX = /^\d+$/;
const CARDNUMBER_REGEX = /^\d{16}$/;
const EXPIRY_REGEX = /^\d{4}$/;
const CVV_REGEX = /^\d{3}$/;
const SUBSCRIPTION_URL = 'http://localhost:8000/api/subscriptions/'

    function deleteSubscription(){
        fetch(`http://localhost:8000/subscriptions/${username}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((response) => {
                console.warn(response)
                getUserInformation()
            })
        })
    }

const UpdateSubscription = () => {

    const [curr_plan, setCurr_plan] = useState('');
    const [validCurr_plan, setValidCurr_plan] = useState(false);
    const [userFocus, setCurr_planFocus] = useState(false);

    const [renew, setRenew] = useState('');
    const [validRenew, setValidRenew] = useState(false);
    const [renewFocus, setRenewFocus] = useState(false);

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
        setValidSubscriptonplan(SUBSCRIPTON_PLAN_REGEX.test(curr_plan));
    }, [curr_plan])

    useEffect(() => {
        setValidCardnumber(CARDNUMBER_REGEX.test(cardnumber));
    }, [cardnumber])

    useEffect(() => {
        setValidExpiry(EXPIRY_REGEX.test(expiry));
    }, [expiry])

    useEffect(() => {
        setValidCvv(CVV_REGEX.test(cvv));
    }, [cvv])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); 
            formData.append('curr_plan', curr_plan);
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
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setCurr_plan('');
            setCardnumber('');
            setExpiry('');
            setCvv('');
        } catch (err) {
            console.log(err.response)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Subscription Purchase Failed')
            }
            errRef.current.focus();
        }
    }
    return(
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="http://localhost:3000/Login">Sign In</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Pick a Subscription Plan</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="curr_plan">
                        Choose Subscription:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="curr_plan"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={username}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="renew">
                        Would you like recurring payments?
                    </label>
                    <input
                        type="checkbox"
                        id="renew"
                        autoComplete="off"
                        onChange={(e) => setRenew(e.target.value)}
                        value={renew}
                        required
                        aria-describedby="uidnote"
                        onFocus={() => setRenewFocus(true)}
                        onBlur={() => setRenewFocus(false)}
                    />
                    <p id="uidnote" className={renewFocus && renew ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please select an option.
                    </p>

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
                        aria-invalid={validCardnumber ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setExpiryFocus(true)}
                        onBlur={() => setExpiryFocus(false)}
                    />
                    <p id="expirynot" className={expiryFocus && expiry && !validExpiry ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please enter a valid expiry date.<br />
                    </p>
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

                    <button disabled={!validCurr_plan || !validCardnumber || !validExpiry || !validCvv ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already have a subscription?<br />
                    <span className="line">
                        <a href="http://localhost:3000/api/subscriptions/{username}">Update Subscription</a>
                    </span>
                </p>
            </section>
        )}
        </>
    )
}
export default UpdateSubscription;





//     function getUserInformation(){
//         axios
//         get(`http://localhost:8000/subscriptions/${params.username}`)
//         .then((res) => {
//             SpeechRecognitionResult.json().then(resp) => {
//                 setUser(res)
//                 setUserId(res.id)
//                 setCurr_plan(res.curr_plan)
//                 setCardnumber(res.cardnumber)
//                 setExpiry(res.expiry)
//                 setCvv(res.cvv)
//             }
//         })
//     }
//     function deleteSubscription(){
//         fetch(`http://localhost:8000/subscriptions/${params.username}`, {
//             method: 'DELETE'
//         }).then((result) => {
//             result.json().then((response) => {
//                 console.warn(response)
//                 getUserInformation()
//             })
//         })
//     }

//     function updateSubscription(){
//         let info={curr_plan, cardnumber, expiry, cvv}
//         fetch(`http://localhost:8000/subscriptions/${params.username}`, {
//             method: 'PUT',
//             headers:{
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(info)
//         }).then((result) => {
//             result.json().then((response => {
//                 console.warn(response)
//                 getUserInformation()
//             })
//         })
//     }

//     return (
//         <div>
//             <h1>Subscription Details</h1>
//             <h2>Current Subscription</h2>
//             <FormGroup>
//                 <Label for='curr_plan'>Current Subscription:</Label>
//                 <Input type="number" name="curr_plan" placeholder={info.curr_plan} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
//             </FormGroup>
//             <FormGroup>
//                 <Label for='renew'>Recurring Payments:</Label>
//                 <Input type="checkbox" name="renew" placeholder={info.renew} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
//             </FormGroup>
//             <h2>Payment Information</h2>
//             <FormGroup>
//                 <Label for='cardnumber'>Credit Card Number:</Label>
//                 <Input type="number" name="cardnumber" placeholder={info.cardnumber} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
//             </FormGroup>
//             <FormGroup>
//                 <Label for='expiry'>Expiry Date:</Label>
//                 <Input type="number" name="expiry" placeholder={info.expiry} onChange={(e) => {setExpiry(e.target.value)}}></Input>
//             </FormGroup>
//             <FormGroup>
//                 <Label for='cardnumber'>CVV:</Label>
//                 <Input type="number" name="cvv" placeholder={info.cvv} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
//             </FormGroup>
//             <button onClick={deleteSubscription}>Cancel Subscription</button>
//             <button onClick={updateSubscription}>Update User Subscription</button>
//         </div>
//     )















// // class UpdateSubscriptionForm extends React.Component{
// //     state = {
// //         pk: 0,
// //         curr_plan:'', //should be previous plan 
// //         renew:'', //previous plan
// //         cardnumber:'',
// //         expiry:'',
// //         cvv:''
// //     };

// //     const params = useParams();

// //     onChange = e => {
// //         this.setState({[e.target.name]: e.target.value})
// //     }

// //     editStudent = e => {
// //         e.preventDefault();
// //         axios.put(`http://localhost:8000/subscriptions/${params.username}` + this.state.pk, this.state).then(() => {
// //           this.props.resetState();
// //           this.props.toggle();
// //         });
// //       }, [params.username];

// //       render()
// //       return(
// //           <UpdateSubscriptionForm preloadedValues={data}/>
// //       )


// // }

// // //Allow user to edit their subscription


