import React, { useState, useEffect } from 'react';
import SingleUser from '../searchResultSingleUser/Singleuser';
import { FaPencil } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const SearchBar = ({searchData, expandedState,searchMode}) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [SearchCriteria, setSearchCriteria] = useState('');
    const UnfilteredList = searchData;
    const [expanded, setExpanded] = useState(expandedState !== undefined ? expandedState : true);
  
    const handleInputChange = (event) => { setSearchCriteria(event.target.value); };

    useEffect(() => {
        setExpanded(expandedState);
      }, [expandedState]);

    let FilteredList = [];

    if (SearchCriteria.length > 2 && searchMode === 'users') {
        FilteredList = UnfilteredList.filter(user => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            const searchValue = SearchCriteria.toLowerCase();
            return fullName.includes(searchValue) || user.username.toLowerCase().includes(searchValue);
        });
    }

    if (SearchCriteria.length > 2 && searchMode === 'groups') {
        FilteredList = UnfilteredList.filter(group => {
            const searchValue = SearchCriteria.toLowerCase();
            return group.name.toLowerCase().includes(searchValue);
        });
    }

    return (

<div style={{display: 'flex', marginBottom: '10px' }}>

    <div style={{flex: '1%', justifyContent: 'flex-end' }}>
        <FaPencil style={{ transform: 'scaleX(-1)', color: 'whitesmoke', fontSize: '24px', marginRight:'2px',opacity:'0.2' }} />
    </div>

    <div style={{flex: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <input type="text" value={SearchCriteria} onChange={handleInputChange} style={{marginBottom: '20px' }}placeholder={`Search ${searchMode}...`} />
            
            {searchMode==='users' && 
                FilteredList.map((user, index) =>
                <SingleUser SelectedUser={user} key={user._id} expandedState={expanded} />
            )}

            {searchMode==='groups' && 
                FilteredList.map((group, index) =>
                <Link className='groupSearchResult' to={`/groups/${group._id}`} state = {{expandedState: expanded }}> {'>'} {group.name} </Link>
            )}

            
    </div>
</div>

);}

export default SearchBar;
