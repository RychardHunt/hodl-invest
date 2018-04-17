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

    if (this.state.password === this.state.confirmPassword) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log("User has successfully been registered.");
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
      alert("Username and Password do not match! Please try again!");
    }
    console.log(sendObject);
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
