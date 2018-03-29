import React, {Component} from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import './Login.css';

const LoginPage = (props) => {
  const signupWasClickedCallback = (data) => {
    console.log(data);
    xhrt.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/", true);
    xhrt.send(data);
    console.log(xhrt.status);
    alert('Signup callback, see log on the console to see the data. testing');
  };
  const loginWasClickedCallback = (data) => {
    console.log(data);
    alert('Login callback, see log on the console to see the data. testing');
  };
  const recoverPasswordWasClickedCallback = (data) => {
    console.log(data);
    alert('Recover password callback, see log on the console to see the data. testing');
  };
  return (
    <div>
    <ReactSignupLoginComponent
    styles={{
      mainWrapper: { backgroundColor: '#2892D7' },
      mainTitle: { color: 'white' },
      flipper: { transition: '0.1s' },
      signup: {
        wrapper: { backgroundColor: 'yellow' },
        inputWrapper: { backgroundColor: '#53a7df' },
        buttonsWrapper: { backgroundColor: '#53a7df' },
        input: { backgroundColor: 'LavenderBlush' },
        recoverPassword: {},
        button: { backgroundColor: 'LavenderBlush' },
      },
      login: {
        wrapper: { backgroundColor: 'yellow' },
        inputWrapper: { backgroundColor: '#53a7df' },
        buttonsWrapper: { backgroundColor: '#53a7df' },
        input: { backgroundColor: 'LavenderBlush' },
        recoverPasswordWrapper: { backgroundColor: '#53a7df' },
        recoverPasswordButton: { backgroundColor: 'LavenderBlush' },
        button: { backgroundColor: 'LavenderBlush' },
      },
      recoverPassword: {
        wrapper: { backgroundColor: 'yellow' },
        inputWrapper: { backgroundColor: '#53a7df' },
        buttonsWrapper: { backgroundColor: '#53a7df' },
        input: { backgroundColor: 'LavenderBlush' },
        button: { backgroundColor: 'LavenderBlush' },
      },
    }}
    title="Hodl Invest"
    handleSignup={signupWasClickedCallback}
    handleLogin={loginWasClickedCallback}
    handleRecoverPassword={recoverPasswordWasClickedCallback}
    />
    </div>
  );
};

export default LoginPage;
