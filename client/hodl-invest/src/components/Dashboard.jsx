import React, { Component } from 'react';
import Chart from './Chart';
import AllCharts from './AllCharts'
import Transaction from './Transaction';
import Portfolio from './Portfolio'

class Dashboard extends Component {


  constructor(props) {
      super(props);
      this.state={
          playMoney: 0,
          btcPrice: 0,
          ethPrice: 0,
          ltcPrice: 0,
          bchPrice: 0,
          btcCount: -1,
          ethCount:-1,
          ltcCount:-1,
          bchCount: -1,
          portfolio: 0
      }

      if(this.props.username!=""){
      this.getUserData();
      this.getCoinPrices();
    }

  }

  updateState(_isBuy, _coin) {
    if(_coin==="BTC"){
        if(_isBuy){
      this.setState({
        btcCount: this.state.btcCount+1
      });
    }
    else{
      this.setState({
        btcCount: this.state.btcCount-1
      });
    }
    }
    if(_coin==="ETH"){
        if(_isBuy){
      this.setState({
        ethCount: this.state.ethCount+1
      });
    }
    else{
      this.setState({
        ethCount: this.state.ethCount-1
      });
    }
    }
    if(_coin==="LTC"){
        if(_isBuy){
      this.setState({
        ltcCount: this.state.ltcCount+1
      });
    }
    else{
      this.setState({
        ltcCount: this.state.ltcCount-1
      });
    }
    }
    if(_coin==="BCH"){
        if(_isBuy){
      this.setState({
        ltcCount: this.state.bchCount+1
      });
    }
    else{
      this.setState({
        ltcCount: this.state.bchCount-1
      });
    }
    }
   }
  getUserData(){
    let Dashboard=this;
    var userRequest=new XMLHttpRequest();
    userRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/"+this.props.username);
    userRequest.onload=function(){
     var userData=JSON.parse(userRequest.responseText);
      Dashboard.setState({
        playMoney: userData.playMoney,
        btcCount: userData.portfolio.BTC,
        ethCount: userData.portfolio.ETH,
        ltcCount: userData.portfolio.LTC,
        bchCount: userData.portfolio.BCH,
        portfolio: userData.portfolio

      });
          console.log("Count "+Dashboard.state.ltcCount);
    }

    userRequest.send();

  }

  getCoinPrices(){
    //btc request
  var btcRequest=new XMLHttpRequest();
let Dashboard=this;

  btcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/btc");
  btcRequest.onload=function(){
    Dashboard.setState({
    btcPrice: btcRequest.responseText
  });
  }
  btcRequest.send();

  //eth request
var ethRequest=new XMLHttpRequest();
ethRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/eth");
ethRequest.onload=function(){
  Dashboard.setState({
  ethPrice:ethRequest.responseText
});

}
ethRequest.send();

//ltc request
var ltcRequest=new XMLHttpRequest();
ltcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/ltc");
ltcRequest.onload=function(){
  Dashboard.setState({
      ltcPrice: ltcRequest.responseText
});

}
ltcRequest.send();

//bch request
var bchRequest=new XMLHttpRequest();
bchRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/bch");
bchRequest.onload=function(){
  Dashboard.setState({
  bchPrice: bchRequest.responseText
});
}
bchRequest.send();

  }

  componentWillMount() {

      var xhr=new XMLHttpRequest();
      if(this.props.username!==""){
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);

          //  console.log("Play money is "+userData.playMoney);
          }
        });

        xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/"+this.props.username);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send();
      }
  }

  render() {
    if(this.props.username!==""&&(this.state.ltcPrice!==0&&this.state.btcPrice!==0&&this.state.ltcCount!==-1
    &&this.state.bchPrice!==0&&this.state.ethCount!==-1)&&this.state.ethPrice!==0){
    return (
      <div>
        <center> <h1>{this.props.username} Dashboard </h1> </center>
        <Transaction token={this.props.token} username={this.props.username} portfolioData={this.state.portfolio.BTC} updateState={this.updateState.bind(this)} />
        <AllCharts />
        <Portfolio ltcCount={this.state.ltcCount} ethCount={this.state.ethCount}
          btcCount={this.state.btcCount} bchCount={this.state.bchCount}
          btcPrice={this.state.btcPrice}   ethPrice={this.state.ethPrice}
          ltcPrice={this.state.ltcPrice} bchPrice={this.state.bchPrice}
          />
      </div>
    );
  }
  else{
  return(
    <div>
      <center> <h1>{this.props.username} Dashboard </h1> </center>
        <Transaction token={this.props.token} username={this.props.username} updateState={this.updateState.bind(this)} />
        <AllCharts />
        </div>

  )
}
  }
}

export default Dashboard;
