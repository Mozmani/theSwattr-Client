import React from 'react';
import {Link} from 'react-router-dom'

//renders home / capture page
const HomeRoute = () => {
  return (
    <div className='homeDiv'>
      <h2>Welcome to theSwattr!</h2>
      <p>theSwattr is a an all-in-one bug tracking tool for development teams, as well as a ticket system
        for users to submit bugs to the development team.</p>
        <p>
          This application allows users to contribute information to the development team so that the user experience can improve.
           This application also allows developers to smoothly track bugs that are sorted by severity, and status.
           Developers in addition can respond to the users through a comments thread in each bug, as well as update the status, severity or which app the bug belongs to.           
        </p>
        <Link to='/login'>
          Lets get started!
        </Link>
    </div>
  )
};

export default HomeRoute;
