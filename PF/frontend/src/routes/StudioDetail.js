import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudioDetail() {
    const [studio, setStudio] = useState([]);
    const { id } = useParams();
    console.log(id);
    const getStudio = async () => {
        const json = await(
            await fetch(`http://localhost:8000/studios/${id}/`)
        ).json();
        console.log(json);
        setStudio(json);
    }
    useEffect(() => {
        getStudio();
    }, []);
    return (
        <div>
            <h2>{ studio.name }</h2>
            <h3>{ studio.address }</h3>
        </div>
      )
}
export default StudioDetail;