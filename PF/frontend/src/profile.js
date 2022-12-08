import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileView() {
    const [user, setUser] = useState([]);
    const { username } = useParams();
    console.log(username);
    const getUser = async () => {
        const token = localStorage.getItem('token')
        console.log(token)
        const json = await(await fetch(`http://localhost:8000/api/accounts/${username}/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `token ${token}`,
        }})).json();
        console.log(json);
        setUser(json);
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div>
            <h2>{ user.username }</h2>
            <h3>{ user.curr_plan }</h3>
            <h3>{ user.renew }</h3>
            <h3>{ user.last_paid }</h3>
            <h3>{ user.next_pay }</h3>
            <h3>{ user.cardnumber }</h3>
            <h3>{ user.cvv }</h3>
            <h3>{ user.expiry }</h3>
        </div>
      )
}
export default ProfileView;