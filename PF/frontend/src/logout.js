import  { Redirect } from 'react-router-dom'

function Logout() {
    // TODO: redirect to home, when homepage is made
    localStorage.clear();
    return <Redirect to='/' />
}
export default Logout