import React, { useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import logo from './logo.svg';
import './App.css';

/**
* 
 */

const App = (props) => {
  let {studentPinCode} = useParams();
  const userType = studentPinCode ? 'student' : 'teacher';
  const responseGoogle = (response) => {
    let worksheetsUrl = '/'+userType+'/'+response.profileObj.googleId+'/'+studentPinCode;
    props.history.push(worksheetsUrl);
    console.log('callback');
  }

  return (
   <div className="App">
       /<GoogleLogin
        clientId="441211629456-vdq7bfpq4vt9rest5jupvnostqdi2ahu.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
