import React, {Component} from 'react';
import './Registration.css';

class Log extends Component{

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

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("response test\n" + this.responseText);
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
    console.log(sendObject);
    // window.location.href = './dashboard';
    event.preventDefault();
   }





  render(){

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
            <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}placeholder="Password" />
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
export default Log;
