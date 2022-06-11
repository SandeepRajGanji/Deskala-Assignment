import {AiOutlineEdit} from "react-icons/ai"
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Link} from "react-router-dom"

const CandidateItem = (props) =>{
    const {candidateDetails,selectResult,deleteCandidate} = props
    const {_id,name,dateOfBirth,emailId,shortList} = candidateDetails
    let shortlist,rejected
    // console.log(shortList)
    if(shortList === "ShortList"){
        shortlist = true 
        rejected = false
    }else{
        shortlist = false
        rejected = true
    }
    const setSelectResult = () =>{
        selectResult(_id)
    }

    const onDeleteCandidate = () =>{
        deleteCandidate(_id)
    }

    

    return(
        <tr>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{dateOfBirth}</td>
            <td>{emailId}</td>
            <td>
                <select
                    className="select-result"
                    onChange={setSelectResult}
                >
                    <option selected={shortlist} value="ShortList">ShortList</option>
                    <option selected={rejected} value="Rejected">Rejected</option>
                
                </select>
            </td>
            <td>
                <Link to={`/candidates/${_id}`}>
                    <AiOutlineEdit size={20} color="#00BFFF"  className="edit" />
                </Link>
            </td>
            <td>
                <RiDeleteBin6Line size={20} color="#00BFFF" className="delete" onClick={onDeleteCandidate}/>
            </td>
        </tr>
    )
}
export default CandidateItem