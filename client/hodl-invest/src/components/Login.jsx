import React, {Component} from 'react';
import './Registration.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loginUser, logoutUser} from '../actions/loginAction';



class Login extends Component{

  constructor(props) {
     super(props);
     this.state={username: ''}
     this.state={password: ''}
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
     var name=event.target.name;
     this.setState({[name]: event.target.value});
   }

   handleSubmit(event) {
       var xhr = new XMLHttpRequest();
       let login = this;
       xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4 && this.status === 200) {
           var jsonObj = JSON.parse(this.responseText);
           login.props.loginUser(jsonObj.username, jsonObj.token);
           alert("Welcome " + jsonObj.username + "! Please proceed to Dashboard!");
           document.cookie = "token=" + jsonObj.token;
           document.cookie ="username=" + jsonObj.username;
           window.logswitch="true";
           window.logtext="Logout";
           var token = "";
           var name = "token" + "=";
           var decodedCookie = decodeURIComponent(document.cookie);
           var ca = decodedCookie.split(';');
           for(var i = 0; i <ca.length; i++) {
             var c = ca[i];
             while (c.charAt(0) === ' ') {
                 c = c.substring(1);
             }
             if (c.indexOf(name) === 0) {
                 token = c.substring(name.length, c.length);
             }
             console.log("token is " + token);
           }
           return "";
         }
         if (this.readyState === 4 && this.status === 400) {
           alert("Please try again!");
         }
         if (this.readyState === 4 && this.status === 404) {
           alert("Please try again!");
         }
       });

       xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/login");
       xhr.setRequestHeader("content-type", "application/json");
       xhr.setRequestHeader("cache-control", "no-cache");

       var sendObject=JSON.stringify({
         "username": this.state.username,
         "password": this.state.password
       });

       xhr.send(sendObject);
       event.preventDefault();
      }


      getCookie(cname) {
       var name = cname + "=";
       var decodedCookie = decodeURIComponent(document.cookie);
       var ca = decodedCookie.split(';');
       for(var i = 0; i <ca.length; i++) {
           var c = ca[i];
           while (c.charAt(0) === ' ') {
               c = c.substring(1);
           }
           if (c.indexOf(name) === 0) {
               return c.substring(name.length, c.length);
           }
       }
       return "";
   }

     render(){
       window.logtext="Logout";
       window.logswitch="true";

       return(
         <div className="logContainer">
           <div className="header">
             <center><h1> Login </h1></center>
           </div>
           <div className="RegistrationForm">
             <form onSubmit={this.handleSubmit}>
               <label>
                 <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
               </label>
               <label>
                 <input type="password" name="password" value={this.state.password}  onChange={this.handleChange} placeholder="Password" />
               </label>
               <div className="row">
                 <input name="submit" type="submit" value="Submit" />
               </div>
            </form>
          </div>
        </div>
       );
     }

   }
   function mapStateToProps(state){
     let isLoggedIn = true;
     if(state.login.username === ''){
       isLoggedIn = false;
     }
     return {
       username: state.login.username,
       isLoggedIn: isLoggedIn
     }
   }
   function matchDispatchToProps(dispatch){
     return bindActionCreators({loginUser: loginUser, logoutUser: logoutUser }, dispatch);

   }
   export default connect(mapStateToProps, matchDispatchToProps)(Login);
