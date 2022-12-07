import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Studio from "../components/Studio";

function StudioList() {
    const [studios, setStudios] = useState([]);
    const getStudio = async () => {
        const json = await(
            await fetch('http://localhost:8000/studios/')
        ).json();
        console.log(json);
        setStudios(json);
    }
    useEffect(() => {
        getStudio();
    }, []);
    return (
      <div>
        {studios.map((studio) => (
          <Studio
            key={studio.id}
            id={studio.id}
            name={studio.name}
            geoLocation={studio.geographical_location}
          />
        ))}
      </div>
    )
}
export default StudioList;