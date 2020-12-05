import React from 'react';
import {Link} from 'react-router-dom'

//renders home / capture page
const HomeRoute = () => {
  return (
    <div className='homeDiv'>
      <h2>Welcome to theSwattr!</h2>
      <p>theSwattr is a an all in one bug tracking tool for development teams, as well as a ticket system
        for users to submit bugs to the development team.</p>
        <p>
          This application allows users to contirbute information to the development team so that the user experience can improve,
           also this application allows developers to smoothly track bugs that are sorted by severity, status, and how long it has existed.
           Developers in additon can respond to the users through their bugs comments, as well as update the status, severity or which app the bug belongs to.           
        </p>
        <Link to='/login'>
          Lets get started!
        </Link>
    </div>
  )
};

export default HomeRoute;
