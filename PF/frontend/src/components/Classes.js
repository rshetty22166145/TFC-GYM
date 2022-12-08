import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetchClasses();
    }, [])
    const fetchClasses = () =>{
        axios.get('http://localhost:8000/studios/id').then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <div>
            <h1>Available Classes</h1>
            <div className='item-container'>
                {classes.map((classes) => (
                    <div className='card' key ={classes.id}>
                        <img src={classes.image} alt=''/>
                        <h3>{classes}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Classes;

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