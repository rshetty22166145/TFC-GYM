import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Studio() {
    const { id } = useParams();
    console.log(id);
    const getStudio = async () => {
        const json = await(
            await fetch(``)
        ).json();
        console.log(json);
    }
    useEffect(() => {
        getStudio();
    }, []);
    return <div>Studio</div>
}
export default Studio