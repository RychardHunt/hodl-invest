import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Registration from './components/Registration'
import Login from './components/Login'
import NavigationBar from './components/NavigationBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route exact path ="/" component={Home} />
          <Route path ="/registration" component={Registration} />
          <Route path ="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
