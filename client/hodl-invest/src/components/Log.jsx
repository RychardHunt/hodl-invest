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
           xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/");
           xhr.setRequestHeader("content-type", "application/json");
           xhr.setRequestHeader("cache-control", "no-cache");var sendObject = JSON.stringify({"username": this.state.username, "passwordHash": this.state.password, "name": this.state.name, "email": this.state.email});



     var sendObject=JSON.stringify({
       "username": this.state.username,
       "password": this.state.password


     });
     xhr.send(sendObject);
     console.log(sendObject);
     event.preventDefault();

   }





  render(){

    return(
      <div class="logContainer">
        <div class="header">
        <h1> Log  In </h1>
          </div>
      <div class="RegistrationForm">
      <form onSubmit={this.handleSubmit}>
  <label>
    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeHolder="Username" />
  </label>
  <label>
    <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}placeholder="Password" />
  </label>
  <div class="row">
  <input name="submit" type="submit" value="Submit" />

  </div>
</form>
  <button onClick={this.props.myClick}> or Register</button>
  </div>

  </div>
    );
  }

}
export default Log;
