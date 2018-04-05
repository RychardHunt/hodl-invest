import React, {Component} from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import {Link} from 'react-router-dom';
import FacebookLogin from './FacebookLogin.jsx';
import './Login.css';

const LoginPage = (props) => {
  const signupWasClickedCallback = (data) => {
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    if(data.password===data.passwordConfirmation){
      var sendObject = JSON.stringify({
        "username": data.username,
        "passwordHash": data.password,
        "name": "meep",
        "email": "j@gmail.com",
        "playMoney": 100,
        "transaction":[]
      });
      console.log(sendObject);
      xhr.send(sendObject);
      console.log(xhr.status);
      alert('Signup Successful');
    } else{
        alert('passwords dont match');
    }
  };

  const loginWasClickedCallback = (data) => {
    console.log(data);
    var sendObject = JSON.stringify({
      "username": data.username,
      "password": data.password
    });

    console.log(sendObject);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/login");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(sendObject);
    alert('Login Successful');
    window.location.href = './dashboard';
  }

  /*const recoverPasswordWasClickedCallback = (data) => {
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/", false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
    var correctindex=-1;
    var userstring=xhr.responseText;
    var JSONTWO= JSON.parse(userstring);
    for(i=0;i<JSONTWO.length;i++){
    if(JSONTWO[i].username==data.username){
    correctindex=i;}}
    }
    alert('Recover password callback, see log on the console to see the data. testing');*/

  return (
    <div>
    <ReactSignupLoginComponent
    styles={{
      mainWrapper: { backgroundColor: '#2892D7',
                     margin: 'auto'},
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
      }
      /*recoverPassword: {
        wrapper: { backgroundColor: 'yellow' },
        inputWrapper: { backgroundColor: '#53a7df' },
        buttonsWrapper: { backgroundColor: '#53a7df' },
        input: { backgroundColor: 'LavenderBlush' },
        button: { backgroundColor: 'LavenderBlush' },
      }*/
    }}
    title="Hodl Invest"
    handleSignup={signupWasClickedCallback}
    handleLogin={loginWasClickedCallback}
   // handleRecoverPassword={recoverPasswordWasClickedCallback}
    />

  <FacebookLogin/>


  </div>
  );
};

export default LoginPage;
