import './accounts.css';

export default function HomeProfile(){
    return(
        <div>
            <section class="outer">
            <h1 class="prompt">Profile Options:</h1>
            <p>
                1.<a href="http://localhost:3000/accounts/edit">Edit Profile Information</a>
                <br></br>
                2.<a href="http://localhost:3000/accounts/password">Change Password</a>
            </p>
            </section>
        </div>
    )
}