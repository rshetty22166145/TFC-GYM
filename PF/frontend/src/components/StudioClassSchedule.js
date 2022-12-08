import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from '../api/axios';

function FetchClasses(){
    const [classes, setClasses] = useState({});

    useEffect(() => {
        axios
        .get(`http://localhost:8000/studios/${id}`)
        .then((res) => {
            console.log(res)
            setClasses(res.data)
    })
    .catch((err) => {
    console.log(err);
    }, [id])

    return(
        <div>
            <h1>Available Classes</h1>
            <div>{classes.id}</div>
        </div>
    )
})

export default Classes;
// const Classes = () => {
//     const [classes, setClasses] = useState([]);
//     const [id, setId] = useState(1);
//     const params = useParams();
//     useEffect(() => {
//         fetchClasses();
//     }, [])
//     const fetchClasses = () =>{
//         axios.get(`http://localhost:8000/studios/${params.id}`).then((res) => {
//             console.log(res)
//             setClasses(res.data);
//         }).catch((err) => {
//             console.log(err);
//         })
//     }, [params.id]);
//     return (
//         <div>
//             <h1>Available Classes</h1>
//             <div className='item-container'>
//                 {classes.map((class) => (
//                     <div className='card' key ={class.id}>
//                         <img src={class.image} alt=''/>
//                         <h3>{class}</h3>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }



//Show all available classes of a chosen studio, appear from start time 
//Allow user to enrol or drop a class 
//See class schedule and history in chronological order 

///api/accounts/{{username}}/enrol/
///api/accounts/{{username}}/drop/
///api/accounts/{{username}}/schedule/
///api/accounts/{{username}}/history/
//class schedule of a specific studio
///studios/{{studio_id}}/
//<Link to={`/studio/${id}`}>{name}</Link>