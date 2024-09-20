import './App.css';
import React from 'react';
import {useNavigate,Routes,Route,} from "react-router-dom";
import LogInPage from '../../Pages/loginPage';
import NewWagerForm from '../../Pages/NewWagerFormPage'
import Home from '../home/Home';
import MyAccountPage from '../../Pages/MyAccountPage';
import NewWagerPage from '../../Pages/NewWagerPage';
import WagerInfoPage from '../../Pages/WagerInfoPage';
import SignUpPage from '../../Pages/signupPage';
import Workshop from '../Template/template';
import ProfilePage from '../../Pages/userprofilepage';
import WalletPage from '../../Pages/WalletPage';
import PubGroupsPage from '../../Pages/PubGroupsPage'
import SingleGroupPage from '../../Pages/SingleGroupPage'
import LeaderBoardPage from '../../Pages/leaderboardPage';
import ContentFrame from '../contentFrame/ContentFrame';

const App = () => {
    return (
        <Routes>
          <Route path='/login'  element={<LogInPage  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpPage navigate={ useNavigate() }/>}/>
          <Route path='/myAccount' element={<MyAccountPage navigate={ useNavigate() }/>}/>
          <Route path='/newWager/:challengedUserID' element={<NewWagerForm navigate={ useNavigate() }/>}/>
          <Route path='/newWager'  element={<NewWagerPage navigate={ useNavigate() }/>}/>
          <Route path='/Wager/:wagerID' element={<WagerInfoPage navigate={ useNavigate() }/>}/>
          <Route path='/workshop' element={<Workshop navigate={ useNavigate() }/>}/>
          <Route path='/frame' element={<ContentFrame navigate={ useNavigate() }/>}/>
          <Route path='/profile/:userID' element={<ProfilePage navigate={ useNavigate() }/>}/>
          <Route path='/wallet' element={<WalletPage navigate={ useNavigate() }/>}/>
          <Route path='/groups/:pubGroupId' element={<SingleGroupPage navigate={ useNavigate() }/>}/>
          <Route path='/groups' element={<PubGroupsPage navigate={ useNavigate() }/>}/>
          <Route path='/leaderboard' element={<LeaderBoardPage navigate={ useNavigate() }/>}/>
          <Route path='/'  element={<Home navigate={ useNavigate() }/>}/>

        </Routes>
    );
}

export default App;
