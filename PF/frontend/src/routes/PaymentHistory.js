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
                    <div className='outer' key ={data.id} style={{margin:"20px", color:"white", minHeight:"0"}}>
                        <p>Payment date : {data.pay_date} {data.pay_time.split(".")[0]}</p>
                        <p>Payment card number : {data.cardnumber}</p>
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
        <div  style={{textAlign:"center"}}>
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