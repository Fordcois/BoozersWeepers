import React from 'react';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const AccountPageList = ({ list, showState, updateStateFunction, heading, ResultsComponent, color }) => {
    
const toggleState = (setStateFunction) => {setStateFunction(prevState => prevState === null ? true : null);}
// list.approved === null && list.peopleInvolved[0] !== logged
return (
<div>
    {list.length > 0 && showState === null ? (
        <span className="chalk" style={{ '--fsize': '1.8rem', color: color }} onClick={() => toggleState(updateStateFunction)}>
            <IoIosArrowForward/> {heading} ({list.length})
        </span> 
    ) : (
        <>
            {list.length > 0 && (
                <>
                    <span className="chalk" style={{ '--fsize': '1.8rem', color: color }} onClick={() => toggleState(updateStateFunction)}>
                        <IoIosArrowDown /> {heading} ({list.length})
                    </span>
                    <div style={{marginBottom :'1em'}}>
                        <ResultsComponent wagers={list} />
                    </div>
                </>
            )}
        </>
    )}
</div>
);
}

export default AccountPageList;
