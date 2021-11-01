import React from "react";
import './Header.css';

export default ({black}) =>{



  return(
    <header className={black ? 'black': ''}>
      <div className='header--logo'>
        <a href="/">
          <img src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" alt="logo"/>
        </a>
      </div>

      <div className="header--user">
       
        <a href="/">
          <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="user"/>
        </a>

      </div>
    </header>
  )
}