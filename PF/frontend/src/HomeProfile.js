import { Link } from 'react-router-dom';
import './accounts.css';
import NavBar from './components/NavBar';

export default function HomeProfile(){
    return(
        <div>
            <NavBar></NavBar>
            <section class="outer">
            <h1 class="prompt">Profile Options:</h1>
            <p class="left">
                <Link to={`/accounts/edit`}>1. Edit Profile</Link>
                <br></br>
                <Link to={`/accounts/password`}>2. Change Password</Link>
                <br></br>
                <Link to={`/accounts/payment`}>3. Payment History</Link>
                <br></br>
                <Link to={`/accounts/class/schedule`}>4. Class Schedule</Link>
                <br></br>
                <Link to={`/accounts/class/history`}>5. Class History</Link>
            </p>
            </section>
        </div>
    )
}