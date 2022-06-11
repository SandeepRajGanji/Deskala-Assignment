import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import '../AddCandidate/index.css'

const stateList = ["Andhra Pradesh (AP)",
    "Arunachal Pradesh (AR)",
    "Assam (AS)",
    "Bihar (BR)",
    "Chhattisgarh (CG)",
    "Goa (GA)",
    "Gujarat (GJ)",
    "Haryana (HR)",
   "Himachal Pradesh (HP)",
    "Jammu and Kashmir (JK)",
    "Jharkhand (JH)",
    "Karnataka (KA)",
    "Kerala (KL)",
    "Madhya Pradesh (MP)",
    "Maharashtra (MH)",
    "Manipur (MN)",
    "Meghalaya (ML)",
    "Mizoram (MZ)",
   "Nagaland (NL)",
    "Odisha(OR)",
    "Punjab (PB)",
    "Rajasthan (RJ)",
    "Sikkim (SK)",
    "Tamil Nadu (TN)",
    "Telangana (TS)",
    "Tripura (TR)",
    "Uttar Pradesh (UP)",
    "Uttarakhand (UK)",
    "West Bengal (WB)"]

export default class AddCandidate extends Component {
  state = {
    
    name:'',
    dateOfBirth:'',
    age:'',
    address:'',
    selectState:'',
    pincode:'',
    emailId:'',
   
  }

  componentDidMount() {
    this.getCandidateSpecificData()
  }

  getCandidateSpecificData = async() =>{
    const {match} = this.props
    const id = match.params.id
    const url = `/candidates/${id}`
    const response = await fetch(url)
    const responseData = await response.json()
    this.setState({
      name:responseData.name,
      dateOfBirth:responseData.dateOfBirth,
      age:responseData.age,
      emailId:responseData.emailId,
      address:responseData.address,
      selectState:responseData.state,
      pincode:responseData.pincode,
    })
  }

  setName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  setDateOfBirth = event => {
    this.setState({
        dateOfBirth: event.target.value,
    })
  }

  setAge = event => {
    this.setState({
      age: event.target.value,
    })
  }

  setAddress = event => {
    this.setState({
      address: event.target.value,
    })
  }

  setSelectState = event => {
    this.setState({
      selectState: event.target.value,
    })
  }

  setPincode = event => {
    this.setState({
     pincode: event.target.value,
    })
  }
 
  setEmailId = event => {
    this.setState({
    emailId: event.target.value,
    })
  }
  
 
  
 
  onUpdateCandidateForm = async event => {
    event.preventDefault();
    const {match} = this.props
    const id = match.params.id
    const {name,dateOfBirth,age,emailId,address, selectState,pincode} = this.state
    if(name !== "" && dateOfBirth !== "" && age !== "" && emailId !== "" && address !== "" && selectState !== "" && pincode !== ""){
      if((age.match(/[0-9]/g)) && age.length <= 3 && emailId.endsWith("@gmail.com") && (pincode.match(/[0-9]/g)) && pincode.length === 6){
        const data = {
          id,name,dateOfBirth,age,emailId:emailId.toLowerCase(),address, selectState,pincode
        }
        // console.log(data)
        const jwtToken = Cookies.get("jwt_token")
        const options = {
          method: 'PUT',
          headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${jwtToken}`
          },
          body: JSON.stringify(data),
        }
    
        const response = await fetch('/update-candidate',options)
        const responseData = await response.json()
        
        if (response.status === 200) {
          alert(responseData.message);
          const {history} = this.props
          history.replace('/candidates')
        } else {
          alert(responseData.message);
          this.setState({
            name:'',
            dateOfBirth:'',
            age:'',
            address:'',
            selectState:'',
            pincode:'',
            emailId:'',
          })
        }
      }else{
        alert("Enter valid credentials")
      }
      
    }else{
      alert("Enter all credentials")
    }
   
  }

  
  render() {
   const {name,dateOfBirth,age,address,selectState,pincode,emailId} = this.state
    
    return (
      <div className="create-candidate-bg-container">
        <form  method="POST" className="create-candidate-form-container">
            <h1 className='create-candidate-heading'>Create Candidate</h1>
            <div className='form-items-details-container'>
                <div >
                    <label htmlFor="name" className="label-text">
                        Name
                    </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        id="name"
                        className="input"
                        onChange={this.setName}
                        value={name}
                    />
                    <br />
                    <label htmlFor="date-of-birth" className="label-text">
                    Date of Birth
                    </label>
                    <br />
                    <input
                        type="calender"
                        id="date-of-birth"
                        className="input"
                        onChange={this.setDateOfBirth}
                        placeholder="Enter your Date of Birth"
                        value={dateOfBirth}
                    />
                    <br />
                    <label htmlFor="age" className="label-text">
                        Age
                    </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your Age"
                        id="age"
                        className="input"
                        onChange={this.setAge}
                        value={age}
                    />
                    <br />
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
                </div>
                

                <div>
                    <label htmlFor="address" className="label-text">
                        Address
                    </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your Address"
                        id="address"
                        className="input"
                        onChange={this.setAddress}
                        value={address}
                    />
                    <br />
                    <label htmlFor="state" className="label-text">
                    State
                    </label>
                    <br />
                    <select
                        className="select"
                        placeholder='Select your State'
                        onChange={this.setSelectState}
                        value={selectState}
                        >
                        {stateList.map(eachState => (
                            <option
                            key={eachState}
                            
                            >
                            {eachState}
                            </option>
                        ))}
                    </select>
                    <br />
                    
                    <label htmlFor="pincode" className="label-text">
                        Pincode
                    </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your 6 digit pincode"
                        id="pincode"
                        className="input"
                        onChange={this.setPincode}
                        value={pincode}
                    />
                    <br />
                </div>
            
            </div>
            <div className='buttons-container'>
               
                <button type="button" className="cancel">
                    <Link to="/candidates"  className='link'>
                        Cancel
                    </Link>
                </button>
                
                
                <button type="submit" className="create" onClick={this.onUpdateCandidateForm}>
                    Update
                </button>

            </div>
          
          
        </form>
      </div>
    )
  }
}