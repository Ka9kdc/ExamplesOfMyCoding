import React from 'react';

import Header from './Header';
import NavBar from './NavBar';

import Footer from './Footer';
import Routes from './routes';

const Main = (props) => {
  return (
    <div className="FullPage">
      <Header />
      <NavBar />
      <Routes />
      <Footer />
    </div>
  );
};

export default Main;
