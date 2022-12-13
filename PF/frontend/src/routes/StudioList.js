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
import NavBar from "../components/NavBar";

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
    const [search, setSearch] = useState("");
    const [searchStudioName, setSearchStudioName] = useState(true);
    const [searchClassName, setSearchClassName] = useState(true);
    const [searchCoachName, setSearchCoachName] = useState(true);
    const [searchAmentity, setSearchAmentity] = useState(true);
    const LeafIcon = L.Icon.extend({
      options: {}
    });
    const greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const [icon, setIcon] = useState(greenIcon);

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

    const handleSearch = () => {
      console.log(search);
      SearchResult();
    };

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

    const Checkbox = ({ label, value, onChange }) => {
      return (
          <label style={{color: "white", marginRight: "20px"}}>
              <input type="checkbox" checked={value} onChange={onChange} style={{marginRight: "5px"}}/>
              {label}
          </label>
      );
    };

  function SearchFilter() {
      return (
          <div>
              <Checkbox
                  label="Studio Name"
                  value={searchStudioName}
                  onChange={(e) => setSearchStudioName(!searchStudioName)}
              />
              <Checkbox
                  label="Class Name"
                  value={searchClassName}
                  onChange={(e) => setSearchClassName(!searchClassName)}
              />
              <Checkbox
                  label="Coach Name"
                  value={searchCoachName}
                  onChange={(e) => setSearchCoachName(!searchCoachName)}
              />
              <Checkbox
                  label="Amentities Type"
                  value={searchAmentity}
                  onChange={(e) => setSearchAmentity(!searchAmentity)}
              />
          </div>
      )
  }

  const SearchResult = () => {
    console.log("search -> " + search)
    let s1 = search;
    let s2 = search;
    let s3 = search;
    let s4 = search;
    if(!searchStudioName){
      s1 = "lol960609loldude";
    }
    if(!searchClassName){
      s2 = "lol960609loldude";
    }
    if(!searchCoachName){
      s3 = "lol960609loldude";
    }
    if(!searchAmentity){
      s4 = "lol960609loldude";
    }
    const getSearch = async() => {
      console.log("data to send : " + position);
      const json = await(
          await fetch(`http://localhost:8000/studios/${position[0]}/${position[1]}/search/${s1}/${s2}/${s3}/${s4}/`)
      ).json();
      console.log(json);
      setStudios(json.results);
      setNext(json.next);
    }
    getSearch();
  }

    function LoadMore() {
      if (next === null) {
        return null;
      }
      return (
        <button onClick={getNextList}>
          Load More
        </button>
      )
    }

    return (
      <div style={{textAlign:"center"}}>
        <NavBar></NavBar>
        <div>
          <div id="mapid1" 
            style={{
              height: 300,
              marginTop: 100
            }}
          >
            <MapContainer 
              center={position} zoom={13} 
              scrollWheelZoom={true} 
              style={{ 
                height: '300px', 
                width: '500px',
                fontSize: '15px'
              }} 
              ref={setMap} 
              whenCreated={setMap}
            >
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
                <Marker icon={icon} key={`marker-${idx}`} position={position}>
                  <Popup>
                    <span>{nameList[idx]}</span>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
          <section class="outer" style={{marginTop:"30px", marginBottom:"30px"}}>
            <input onChange={onChange} placeholder="Enter address/postal code"></input>
            <button onClick={getGeoLocation}>
              Move to address/postal code
            </button>
            <button onClick={getList}>
              Get List
            </button>
            <br></br>
            <input 
              value={search} 
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>
                Search
            </button>
            <SearchFilter></SearchFilter>
          </section>
        </div>
        <div>
          {studios.map((studio) => (
            <section class="outer" style={{marginTop:"30px", marginBottom:"30px"}}>
              <Studio
                key={studio.id}
                id={studio.id}
                name={studio.name}
                address={studio.address}
                phone_number={studio.phone_number}
                images={studio.imagesSerializer}
                amenities={studio.amenities}
                postalCode={studio.postal_code}
              />
            </section>
          ))}
        </div>
        <LoadMore></LoadMore>
      </div>
    )
}
export default StudioList;