import React from 'react';
import GoogleLogin from 'react-google-login';
import logo from './logo.svg';
import './App.css';
import Worksheets from './components/WorksheetComponents/Worksheets';

/**
 * User logs in, gives google id to client app
 * The google id is sent to the backend (controller?) and either a new userId is generated (for new users)
 or the userId is retrieved
 * The user is redirected to the dashboard, with the userId as a url arguments
 * The user's worksheets (and accompanying data) and known users (if a teacher) are loaded into the client app via a 
 call to the backend (controller?) with the userId
 * This information is continually updated based on the received data via Phoenix channels
 */

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
      <Worksheets></Worksheets>
    </div>
  );
}

export default App;
