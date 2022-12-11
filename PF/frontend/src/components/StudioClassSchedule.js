import React, { useState, useEffect } from 'react';

function ClassesView(){
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        console.log("data changed");
        console.log(data);
    }, [data])

    useEffect(() => {
        console.log(loaded);
    }, [loaded])

    const getUser = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const response = await axios.get(`/api/accounts/${username}/schedule/`,
            {
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `token ${token}`
                },
                withCredentials: true
            }
        );
        console.log(response.data);
        setData(response.data);
        setLoaded(true);
    }

    function StudioClasses() {
        console.log(loaded);
        if (loaded) {
            return (
                <div>
                    {data.results.map((data) => (
                    <div className='card' key ={data.id}>
                        <p>{data.studio}</p>
                    </div>
                    ))}
                </div>
            )
        }
        return null;
    }

    return(
        <div>
            <NavBar></NavBar>
            <h1>Available Classes</h1>
            <div className='item-container'>
                <StudioClasses></StudioClasses>
            </div>
        </div>
    );
}

export default ClassesView;

// function FetchClasses(){
//     const [classes, setClasses] = useState({});

//     useEffect(() => {
//         axios
//         .get(`http://localhost:8000/studios/${id}`)
//         .then((res) => {
//             console.log(res)
//             setClasses(res.data)
//     })
//     .catch((err) => {
//     console.log(err);
//     }, [id])

//     return(
//         <div>
//             <h1>Available Classes</h1>
//             <div>{classes.id}</div>
//         </div>
//     )
// })

// export default Classes;
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