import { Component } from "react"
import { Link } from "react-router-dom"
import CandidateItem from "../CandidateItem"
import Header from '../Header'
import Cookies from 'js-cookie'
import './index.css'


class Candidates extends Component{

    state ={
        candidatesData:[]
    }

   componentDidMount() {
    this.getCandidatesData()
   }

   getCandidatesData = async() =>{

    const response = await fetch("/candidates");
    const responseData = await response.json()
    // console.log(responseData)
    if(response.status === 200){
        this.setState({
            candidatesData: responseData
        })
    }else{
        alert("Error fetching candidates details. Click ok to try again");
        this.getCandidatesData();
    }
   }
    
   deleteCandidate = async(id) =>{
    const jwtToken = Cookies.get("jwt_token")
   
        const removeId = id
        const data = {
            id:removeId
        }
        const options = {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
            body:JSON.stringify(data)
        }
        const response = await fetch('/candidates',options);
        const responseData  = await response.json()
        alert(responseData.message)
        this.getCandidatesData()
   }
    
   selectResult = async(id) =>{
    const jwtToken = Cookies.get("jwt_token")
    
    const selectedId = id
    const data = {
        id:selectedId
    }
    const options = {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${jwtToken}`
        },
        body:JSON.stringify(data)
    }
    const response = await fetch('/candidatesResult',options);
    const responseData  = await response.json()
    if(response.status === 200){
        alert(responseData.message);
    }else{
        alert("Error updating candidate result");
    }
   }

  /* editCandidate = async(id) =>{
    const jwtToken = Cookies.get("jwt_token")
    const selectedId = id
    const data = {
        id:selectedId
    }
    const options = {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${jwtToken}`
        },
        body:JSON.stringify(data)
    }
    const response = await fetch('/candidates',options);
    const responseData  = await response.json()
    if(response.status === 200){
        alert(responseData.message);
    }else{
        alert("Error updating candidate data");
    }
   }*/

    render(){
        const {candidatesData} = this.state 
        
        return(
            <div className="candidates-bg-container">
                
                <div className="candidates-container">
                <Header />
                <h1  className="candidates-heading">Candidate List:{candidatesData.length}</h1>
                    <table>
                        <tr>
                            <th>Id.No</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Result</th>
                           
                        </tr>
                        {
                            candidatesData.map(eachCandidate =>(
                                <CandidateItem key={eachCandidate._id} 
                                candidateDetails={eachCandidate}
                                deleteCandidate={this.deleteCandidate}
                                selectResult={this.selectResult}
                                />
                            ))
                        }
                       
                        
                    </table>
                <Link className="link" to="/add-candidate">
                    <p className="add-candidate-description">+ Add new candidate</p>
                </Link>
                
                </div>
            </div>
        )
    }
}
export default Candidates