import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

const SinglePendingWager = (props) => {
    const navigate = useNavigate()
    const wager = props.wagerData;
    const token = window.localStorage.getItem('token');
    const dateParts = wager.deadline.slice(0, 10).split("-");
    const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
    const [expanded, setExpanded] = useState(props.expandedState !== undefined ? props.expandedState : true);

    useEffect(() => {
      setExpanded(props.expandedState);
    }, [props.expandedState]);

    const handleCancelButtonClick = () => {
        fetch( `/wagers/${wager._id}/cancel`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })      
        console.log("cancel button clicked")
        navigate("/myAccount", {state : {expandedState:expanded}});

    }
    return (
        <div id='single-pending-wager' className="single-wager-info">
            <span className="chalk" style={{ marginTop:'1%',paddingLeft:'12%','--fsize': '22px', '--talign': 'left', color: '#cd561b'}}> Will happen by...</span>
            <span className="chalk" style={{ marginTop:'1%', paddingLeft:'17%','--fsize': '19px', '--talign': 'left', color: 'whitesmoke' }}>{deadlineDate} </span>

            <span className="chalk" style={{ marginTop:'4%','--fsize': '27px', '--talign': 'center', color: 'whitesmoke' }}>You're still waiting on {wager.peopleInvolved[1].username} to respond to your wager.</span>
            <span className="chalk" style={{ marginTop:'1%','--fsize': '19px', '--talign': 'center', color: 'whitesmoke', opacity:'0.8' }}>(Let's see if they've got the minerals...)</span>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'3%'}}>
                <button class="orange_Button" id='cancel-request-button' onClick={handleCancelButtonClick}>Cancel Request</button>
            </div>
        </div>
    )
}

export default SinglePendingWager;
