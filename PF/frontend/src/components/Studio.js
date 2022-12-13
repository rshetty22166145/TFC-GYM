import { Link } from "react-router-dom";

function Studio({ id, name, address, images, amenities, postalCode, phone_number }) {
    console.log(amenities);

    return (
        <div style={{textAlign: "center", color: "white"}}>
            <img src={images[0].image} height="300px" width="500px" alt="Logo" />
            <h2>
            <Link to={`/studio/${id}`}>{name}</Link>
            </h2>
            <h3>Address : {address}</h3>
            <h3>Postal Code : {postalCode}</h3>
            <h3>Phone Number : {phone_number}</h3>
            <h3>Amenities</h3>
            <ul style={{
                display: "inline-block",
            }}>
                {Array.from(amenities).map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                ))}
            </ul>
        </div>
    );
}

export default Studio;