import React from 'react';

//this page is done for now

const Header = () => {
  return (
    <div className="wcra">
      <img alt="WCRA Logo" src="Images/LittleLogo.png" className="logo" />
      <img
        alt="Wheaton Community Radio Association Full Name Logo"
        src="Images/BannerCall.gif"
        id="name-logo"
      />
      <img alt="ARRL Logo" src="Images/ARRLSmallLogo.png" className="logo" />
      {/* <button id="nav_menu"><img src="" alt="menu" />menu</button> */}
    </div>
  );
};

export default Header;
