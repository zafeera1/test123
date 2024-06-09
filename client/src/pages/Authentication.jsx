import React from 'react';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';

const Authentication = () => {
  return<div className="sign-container">
    <div>
      <SignUp />
    </div>
  <div className="divider"></div>
  <div> 
  <LogIn />
  </div>
</div>
};

export default Authentication;
