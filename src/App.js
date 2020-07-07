import React from 'react';
import GoogleLogin from 'react-google-login';
import logo from './logo.svg';
import './App.css';
import Worksheet from './components/WorksheetComponents/Worksheet';

const App = () => {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
   <div className="App">
       {/* <GoogleLogin
        clientId="441211629456-vdq7bfpq4vt9rest5jupvnostqdi2ahu.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    /> */}
      <Worksheet></Worksheet>
    </div>
  );
}

export default App;
