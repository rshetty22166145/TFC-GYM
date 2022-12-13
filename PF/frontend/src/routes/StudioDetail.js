import { useEffect, useState } from "react";
import { Carousel } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Classes from "../components/Classes";
import NavBar from "../components/NavBar";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

function StudioDetail() {
    const [studio, setStudio] = useState([]);
    const [classes, setClasses] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [loaded2, setLoaded2] = useState(false);
    const [images, setImages] = useState([]);
    const [startDate, setStartDate] = useState(new Date(0));
    const [endDate, setEndDate] = useState(new Date(2032,1,1));
    const [startTime, setStartTime] = useState('01:00');
    const [endTime, setEndTime] = useState('23:00');
    const [data, setData] = useState(null);
    const [next, setNext] = useState(null);
    const [search, setSearch] = useState("");
    const [searchClassName, setSearchClassName] = useState(true);
    const [searchCoachName, setSearchCoachName] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        getStudio();
    }, []);

    useEffect(() => {
        console.log(studio);
    }, [studio]);

    useEffect(() => {
        console.log(classes);
    }, [classes]);

    useEffect(() => {
        console.log("images");
        console.log(images);
    }, [images]);

    useEffect(() => {
        console.log(loaded);
    }, [loaded]);

    useEffect(() => {
        console.log(loaded2);
    }, [loaded2]);

    useEffect(() => {
        console.log(search);
    }, [search]);

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);

    useEffect(() => {
        console.log(endDate);
    }, [endDate]);

    useEffect(() => {
        console.log(startTime);
    }, [startTime]);

    useEffect(() => {
        console.log(endTime);
    }, [endTime]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log(next);
    }, [next]);

    const getStudio = async () => {
        const json = await(
            await fetch(`http://localhost:8000/studios/${id}/`)
        ).json();
        setStudio(json);
        const img = await(
            await fetch(`http://localhost:8000/studios/${id}/d/t/`)
        ).json();
        console.log(img.results);
        console.log(img.results[0].imagesSerializer);
        setImages(Array.from(img.results[0].imagesSerializer));
        setClasses(Array.from(json.classes));
        setLoaded(true);
    }

    const handleSearch = () => {
        console.log(search);
        SearchResult();
    };

    const SearchResult = () => {
        console.log("search -> " + search)
        let s1 = search;
        let s2 = search;
        if(!searchClassName | search===""){
            s1 = "lol960609loldude";
        }
        if(!searchCoachName | search===""){
            s2 = "lol960609loldude";
        }
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
            const url = `http://localhost:8000/studios/${id}/search/${startYear}-${startMonth}-${startDay}/${endYear}-${endMonth}-${endDay}/${startHour}-${startMin}-00/${endHour}-${endMin}-00/${s1}/${s2}/`;
            console.log(url);
            const json = await(
                await fetch(url)
            ).json();
            console.log(json);
            setData(json.results);
            setNext(json.next);
            setLoaded2(true);
        }
        getSearch();
    }

    const handleSearch2 = () => {
        const getSearch = async() => {
            const url = `http://localhost:8000/studios/${id}/h/b/`;
            console.log(url);
            const json = await(
                await fetch(url)
            ).json();
            console.log(json);
            setData(json.results);
            setNext(json.next);
            setLoaded2(true);
        }
        getSearch();
    };

    function ClassBlock() {
        if (loaded) {
            return(
                <div>
                    {classes.map((cla) => (
                        <Classes
                        key={cla.id}
                        id={cla.id}
                        name={cla.name}
                        startTime={cla.start_time}
                        endTime={cla.end_time}
                        startDate={cla.start_date}
                        endDate={cla.end_date}
                        capacity={cla.capacity}
                        coach={cla.coach}
                        />
                    ))}
                </div>
            )
        }
        return null
    }

    function CarouselImage() {
        if (loaded) {
            return (
                <div>
                    <Carousel fade style={{marginLeft:"auto", marginRight:"auto"}} interval="50000">
                        {images.map((img) => (
                            <Carousel.Item>
                                <img className="d-block" src={img.image} height="300px" width="500px" alt="slide" />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            )
        }
        return null;
    }

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label style={{color: "black", marginRight: "20px", marginLeft: "10px"}}>
                <input type="checkbox" checked={value} onChange={onChange} style={{marginRight: "5px"}}/>
                {label}
            </label>
        );
    };

    function SearchFilter() {
        return (
            <div>
                <span>Filter</span>
                <Checkbox
                    label="Class Name"
                    value={searchClassName}
                    onChange={(e) => setSearchClassName(!searchClassName)}
                />
                <Checkbox
                    label="Coach Name"
                    value={searchCoachName}
                    onChange={(e) => setSearchCoachName(!searchCoachName)}
                />
            </div>
        )
    }

    const getNextList = (e) => {
        e.preventDefault();
        const getNextStudios = async() => {
            const json = await(
                await fetch(next)
            ).json();
            console.log(json);
            setData((prev) => [...prev,...json.results]);
            setNext(json.next);
        }
        getNextStudios();
    }

    function Result() {
        if (loaded2) {
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
            <button onClick={getNextList}>
                Load More
            </button>
        )
    }

    return (
        <div style={{textAlign:"center", alignItems:"center", width:"100vh"}}>
            <NavBar></NavBar>
            <div style={{marginTop:"150px"}}>
                <CarouselImage></CarouselImage>
            </div>
            <h1>Welcome to the studio { studio.name }</h1>
            <h3>Address : { studio.address }</h3>
            <h3>Postal Code : { studio.postal_code }</h3>
            <h3>Phone Number : { studio.phone_number }</h3>
            <h3><a href={studio.link}>Get Direction</a></h3>
            <h3>Our Classes</h3>
            <ClassBlock></ClassBlock>
            <br></br>
            <h3>Studio Schedules</h3>
            <section class="outer" style={{width: "500px", color: "black", background: "white", marginBottom: "50px", minHeight: "0px"}}>
                <h4>Start Date</h4>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <h4>End Date</h4>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                <h4>Start Time</h4>
                <TimePicker onChange={setStartTime} value={startTime} />
                <h4>End Time</h4>
                <TimePicker onChange={setEndTime} value={endTime} />
                <SearchFilter></SearchFilter>
                <input 
                    placeholder="Search"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Get Schedules Using Filter</button>
            </section>
            <button onClick={handleSearch2}>Get Further Schedules</button>
            <Result></Result>
            <LoadMore></LoadMore>
        </div>
      )
}
export default StudioDetail;