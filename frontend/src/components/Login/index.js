import {Component} from 'react'
import Cookies from 'js-cookie'




export default class Register extends Component {
  state = {
    emailId: '',
    password: '',
  }

  setEmailId = event => {
    this.setState({
      emailId: event.target.value,
    })
  }

  setPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  
  successResponse = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      path: '/',
      expires: 30,
    })
    alert("Login Successfully")
    history.replace('/candidates')
  }

  

  onSubmitLoginForm =  async event => {
    event.preventDefault();
    const {emailId, password} = this.state
    if(emailId !== "" && password !== ""){
      
      const data = {
        emailId,
        password,
      }
      console.log(data)
     
      const options = {
        method: 'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
      }
  
      const response = await fetch('/login',options)
      
      const responseData = await response.json()
      console.log(responseData)
      if (response.status === 200) {
        
        this.successResponse(responseData.jwtToken)
      } else {
        
        alert(responseData.message);
        this.setState({
          emailId: '',
          password: '',
        })
      }
    }else{
      alert("Enter valid credentials")
    }
    
  }

  render() {
    const {emailId, password} = this.state
    
    return (
      <div className="login-bg-container">
        <form method="POST" className="form-container">
          <h1 className='heading'>Login</h1>
          <label htmlFor="emailid" className="label-text">
            Email id
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter your Email id"
            id="emailid"
            className="input"
            onChange={this.setEmailId}
            value={emailId}
          />
          <br />
          <label htmlFor="password" className="label-text">
            Password
          </label>
          <br />
          <input
            type="password"
            placeholder="Enter your Password"
            id="password"
            className="input"
            onChange={this.setPassword}
            value={password}
          />
          <br />
          <p className='minimum-password'>Minimum 8 Alpha Numeric</p>
          
          <div className='button-container'>
            <button type="submit" className="login" onClick={this.onSubmitLoginForm}>
                Login
            </button>
          </div>
          
         
        </form>
      </div>
    )
  }
}