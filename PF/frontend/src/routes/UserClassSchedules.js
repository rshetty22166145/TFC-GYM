import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from '../api/axios';

function UserClassSchedule() {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [next, setNext] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (loaded) {
            console.log("data loaded")
        }
    }, [loaded])

    const getData = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8000/api/accounts/${username}/schedule/`,
            {
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `token ${token}`
                },
                withCredentials: true
            }
        );
        console.log("response");
        console.log(response);
        setData(response.data.results);
        setNext(response.data.next);
        setLoaded(true);
    }

    const getNextData = (e) => {
        e.preventDefault();
        const getNextStudios = async() => {
            const token = localStorage.getItem('token');
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
        }
        getNextStudios();
    }

    function Result() {
        if (loaded) {
            return (
                <div style={{color:"white"}}>
                    {data.map((data) => (
                        <section class="outer" style={{marginTop:"30px", marginBottom:"30px", minHeight:"0px", width:"500px"}}>
                            <h4>Class name : {data.classes.name}</h4>
                            Coach : {data.classes.coach}
                            <br></br>
                            Date : {data.day}
                            <br></br>
                            Time : {data.start_time} ~ {data.end_time}
                            <br></br>
                            Capacity : {data.students.length}/{data.classes.capacity}
                            <br></br>
                            <Link to={`/class/${data.classes.id}`}> Class Page </Link>
                        </section>
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
            <button onClick={getNextData}>
                Load More
            </button>
        )
    }

    return(
        <div>
            <NavBar></NavBar>
            <br></br>
            <br></br>
            <br></br>
            <h2 style={{textAlign:"center"}}>User Class Schedule</h2>
            {loaded ? (
                <div>
                    <Result></Result>
                    <div style={{textAlign:"center"}}>
                        <LoadMore></LoadMore>
                    </div>
                </div>
            ):(
                <div>Loading...</div>
            )}
        </div>
    )
}

export default UserClassSchedule