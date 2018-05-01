import React, { Component } from 'react';
import Chart from './Chart';
import Charts from './Charts'
import Transaction from './Transaction';
import Portfolio from './Portfolio'

class Dashboard extends Component {

  constructor(props) {
      super(props);
  }

  componentWillMount() {
      if(this.props.username!==""){
        var xhr = new XMLHttpRequest();
        var userData=null;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
            userData=JSON.parse(this.responseText)
            console.log("Play money is "+userData.playMoney);
          }
        });

        xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/"+this.props.username);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send();
      }
  }

  render() {
    return (
      <div>
        <center> <h1>{this.props.username} Dashboard </h1> </center>
        <Transaction token={this.props.token} username={this.props.username} />
        <Charts />

      </div>
    );
  }
}

export default Dashboard;
