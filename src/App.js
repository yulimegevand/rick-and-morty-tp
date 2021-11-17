import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import ReactRouter from './features/Components/ReactRouter';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {
  setUser,
  cleanUser,
} from './features/global/global.slice';

function App() {
  const googleClientId = "614342822295-qsnbif6898r3d13khs5td31cg461vq5l.apps.googleusercontent.com";

  const dispatch = useDispatch();
  const user = useSelector(state => state.global.user);  
  const onSuccessLogin = (response) => {
    console.log("========== onSuccess ==============", response)
    console.log("response.profileObj", response.profileObj)
    if (response && response.accessToken && response.profileObj) {
      dispatch(setUser({ ...response.profileObj, accessToken: response.accessToken }))
    }
  };
  const onErrorLogin = (response) => {
    console.log("========== onError ==============", response);
    dispatch(cleanUser());
  };
  console.log({ user })

  return (
    <div className="App">
      <header className="App-header">
      {!user ?
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Log in with Google"
            onSuccess={onSuccessLogin}
            onFailure={onErrorLogin}
            cookiePolicy={'single_host_origin'}
          />
          :
          
          <>
            <GoogleLogout
              clientId={googleClientId}
              buttonText="Logout"
              onLogoutSuccess={() => dispatch(cleanUser())}
            />
            
              <ReactRouter />

          </>

        }
      
        
      
      </header>
    </div>
  );
}

export default App;
