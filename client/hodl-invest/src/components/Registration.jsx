import React, {Component} from 'react';
import './Registration.css';

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.state = {
      password: ''
    }
    this.state = {
      confirmPassword: ''
    }
    this.state = {
      name: ''
    };
    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    var pass=this.state.password;
    var user=this.state.username;
    var name=this.state.name;
    var em=this.state.email;
    if((pass===''||user==='')||(name===''||em==='')){
      alert("Invalid registration! Please fill all fields!")
    } else {
      if (user.length<8){
        alert("Username needs to be longer than 8 characters!");
      } else {
        if (pass.length<8){
          alert("Password needs to be longer than 8 characters!");
        } else {
          var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
          if(!re.test(em)){
            alert("Please enter a legitimate email!");
          } else {
            if (this.state.password === this.state.confirmPassword) {
              var xhr = new XMLHttpRequest();

              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200) {
                  // alert("Welcome to Hodl Invest, " + name + "! Please login!");
                  window.location.href = './login';
                }

                if (this.readyState === 4 && this.status === 400) {
                  alert("Invalid registration! Please register again!")
                }
              });

              xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/");
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("cache-control", "no-cache");

              var sendObject = JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
                "name": this.state.name,
                "email": this.state.email
              });

              xhr.send(sendObject);
            } else{
              alert("Password and Confirm Password do not match! Please try again!");
            }
          }
        }
      }
    }
    event.preventDefault();
  }

  render() {

    return (
      <div className="logContainer">
        <div className="header">
          <h1>
            Registration</h1>
        </div>
      <div className="RegistrationForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username"/>
          </label>
          <label>
            <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </label>
          <label>
            <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Confirm Password"/>
          </label>
          <label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
          </label>
          <label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>)
  }

}
export default Registration;
