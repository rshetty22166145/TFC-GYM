import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Get the payment history of the user 

function PaymentHistoryView(){
    const [user, setUser] = useState([]);
    const { username } = useParams();
    const getUser = async () => {
        const token = localStorage.getItem('token')
        console.log(token)
        const json = await(await fetch(`http://localhost:8000/payments/${username}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `token ${token}`,
            }})).json();
            console.log(json);
            setUser(json);
        }
    useEffect(() => {
        getUser();
    }, []);

    return(
        <div>
            <h1>Payment History</h1>
            <div className='item-container'>
                 {user.map((user) => (
                    <div className='card' key ={user.id}>
                        <p>{user.id}</p>
                        <p>{user.username}</p>
                        <p>{user.pay_date}</p>
                        <p>{user.cardnumber}</p>
                        <p>{user.amount}</p>
                        <p>{user.next_pay}</p>
                     </div>
                 ))}
             </div>
        </div>
    );
}

export default PaymentHistoryView;




// function FetchPaymentHistory(){
//     const [payments, setPayments] = useState({username: {}});
//     const params = useParams()

//     useEffect(() => {
//         axios
//         .get(`http://localhost:8000/payments/${params.username}`)
//         .then((res) => {
//             console.log(res)
//             setPayments(res.data)
//     })
//     .catch((err) => {
//     console.log(err);
//     }, [username])

//     return(
//         <div>
//             <h1>Payment History</h1>
//             <div>{payments.username}</div>
//         </div>
//     )
// })



// class PaymentForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {value: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({value: event.target.value});
//     }
  
//     handleSubmit(event) {
//       alert('Payment information has been submitted: ' + this.state.value);
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Credit Card Number:
//             <input type="text" value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <label>
//             Expiry Date:
//             <input type="text" value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <label>
//             CVV:
//             <input type="text" value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }
  
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<PaymentForm />)