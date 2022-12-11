import { Link } from "react-router-dom";

function Classes({ id, name, startDate, endDate, startTime, endTime, capacity, coach}) {
    return (
        <div style={{
            marginTop: "50px",
            marginBottom: "50px",
            marginLeft: "50px",
            marginRight: "50px"
        }}>
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