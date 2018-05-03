import React, { Component } from 'react';
import Chart from './Chart';
import AllCharts from './AllCharts';
import Transaction from './Transaction';
import Portfolio from './Portfolio';

class Dashboard extends Component {


  constructor(props) {
      super(props);
      this.state={
          playMoney: 0,
          btcPrice: 0,
          ethPrice: 0,
          ltcPrice: 0,
          bchPrice: 0,
          btcCount: 0,
          ethCount:0,
          ltcCount:0,
          bchCount: 0,
          portfolio: 0
      }
      if(this.props.username!=""){
      this.getUserData();
    }
  }

  updateState(_playMoney, _btcCount, _ethCount, _ltcCount, _bchCount) {
     this.setState({
       playMoney: _playMoney,
       btcCount: _btcCount,
       ethCount: _ethCount,
       ltcCount: _ltcCount,
       bchCount: _bchCount
     });
   }

  getUserData(){
    let Dashboard=this;
    var userRequest=new XMLHttpRequest();
    userRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/"+this.props.username);
    userRequest.onload=function(){
     var userData=JSON.parse(userRequest.responseText);
     console.log("UserData type "+typeof(userData) );
     console.log("Porfolio type contents "+userData.portfolio.XRP);


      Dashboard.setState({
        playMoney: userData.playMoney,
        portfolio: userData.portfolio
      });
    //  console.log("Dashboard Portfolio "+ userData.portfolio);
    }
    userRequest.send();

  }

  getCoinPrices(){
    //btc request
  var btcRequest=new XMLHttpRequest();

  btcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/btc");
  btcRequest.onload=function(){
    this.setState({
    btcPrice: btcRequest.responseText
  });
  }
  btcRequest.send();

  //eth request
var ethRequest=new XMLHttpRequest();
ethRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/eth");
ethRequest.onload=function(){
  this.setState({
  ethPrice:ethRequest.responseText
});

}
ethRequest.send();

//ltc request
var ltcRequest=new XMLHttpRequest();
ltcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/ltc");
ltcRequest.onload=function(){
  this.setState({
  ltcPrice: ltcRequest.responseText
});

}
ltcRequest.send();

//bch request
var bchRequest=new XMLHttpRequest();
bchRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/bch");
bchRequest.onload=function(){
  this.setState({
  bchPrice: bchRequest.responseText
});
}
bchRequest.send();

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
        <Transaction token={this.props.token} username={this.props.username} portfolioData={this.state.portfolio} />
        <AllCharts />

      </div>
    );
  }
}

export default Dashboard;
