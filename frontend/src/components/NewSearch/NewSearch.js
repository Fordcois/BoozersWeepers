import React, { useState, useEffect } from 'react';
import SingleUser from '../userlist/Singleuser';
import { FaPencil } from "react-icons/fa6";

const NewSearchBar = (props) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [SearchCriteria, setSearchCriteria] = useState('');
    const UnfilteredList = props.SearchData;

    const handleInputChange = (event) => { setSearchCriteria(event.target.value); };

    let FilteredList = [];

    if (SearchCriteria.length > 2) {
        FilteredList = UnfilteredList.filter(user => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            const searchValue = SearchCriteria.toLowerCase();
            return fullName.includes(searchValue) || user.username.toLowerCase().includes(searchValue);
        });
    }

    return (

            

        



<div style={{display: 'flex', marginBottom: '10px' }}>

    <div style={{flex: '1%', justifyContent: 'flex-end' }}>
        <FaPencil style={{ transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px', marginRight:'2px',opacity:'0.2' }} />
    </div>

    <div style={{flex: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <input type="text" value={SearchCriteria} onChange={handleInputChange} style={{marginBottom: '20px' }}placeholder="Find user..." />
            {FilteredList.map((user, index) => 
             <SingleUser SelectedUser={user} key={user._id} />)}
    </div>
    </div>

);}

export default NewSearchBar;
