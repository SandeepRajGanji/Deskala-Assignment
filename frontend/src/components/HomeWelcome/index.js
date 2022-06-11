import {Link} from 'react-router-dom'
import './index.css'

const HomeWelcome = () =>{

   return(
        <div className='welcome-container'>
            <h1 className='welcome-heading'>Welcome, Deskala Assignment</h1>
            
            <p> New User, <Link  to="/register"><button className='controller-button' >Sign Up</button></Link></p>            
            <p>Existing User, <Link  to="/login"><button className='controller-button' >Login</button> </Link></p>
        </div>
    )
}
export default HomeWelcome

