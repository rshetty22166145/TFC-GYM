import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Studio({ id, name, geoLocation, images, amenities }) {
    return (
        <div>
            <img src={images[0].image} alt="Logo" />
            <h2>
            <Link to={`/studio/${id}`}>{name}</Link>
            </h2>
            <h3>{geoLocation}</h3>
        </div>
    );
}

export default Studio;