import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({logout, openModal, currentUser }) => {
  const soundSkyLogo = <NavLink to="/" className="soundsky">SOUNDSKY</NavLink>   
  const sessionButtons = () => {
    return (
      <div className="top-banner">
        <header className="signedout-header">
          {soundSkyLogo}
          <div className ="session-buttons">
            <button className = "signin-button" onClick={() => openModal('login')}>Sign in</button>
            <button className= "signup-button" onClick={() => openModal('signup')}>Create account</button>
          </div>
        </header>
      </div>)
  };
  const signinHeader = (currentUser, logout) => {
    return(<header className= "signedin-header" >
      {soundSkyLogo}
      <div className= "right-banner">
        <NavLink to={`/users/${currentUser.id}`} className="user-show-link">{currentUser.username}</NavLink>
        <NavLink to="/" className="logout-button" onClick={logout}>Log Out</NavLink>
      </div>
    </header>)
  };
  if (currentUser) {
    return signinHeader(currentUser, logout);
  } else {
    return sessionButtons(); 
  }
};

export default Header;
