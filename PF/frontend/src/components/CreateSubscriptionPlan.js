import { Link } from "react-router-dom";
import React, { useState, useEffect, Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from '../api/axios';
import Button from 'react-bootscript/Button';

//Allow user to subscribe 
//POST user, username, curr_plan, renew, last_paid, next_pay, cardnumber, cvv, expiry 
///api/subscriptions/
//But what if user already has a subscription?

class CreateSubscriptionForm extends React.Component{
    state = {
        curr_plan:'',
        renew:'',
        cardnumber:'',
        expiry:'',
        cvv:''
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    createSubscription = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/subscriptions/', this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        })
    }
    render()
    return(
        <div>
        <Form onSubmit={this.props.user}>
            <FormGroup>
                <Label for='cardnumber'>Credit Card Number:</Label>
                <Input type="number" name="cardnumber" onChange={this.onChange} value={this.defaultIfEmpty(this.state.name)}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='expiry'>Expiry Date:</Label>
                <Input type="number" name="expiry" onChange={this.onChange} value={this.defaultIfEmpty(this.state.name)}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='cvv'>CVV:</Label>
                <Input type="number" name="cvv" onChange={this.onChange} value={this.defaultIfEmpty(this.state.name)}></Input>
            </FormGroup>
            <Button>Subscribe</Button>
        </Form>
        </div>
    )

}

export default CreateSubscriptionPlan;

//Props are arguments passed into React components.

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






// Let the user pick their subscription 
// Take the user's payment details 

///api/subscriptions/{{username}}

