import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Classes from "../components/Classes";
import NavBar from "../components/NavBar";

function StudioDetail() {
    const [studio, setStudio] = useState([]);
    const [classes, setClasses] = useState(null);
    const [loaded, setLoaded] = useState(false);
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
        console.log(loaded);
    }, [loaded]);

    const getStudio = async () => {
        const json = await(
            await fetch(`http://localhost:8000/studios/${id}/`)
        ).json();
        setStudio(json);
        setClasses(Array.from(json.classes))
        setLoaded(true);
    }

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

    return (
        <div>
            <NavBar></NavBar>
            <h1>Welcome to studio { studio.name }</h1>
            <h3>Address : { studio.address }</h3>
            <h3><a href={studio.link}>Get Direction</a></h3>
            <h3>Our Classes</h3>
            <ClassBlock></ClassBlock>
            <br></br>
            <h3>Studio Schedules</h3>
        </div>
      )
}
export default StudioDetail;