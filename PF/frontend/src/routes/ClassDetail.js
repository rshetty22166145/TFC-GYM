import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from '../api/axios';
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

function ClassDetail(){
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [subscriber, setSubscriber] = useState(false);
    const [clas, setClas] = useState(null);
    const [loaded2, setLoaded2] = useState(false);
    const [startDate, setStartDate] = useState(new Date(0));
    const [endDate, setEndDate] = useState(new Date(2032,1,1));
    const [startTime, setStartTime] = useState('01:00');
    const [endTime, setEndTime] = useState('23:00');
    const [data, setData] = useState(null);
    const [capacityArray, setCapacityArray] = useState([]);
    const [current, setCurrent] = useState(null);
    const [next, setNext] = useState(null);
    const { id } = useParams();

    useEffect(() => (
        console.log(loaded)
    ), [loaded])

    useEffect(() => {
        if (localStorage.getItem("username") !== null) {
            setLoggedIn(true);
        }
    }, [])

    useEffect(() => {
        const getSubscribe = async () => {
            const username = localStorage.getItem("username");
            const token = localStorage.getItem("token");
            const json = await(await fetch(`http://localhost:8000/api/accounts/${username}/`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${token}`,
            }})).json();
            console.log(json)
            setSubscriber(json.subscribe);
        }
        console.log("Are you logged in? : " + loggedIn);
        if (loggedIn) {
            getSubscribe()
        }
    }, [loggedIn])

    useEffect(() => {
        console.log("Are you subscriber? : " + subscriber);
    }, [subscriber])

    useEffect(() => {
        getClass();
    }, []);

    useEffect(() => (
        console.log(clas)
    ), [clas])

    useEffect(() => {
        console.log(data);
    }, [data])

    useEffect(() => {
        if (loaded) {
            loadCapacityArray();
        }
    }, [current])

    useEffect(() => {
        if (loaded) {
            loadCapacityArray();
        }
    }, [next])

    useEffect(() => {
        console.log("capacity array incoming")
        console.log(capacityArray)
    }, [capacityArray])

    const getClass = async () => {
        const json = await(
            await fetch(`http://localhost:8000/classes/${id}/`)
        ).json();
        setClas(json);
        setLoaded(true);
    }

    function ClassInfo(){

        if(loaded){
            return(
                <div>
                    <h2>Studio {clas.studio.name}</h2>
                    <h3>Welcome to the class {clas.name}</h3>
                </div>
            )
        }
        return null;
    }

    const loadCapacityArray = async() => {
        const url = current.split("?")[0] + "?limit=50000";
        const json = await(
            await fetch(url)
        ).json();
        const d = json.results
        console.log(d);
        const studentsArray = d.map((data) => (
            data.students.length
        ))
        setCapacityArray(studentsArray);
    }

    function ClassEnrol(){

        const handleEnrol = (e) => {
            e.preventDefault();
            try {
                const enrol = async() => {
                    const username = localStorage.getItem("username");
                    const url = `http://127.0.0.1:8000/api/accounts/${username}/enrol/`;
                    const token = localStorage.getItem("token");
                    const class_id = id;
                    const response = await axios.post(url,
                        JSON.stringify({ class_id }),
                        {
                            headers: { 
                                'Content-Type': 'application/json' ,
                                'Authorization': `token ${token}`,
                            },
                            withCredentials: true
                        }
                    );
                    console.log(response);
                    loadCapacityArray();
                }
                enrol();
                console.log("enrolled");
            } catch (err) {
                console.log("you are not subscriber");
            }
        }

        if (subscriber){
            return (
                <div>
                    <button onClick={handleEnrol}>Enrol All Upcoming Classes</button>
                </div>
            )
        }
        return null;
    }

    function ClassDrop(){

        const handleDrop = (e) => {
            e.preventDefault();
            try {
                const drop = async() => {
                    const username = localStorage.getItem("username");
                    const url = `http://127.0.0.1:8000/api/accounts/${username}/drop/`;
                    const token = localStorage.getItem("token");
                    const class_id = id;
                    const response = await axios.post(url,
                        JSON.stringify({ class_id }),
                        {
                            headers: { 
                                'Content-Type': 'application/json' ,
                                'Authorization': `token ${token}`,
                            },
                            withCredentials: true
                        }
                    );
                    console.log(response);
                    loadCapacityArray();
                }
                drop();
                console.log("you dropped");
            } catch (err) {
                console.log("you are not subscriber");
            }
        }

        if (subscriber){
            return (
                <div>
                    <button onClick={handleDrop}>Drop All Upcoming Classes</button>
                </div>
            )
        }
        return null;
    }

    const SearchResult = () => {
        const getSearch = async() => {
            const startYear = startDate.getFullYear();
            let startMonth = startDate.getMonth() + 1;
            if (startMonth.toString().length < 2) {
                startMonth = "0" + startMonth.toString();
            }
            let startDay = startDate.getDate();
            if (startDay.toString().length < 2) {
                console.log(startDay.toString());
                startDay = "0" + startDay.toString();
            }
            const endYear = endDate.getFullYear();
            let endMonth = endDate.getMonth() + 1;
            console.log("month:"+endMonth);
            if (endMonth.toString().length < 2) {
                endMonth = "0" + endMonth.toString();
            }
            let endDay = endDate.getDate();
            console.log(endDay);
            if (endDay.toString().length < 2) {
                endDay = "0" + endDay.toString();
            }
            const startTimeArray = startTime.split(":");
            const startHour = startTimeArray[0];
            const startMin = startTimeArray[1];
            const endTimeArray = endTime.split(":");
            const endHour = endTimeArray[0];
            const endMin = endTimeArray[1];
            const url = `http://localhost:8000/classes/${id}/search/${startYear}-${startMonth}-${startDay}/${endYear}-${endMonth}-${endDay}/${startHour}-${startMin}-00/${endHour}-${endMin}-00/`;
            console.log(url);
            const json = await(
                await fetch(url)
            ).json();
            console.log(json);
            setData(json.results);
            setCurrent(url);
            setNext(json.next);
            setLoaded2(true);
        }
        getSearch();
    }

    const SearchResult2 = () => {
        const getSearch = async() => {
            const url = `http://localhost:8000/classes/${id}/h/b/`;
            console.log(url);
            const json = await(
                await fetch(url)
            ).json();
            console.log(json);
            setData(json.results);
            setCurrent(url);
            setNext(json.next);
            setLoaded2(true);
        }
        getSearch();
    }

    function Result() {
        if (loaded2) {
            return (
                <div style={{color:"white"}}>
                    {data.map((data, idx) => (
                        <section class="outer" style={{marginTop:"30px", marginBottom:"30px", minHeight:"0px", width:"500px"}}>
                            Date : {data.day}
                            <br></br>
                            Time : {data.start_time} ~ {data.end_time}
                            <br></br>
                            Capacity : {capacityArray[idx]}/{data.classes.capacity}
                            <br></br>
                            { subscriber? (
                                <div>
                                    <button onClick={
                                        (e) => {
                                            e.preventDefault();
                                            try {
                                                const enrol = async() => {
                                                    const username = localStorage.getItem("username");
                                                    const url = `http://127.0.0.1:8000/api/accounts/${username}/enrol/`;
                                                    const token = localStorage.getItem("token");
                                                    const class_id = id;
                                                    const instance_id = data.id;
                                                    console.log(instance_id);
                                                    const response = await axios.post(url,
                                                        JSON.stringify({ class_id, instance_id }),
                                                        {
                                                            headers: { 
                                                                'Content-Type': 'application/json' ,
                                                                'Authorization': `token ${token}`,
                                                            },
                                                            withCredentials: true
                                                        }
                                                    );
                                                    console.log(response);
                                                    loadCapacityArray();
                                                }
                                                enrol();
                                                console.log("enrolled");
                                            } catch (err) {
                                                console.log("you are not subscriber");
                                            }
                                        }
                                    }>Enrol</button>
                                    <button onClick={
                                        (e) => {
                                            e.preventDefault();
                                            try {
                                                const drop = async() => {
                                                    const username = localStorage.getItem("username");
                                                    const url = `http://127.0.0.1:8000/api/accounts/${username}/drop/`;
                                                    const token = localStorage.getItem("token");
                                                    const class_id = id;
                                                    const instance_id = data.id;
                                                    console.log(instance_id);
                                                    const response = await axios.post(url,
                                                        JSON.stringify({ class_id, instance_id }),
                                                        {
                                                            headers: { 
                                                                'Content-Type': 'application/json' ,
                                                                'Authorization': `token ${token}`,
                                                            },
                                                            withCredentials: true
                                                        }
                                                    );
                                                    console.log(response);
                                                    loadCapacityArray();
                                                }
                                                drop();
                                                console.log("dropped");
                                            } catch (err) {
                                                console.log("you are not subscriber");
                                            }
                                        }
                                    }>Drop</button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </section>
                    ))}
                </div>
            )
        }
        return null;
    }

    const getNextList = (e) => {
        e.preventDefault();
        const getNextStudios = async() => {
            const json = await(
                await fetch(next)
            ).json();
            console.log(json);
            setData((prev) => [...prev,...json.results]);
            setCurrent(next);
            setNext(json.next);
        }
        getNextStudios();
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
        <div style={{textAlign:"center", alignItems:"center"}}>
            <NavBar></NavBar>
            <ClassInfo></ClassInfo>
            <ClassEnrol></ClassEnrol>
            <ClassDrop></ClassDrop>
            <h3>Schedules</h3>
            <section class="outer" style={{width: "500px", color: "black", background: "white", marginBottom: "50px"}}>
                <h4>Start Date</h4>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <h4>End Date</h4>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                <h4>Start Time</h4>
                <TimePicker onChange={setStartTime} value={startTime} />
                <h4>End Time</h4>
                <TimePicker onChange={setEndTime} value={endTime} />
                <button onClick={SearchResult}>Get Schedules Using Filter</button>
            </section>
            <button onClick={SearchResult2}>Get Further Schedules</button>
            <Result></Result>
            <LoadMore></LoadMore>
        </div>
    )
}

export default ClassDetail