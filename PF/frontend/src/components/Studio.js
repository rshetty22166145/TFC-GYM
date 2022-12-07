import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Studio({ id, name, geoLocation, amenities }) {
  return (
    <div>
      <div>
        <h2>
          <Link to={`/studio/${id}`}>{name}</Link>
        </h2>
        <h3>{geoLocation}</h3>
      </div>
    </div>
  );
}

export default Studio;