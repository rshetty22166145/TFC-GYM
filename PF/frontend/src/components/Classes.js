import { Link } from "react-router-dom";

function Classes({ id, name, startDate, endDate, startTime, endTime, capacity, coach}) {
    return (
        <div>
            <h3>{name}</h3>
            Coach : {coach}
            <br></br>
            Date : {startDate} - {endDate}
            <br></br>
            Time : {startTime} - {endTime}
            <br></br>
            Capacity: {capacity}
            <br></br>
            <Link to={`/class/${id}`}>Detail</Link>
        </div>
    );
}

export default Classes;