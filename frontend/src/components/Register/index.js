import {Component} from 'react'


export default class Register extends Component {
  state = {
    emailId: '',
    password: '',
    phoneNumber:'',
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

  setPhoneNumber = event => {
    this.setState({
      phoneNumber: event.target.value,
    })
  }


  onSubmitRegisterForm =  async event => {
    event.preventDefault();
    const {emailId, password,phoneNumber} = this.state
    console.log(emailId.toLowerCase())
    if(emailId !== "" && password !== "" && phoneNumber !== ""){
      const checkEmail = emailId.endsWith("@gmail.com")
      
      const checkPasswordLength = password.length >=8
      if(!checkEmail){
        alert("Enter a valid emailId")
        
      }
      if(phoneNumber.length !== 10){
        alert("Enter a valid mobile number")
        
      }
      if(!checkPasswordLength){
        alert("Password should be of atleast 8 charaters")
       
      }else{
        if(phoneNumber.match(/[0-9]/g)){
        if (password.match(/[a-z]/g) && password.match(
          /[A-Z]/g) && password.match(
          /[0-9]/g) && password.match(
          /[^a-zA-Z\d]/g) )
          {
            const data = {
              emailId:emailId.toLowerCase(),
              password,
              phoneNumber
            }
            console.log(data)
           
            const options = {
              method: 'POST',
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify(data),
            }
        
            const response = await fetch('/register',options)
            const responseData = await response.json()
            
            if (response.status === 200) {
              alert(responseData.message);
              const {history} = this.props
              history.replace('/login')
            } else {
              alert(responseData.message);
              this.setState({
                emailId: '',
                password: '',
                phoneNumber:'',
              })
            }
          }else{
            alert("Password should be contain at least One Uppercase , One lowercase, One Numeric, One Special Character")
          }
        }else{
          alert("Enter a valid mobile number")
        }
      }
      
    }else{
      alert("Enter all credentials")
    }
    
  }

  render() {
    const {errorMsg, showErrorMsg, emailId, password,phoneNumber} = this.state
    
    return (
      <div className="login-bg-container">
        <form method="POST" className="form-container">
          <h1 className='heading'>Sign Up</h1>
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
          <label htmlFor="phone-number" className="label-text">
          Phone Number
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter your Phone Number"
            id="phone-number"
            className="input"
            onChange={this.setPhoneNumber}
            value={phoneNumber}
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
            <button type="submit" className="login" onClick={this.onSubmitRegisterForm}>
                Sign Up
            </button>
          </div>
          
          {errorMsg ? <p className="error-msg">*{showErrorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}