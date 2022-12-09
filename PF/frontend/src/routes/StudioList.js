import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Studio from "../components/Studio";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import * as L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBFrZlgl056ecOfkIxxXBsSFPaFeVzDFYU");

console.log(localStorage);


let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

function StudioList() {
    const [studios, setStudios] = useState([]);
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState([43.68101335719982, -79.39593138840402]);
    const [markers, setMarkers] = useState([]);
    const [postalCode, setPostalCode] = useState("");
    const [next, setNext] = useState(null);
    const [nameList, setNameList] = useState([]);

    useEffect(() => {
      const loadData = async() =>{
        const json = await(
          await fetch(`http://localhost:8000/studios/?limit=500`)
        ).json();
        for (let i = 0; i < json.results.length; i++){
          setMarkers(prev => [...prev, json.results[i].geographical_location]);
          setNameList(prev => [...prev, json.results[i].name]);
        }
      }
      loadData();
    }, []);

    useEffect(() => {
      if (!map) return;

      L.easyButton("fa-map-marker", () => {
        map.locate().on("locationfound", function (e) {
          map.flyTo(e.latlng, map.getZoom());
          setPosition([e.latlng["lat"], e.latlng["lng"]]);
        });
      }).addTo(map);

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      })
    }, [map]);

    useEffect(() => {
      console.log("next url:" + next);
    }, [next])

    useEffect(() => {
      console.log(nameList);
    }, [nameList])

    const getStudio = async() => {
      console.log("data to send : " + position);
      const json = await(
          await fetch(`http://localhost:8000/studios/${position[0]}/${position[1]}/`)
      ).json();
      console.log(json);
      setStudios(json.results);
      setNext(json.next);
    }

    const getList = (e) => {
      e.preventDefault();
      console.log(map);
      for (var key in map._targets){
        if (map._targets[key].options.id === "marker"){
          console.log(map._targets[key].getLatLng());
          setPosition([map._targets[key].getLatLng()["lat"], map._targets[key].getLatLng()["lng"]]);
        }
      }
      getStudio();
    }

    const getNextList = (e) => {
      e.preventDefault();
      const getNextStudios = async() => {
        const json = await(
            await fetch(next)
        ).json();
        console.log(json);
        setStudios((prev) => [...prev,...json.results]);
        setNext(json.next);
      }
      getNextStudios();
    }

    const getGeoLocation = (e) => {
      Geocode.fromAddress(postalCode).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          map.flyTo({ lat, lng }, map.getZoom());
          setPosition([lat, lng]);
        },
        (error) => {
          console.error(error);
        }
      );
    }

    const onChange = (e) => {
      setPostalCode(e.target.value);
    }

    const eventHandlers = useMemo(() => ({
      dragend(e) {
        console.log(e.target);
        console.log(e.target.getLatLng());
        setPosition([e.target.getLatLng()["lat"], e.target.getLatLng()["lng"]]);
      },
    }), [])

    function LoadMore() {
      if (next === null) {
        return <h2>End</h2>;
      }
      return (
        <button onClick={getNextList}>
          Load More
        </button>
      )
    }

    return (
      <div>
        <div id="mapid1" style={{height: 300}}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '300px', width: '500px' }} ref={setMap} whenCreated={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} draggable={true} eventHandlers={eventHandlers} id="marker">
            <Popup>
              You
            </Popup>
          </Marker>
          {markers.map((position, idx) => 
            <Marker key={`marker-${idx}`} position={position}>
              <Popup>
                <span>{nameList[idx]}</span>
              </Popup>
            </Marker>
          )}
        </MapContainer>
        </div>
        <input onChange={onChange}></input>
        <button onClick={getGeoLocation}>
          Move to address/postal code
        </button>
        <br></br>
        <button onClick={getList}>
          Get List
        </button>
        <div>
          {studios.map((studio) => (
            <Studio
              key={studio.id}
              id={studio.id}
              name={studio.name}
              geoLocation={studio.geographical_location}
              images={studio.imagesSerializer}
            />
          ))}
        </div>
        <LoadMore></LoadMore>
      </div>
    )
}
export default StudioList;