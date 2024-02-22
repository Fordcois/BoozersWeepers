import React from 'react';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const AccountPageList = ({ List, showState, updateStateFunction, Heading, ResultsComponent }) => {
    
const toggleState = (setStateFunction) => {setStateFunction(prevState => prevState === null ? true : null);}

return (
<div>
    {List.length > 0 && showState === null ? (
        <span className="chalk" style={{ '--fsize': '1.5rem', color: '#cd561b' }} onClick={() => toggleState(updateStateFunction)}>
            <IoIosArrowForward /> {Heading} ({List.length}) 
        </span>
    ) : (
        <>
            {List.length > 0 && (
                <span className="chalk" style={{ '--fsize': '1.5rem', color: '#cd561b' }} onClick={() => toggleState(updateStateFunction)}>
                    <IoIosArrowDown /> {Heading} ({List.length})
                </span>
            )}
                {List.length > 0 && <ResultsComponent wagers={List} />}
        </>
    )}
</div>
);
};

export default AccountPageList;
