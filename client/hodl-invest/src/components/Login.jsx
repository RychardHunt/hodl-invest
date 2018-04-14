import React, {Component} from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import {Link} from 'react-router-dom';
import Registration from './Registration.jsx';
import Log from './Log.jsx';
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
      alert('Signup Successful! Please login with your credentials!');
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
        var result=JSON.parse(this.responseText);
	      document.cookie="token="+result.token;
	      console.log(document.cookie);
      }
    });

    xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/login");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(sendObject);
    alert('Login Successful!');
    window.location.href = './dashboard';
  }


    const responseFacebook = (response) => {
      console.log(response);
    }


  return (
    <div>
  <Registration/>,
  <Log/>


  </div>
  );
};

export default LoginPage;
