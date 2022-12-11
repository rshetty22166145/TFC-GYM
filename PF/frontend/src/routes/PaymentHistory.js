import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import NavBar from '../components/NavBar';

//Get the payment history of the user 

function PaymentHistoryView(){
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [next, setNext] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        console.log("data changed");
        console.log(data);
    }, [data])

    useEffect(() => {
        console.log(loaded);
    }, [loaded])

    useEffect(() => {
        console.log("next url:" + next);
      }, [next])

    const getNextList = (e) => {
        e.preventDefault();
        const getNextData = async() => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const response = await axios.get(next,
                {
                    headers: { 
                        'Content-Type': 'application/json' ,
                        'Authorization': `token ${token}`
                    },
                    withCredentials: true
                }
            );
            setData((prev) => [...prev,...response.data.results]);
            setNext(response.data.next);
            setLoaded(true);
        }
        getNextData();
      }

    const getData = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8000/payments/${username}/`,
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
        setNext(response.data.next);
        setLoaded(true);
    }

    function UserHistory() {
        console.log(loaded);
        if (loaded) {
            return (
                <div>
                    {data.map((data) => (
                    <div className='card' key ={data.id} style={{margin:"20px"}}>
                        <p>Payment date : {data.pay_date}</p>
                        <p>Payment amount : ${data.amount}</p>
                    </div>
                    ))}
                </div>
            )
        }
        return null;
    }

    function LoadMore() {
        if (next === null) {
          return null;
        }
        return (
          <button onClick={getNextList}>
            Load More
          </button>
        )
      }

    return(
        <div>
            <NavBar></NavBar>
            <h1>Payment History</h1>
            <div className='item-container' style={{textAlign:"center"}}>
                <UserHistory></UserHistory>
                <LoadMore></LoadMore>
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