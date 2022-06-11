import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) =>{

    const logout = () =>{
        const {history} = props 
        Cookies.remove("jwt_token")
        history.replace("/")
    }

    return(
        <div className = "nav-bar">
            <h1 className='logo'>Deskala</h1>
            <button type = "button" className = "logout" onClick = {logout}>
                  Logout
            </button>
        </div>
       
    )
}
export default withRouter(Header)