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
                1.<Link to={`/accounts/edit`}>Edit Profile</Link>
                <br></br>
                2.<Link to={`/accounts/password`}>Change Password</Link>
                <br></br>
                3.<Link to={`/accounts/payment`}>Payment History</Link>
                <br></br>
                4.<Link to={`/accounts/class/schedule`}>Class Schedule</Link>
                <br></br>
                5.<Link to={`/accounts/class/history`}>Class History</Link>
            </p>
            </section>
        </div>
    )
}