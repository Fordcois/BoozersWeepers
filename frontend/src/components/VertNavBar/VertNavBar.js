import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome, IoPint, IoWallet } from 'react-icons/io5';
import { BiExpandHorizontal } from 'react-icons/bi';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { FiLogIn,FiLogOut } from 'react-icons/fi';
import { MdOutlineAccountCircle, MdLeaderboard } from "react-icons/md";
import { TiGroup } from "react-icons/ti"; //for groups
import { Link } from 'react-router-dom';

import '../VertNavBar/VertNavBar.css';
import isTokenValid from '../Utility/isTokenValid';

const VertNavbar = ({ expanded, toggleExpand }) => {

const [userToken, setUserToken] = useState(localStorage.getItem('token'));
const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(userToken));
const navigate = useNavigate();


  const logout = () => {
    localStorage.removeItem('token');
    navigate('/', { state: { expandedState: expanded } });
  };

  return (
    <nav className={`VertNavbar ${expanded ? 'expanded' : ''}`}>
      <div className="VertNavbar-links">
        <ul>
        {isLoggedIn ? (
          <ul>
          <li onClick={toggleExpand}><BiExpandHorizontal className="react-icon" size={30} /></li>
          <li className="spacer"></li>
          <li><Link to = '/myAccount' state = {{expandedState: expanded }}><span>Home</span><IoHome className="react-icon" size={30} /> </Link></li>
          <li><Link to = "/newWager" state = {{expandedState: expanded }}><span>New Wager</span><FaHandshakeSimple className="react-icon" size={30} /> </Link></li>
          <li><Link to = "/wallet" state = {{expandedState: expanded }}><span>Wallet</span><IoWallet className="react-icon" size={30} /> </Link></li>
          <li><Link to = "/groups" state = {{expandedState: expanded }}><span>Groups</span><TiGroup className="react-icon" size={30} /> </Link></li>
          <li><Link to = "/leaderboard" state = {{expandedState: expanded }}><span>Leaderboard</span><MdLeaderboard className="react-icon" size={30} /> </Link></li>
          </ul>
          ) : (
            <ul>
            <li onClick={toggleExpand}><BiExpandHorizontal className="react-icon" size={30} /></li>
            <li className="spacer"></li>
            </ul>
          )}

        </ul>
      </div>

      <div className="bottom-section">
        <ul>
          {isLoggedIn ? (
            <li className="logout-option" onClick={logout}><span>Log Out</span><FiLogOut className="react-icon" size={30} /></li>
          ) : (
            <div>
            <li className="logout-option"><Link to = '/signup' state = {{expandedState: expanded }}><span>Register</span><MdOutlineAccountCircle className="react-icon" size={30} /></Link></li> 
            <li className="logout-option"><Link to = '/login' state = {{expandedState: expanded }}><span>Sign In</span><FiLogIn className="react-icon" size={30} /></Link></li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default VertNavbar;
