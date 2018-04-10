import React, {Component} from 'react';
import './Registration.css';

class Registration extends Component{

  constructor(props) {
     super(props);
     this.state={username: ''}
     this.state={password: ''}
     this.state={confirmPassword: ''}
     this.state = {name: ''};
     this.state = {email: ''};
     this.state = {playMoney: ''};

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
     var name=event.target.name;
     this.setState({[name]: event.target.value});

   }

   handleSubmit(event) {
     var sendObject=JSON.stringify({
       "username": this.state.username,
       "passwordHash": this.state.password,
       "name": this.state.name,
       "email": this.state.email,
       "playMoney": this.state.playMoney,

     });
     console.log(sendObject);
     event.preventDefault();
   }



  render(){

    return(
      <div class="logContainer">
        <div class="header">
        <h1> Registration</h1>
          </div>
      <div class="RegistrationForm">
      <form onSubmit={this.handleSubmit}>
  <label>
    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeHolder="Username" />
  </label>
  <label>
    <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}placeholder="Password" />
  </label>
  <label>
    <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeHolder="Confirm Password" />
  </label>
  <label>
    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeHolder="Name" />
  </label>
  <label>
    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeHolder="Email" />
  </label>
  <label>
    <input type="text" name="playMoney" value={this.state.playMoney} onChange={this.handleChange} placeHolder="Initial Capital" />
  </label>
  <input type="submit" value="Submit" />
</form>
  </div>

  </div>
    );
  }

}
export default Registration;
