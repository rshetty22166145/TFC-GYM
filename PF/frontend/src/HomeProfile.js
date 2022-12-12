import { Link } from 'react-router-dom';
import './accounts.css';
import NavBar from './components/NavBar';

export default function HomeProfile(){
    return(
        <div>
            <NavBar></NavBar>
            <section class="outer">
            <h1 class="prompt">Profile Options:</h1>
            <p>
                <Link to={`/accounts/edit`}>Edit Profile</Link>
                <br></br>
                <Link to={`/accounts/password`}>Change Password</Link>
                <br></br>
                <Link to={`/accounts/payment`}>Payment History</Link>
                <br></br>
                <Link to={`/accounts/class/schedule`}>Class Schedule</Link>
                <br></br>
                <Link to={`/accounts/class/history`}>Class History</Link>
                <br></br>
                <Link to={`/accounts/subscription`}>My Subscription</Link>
            </p>
            </section>
        </div>
    )
}