import React, { Component } from 'react';
import AllCharts from './AllCharts'
import Transaction from './Transaction';
import Portfolio from './Portfolio'
import {connect} from 'react-redux';
import {buyCoins, sellCoins, initialize} from '../actions/portfolioAction.js';
import {getCoinValue} from '../library/utility.js';
import {COIN_LIST} from '../library/settings.js';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {


  constructor(props) {
      super(props);
      this.state={
          playMoney: 0,
          btcPrice: 0,
          ethPrice: 0,
          ltcPrice: 6,
          bchPrice: 0,
          btcCount: -1,
          ethCount:-1,
          ltcCount: 4,
          bchCount: -1,
          portfolio: 0
      }

      if(this.props.username!=="NO_USER"){
      this.getUserData();
      this.getCoinPrices();
    }

  }



  getUserData(){
    let Dashboard=this;
    var userRequest=new XMLHttpRequest();
    userRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/"+this.props.username);
    userRequest.onload=function(){

     var userData=JSON.parse(userRequest.responseText);
       console.log(typeof userData.portfolio);

      Dashboard.props.addCoinsToPortfolio(userData.portfolio);

    }

    userRequest.send();

  }



  getCoinPrices(){
    for(const coin of COIN_LIST){
    getCoinValue(coin, this.setState.bind(this));
  }

  }

  componentWillMount() {

      var xhr=new XMLHttpRequest();
      if(this.props.username!==""){
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
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
        <Transaction token={this.props.token}  portfolioData={this.state.portfolio.BTC}  />
        <AllCharts />
        <Portfolio usdCount = {this.state.playMoney} ltcCount={this.state.ltcCount} ethCount={this.state.ethCount}
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
        <Transaction/>
        <AllCharts />
        </div>

  )
}
  }
}
function mapStateToProps(state){
  return {
    username : state.login.username,
    coinList : state.coinList
  }

}
function matchDispatchToProps(dispatch){
  return bindActionCreators({buyCoins: buyCoins, sellCoins: sellCoins, addCoinsToPortfolio: initialize }, dispatch);

}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
