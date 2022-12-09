
import React from 'react'
import axios from '../api/axios'
import { useParams } from 'react-router-dom'

function UpdateSubscriptionForm(){
    const [curr_plan, setCurr_plan] = useState("");
    const [cardnumber, setCardnumber] = useState("");
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        getUserInformation();
    }, [])
    function getUserInformation(){
        axios
        get(`http://localhost:8000/subscriptions/${params.username}`)
        .then((res) => {
            SpeechRecognitionResult.json().then(resp) => {
                setUser(res)
                setUserId(res.id)
                setCurr_plan(res.curr_plan)
                setCardnumber(res.cardnumber)
                setExpiry(res.expiry)
                setCvv(res.cvv)
            }
        })
    }
    function deleteSubscription(){
        fetch(`http://localhost:8000/subscriptions/${params.username}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((response) => {
                console.warn(response)
                getUserInformation()
            })
        })
    }

    function updateSubscription(){
        let info={curr_plan, cardnumber, expiry, cvv}
        fetch(`http://localhost:8000/subscriptions/${params.username}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then((result) => {
            result.json().then((response => {
                console.warn(response)
                getUserInformation()
            })
        })
    }

    return (
        <div>
            <h1>Subscription Details</h1>
            <h2>Current Subscription</h2>
            <FormGroup>
                <Label for='curr_plan'>Current Subscription:</Label>
                <Input type="number" name="curr_plan" placeholder={info.curr_plan} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='renew'>Recurring Payments:</Label>
                <Input type="checkbox" name="renew" placeholder={info.renew} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
            </FormGroup>
            <h2>Payment Information</h2>
            <FormGroup>
                <Label for='cardnumber'>Credit Card Number:</Label>
                <Input type="number" name="cardnumber" placeholder={info.cardnumber} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='expiry'>Expiry Date:</Label>
                <Input type="number" name="expiry" placeholder={info.expiry} onChange={(e) => {setExpiry(e.target.value)}}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='cardnumber'>CVV:</Label>
                <Input type="number" name="cvv" placeholder={info.cvv} onChange={(e) => {setCardnumber(e.target.value)}}></Input>
            </FormGroup>
            <button onClick={deleteSubscription}>Cancel Subscription</button>
            <button onClick={updateSubscription}>Update User Subscription</button>
        </div>
    )



//fetch vs axios get
//using parameters 
//parent 













// class UpdateSubscriptionForm extends React.Component{
//     state = {
//         pk: 0,
//         curr_plan:'', //should be previous plan 
//         renew:'', //previous plan
//         cardnumber:'',
//         expiry:'',
//         cvv:''
//     };

//     const params = useParams();

//     onChange = e => {
//         this.setState({[e.target.name]: e.target.value})
//     }

//     editStudent = e => {
//         e.preventDefault();
//         axios.put(`http://localhost:8000/subscriptions/${params.username}` + this.state.pk, this.state).then(() => {
//           this.props.resetState();
//           this.props.toggle();
//         });
//       }, [params.username];

//       render()
//       return(
//           <UpdateSubscriptionForm preloadedValues={data}/>
//       )


// }

// //Allow user to edit their subscription
export default UpdateSubscriptonPlan;

