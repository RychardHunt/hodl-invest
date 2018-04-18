import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Registration from './components/Registration'
import Dashboard from './components/Dashboard'
import NavigationBar from './components/NavigationBar'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: ''
    }
  }

 updateState(_token, _username) {
    this.setState({
      token: _token,
      username: _username
    })
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path ="/" component={Home} />
          <Route path ="/login" render={()=><Login updateState={this.updateState.bind(this)} />} />
          <Route path ="/register" component={Registration} />
          <Route path ="/about" component={About} />
          <Route path ="/dashboard" render={()=><Dashboard token={this.state.token} username={this.state.username} />} />
        </div>
      </Router>
    );
  }
}

export default App;
