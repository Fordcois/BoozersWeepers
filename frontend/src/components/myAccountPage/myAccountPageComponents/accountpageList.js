import React from 'react';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import OngoingWagers from './ongoingWagers';
import PastWagers from './PastWagers';
import UnresolvedWagers from './UnresolvedWagers';
import IncomingWagers from './IncomingWagers';
import PendingWagers from './PendingWagers';


const AccountPageList = ({ List, showState, updateStateFunction, Heading, resultsComponent }) => {
    
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
                {resultsComponent === 'Incoming' && List.length > 0 && <IncomingWagers wagers={List} />}
                {resultsComponent === 'Ongoing' && List.length > 0 && <OngoingWagers Wagers={List} />}
                {resultsComponent === 'Past' && List.length > 0 && <PastWagers pastWagers={List}/>}
                {resultsComponent === 'Unresolved' && List.length > 0 && <UnresolvedWagers unresolvedWagers={List}/>}
                {resultsComponent === 'Pending' && List.length > 0 && <PendingWagers pendingWagers={List}/>}
        </>
    )}
</div>
);
};

export default AccountPageList;
