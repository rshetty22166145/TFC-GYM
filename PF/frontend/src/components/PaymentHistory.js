
//Get the payment history of the user 

function FetchPaymentHistory(){
    const [payments, setPayments] = useState({username: {}});
    const params = useParams()

    useEffect(() => {
        axios
        .get(`http://localhost:8000/payments/${params.username}`)
        .then((res) => {
            console.log(res)
            setPayments(res.data)
    })
    .catch((err) => {
    console.log(err);
    }, [username])

    return(
        <div>
            <h1>Payment History</h1>
            <div>{payments.username}</div>
        </div>
    )
})

export default PaymentHistory;

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