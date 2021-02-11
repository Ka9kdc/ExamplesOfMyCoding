import React from 'react';

const lastModDate = new Date()

const Footer = () => {
  return (
    <div className="Footer">
      <>Wheaton Community Radio Amateurs</>

      <>
        <b>WCRA</b> &#8226; P.O. Box 1055 &#8226; Wheaton, Illinois &#8226;
        60187-1055 &#8226; (630) 923-5447 &#8226; www.w9ccu.org
      </>

      <>
        Contents copyright &copy; 2016-2021, Wheaton Community Radio Amateurs.
        All rights reserved.
        <>
          Last modified:   {lastModDate.toDateString()}     </>
      </>
    </div>
  );
};

export default Footer;