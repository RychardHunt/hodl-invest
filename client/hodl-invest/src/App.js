import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import NavigationBar from './components/NavigationBar'
import Transaction from './components/Transaction'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
            <Transaction transactionHistoryURL={'https://hodl-invest-server.herokuapp.com/api/v1/users/zoro/transactions'}/>
        </div>
      </Router>
    );
  }
}

export default App;
