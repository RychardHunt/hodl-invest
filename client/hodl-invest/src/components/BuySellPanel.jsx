import React, {Component} from 'react';
import {connect} from 'react-redux';
import './BuySellPanel.css';
import {getCoinValue, validateInput} from '../library/utility.js';
import {buyCoins, sellCoins} from '../actions/portfolioAction';
import { bindActionCreators } from 'redux';
import {COIN_LIST} from '../library/settings';

class BuySellPanel extends Component {

  constructor(props) {
    super(props);

    let coin_price_dict = new Map();
    this.state = {
      coin_price_dict: coin_price_dict,
      isBuySelected: true,
      usdAmount: '0',
      coinAmount: '0',
      input: '',
      coinSelected: 'btc',
      btcPrice: 0,
      ethPrice: 0,
      ltcPrice: 0,
      bchPrice: 0,
      xrpPrice: 0,
      xlmPrice: 0
    };
    this.sendToServer = this.sendToServer.bind(this);
    this.getCoinValues();

  }


  getCoinValues() {
    let BuySellPanel = this;
    for (const coin of COIN_LIST) {

      const connect_url = "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/" + coin;
      fetch(connect_url).then(function(response) {
        response.text().then(function(text) {
          let coin_dict = BuySellPanel.state.coin_price_dict.set(coin, parseFloat(text));
          BuySellPanel.setState({coin_price_dict: coin_dict});
        });
      });
    }
  }



  coinToUsd(input, ticker) {

    if (input === '' || input === '.') {
      return '0';
    }
    let parsedInput = parseFloat(input);
    return '' + (
    parsedInput * this.state.coin_price_dict.get(ticker)).toFixed(2);
  }

  displayBuy() {
    this.setState({isBuySelected: true});
  }

  displaySell() {
    this.setState({isBuySelected: false, usdAmount: '0', coinSelected: 'btc'})
  }

  handleCoinSelect(event) {
    this.setState({
      usdAmount: this.coinToUsd(this.state.input, event.target.value),
      coinSelected: event.target.value

    });
  }

  handleInput(event) {
    let input = event.target.value;

    if (!validateInput(input)) {
      console.log("invalid");
      return
    }
    //Update state
    console.log("our amount is " + this.coinToUsd(input, this.state.coinSelected));
    this.setState({
      usdAmount: this.coinToUsd(input, this.state.coinSelected),
      input: input
    });
  }

  sendToServer(event) {
    event.preventDefault();
    let BuySellPanel = this;
    var buyOrSell;
    if (this.state.isBuySelected) {
      console.log("The event is buy");
      buyOrSell = "buy";
    } else {
      console.log("the event is sell")
      buyOrSell = "sell";
    }
    let data = JSON.stringify({"token": this.props.token, "username": this.props.username});

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    // var update=this.props.updateDashboard(BuySellPanel.state.isBuySelected, BuySellPanel.state.coinSelected);
    xhr.addEventListener("readystatechange", function() {
      console.log("Ready state "+ this.readyState+ " "+this.status);
      if (this.readyState === 4 && this.status === 500) {
        alert("Please click on a ticker from the drop down menu!");
      } else if (this.readyState === 4 && this.status === 400) {
        alert("Insufficient quantity available! Please lower order quantity!");
      } else if(this.readyState ===4  && this.status === 200){
        if(BuySellPanel.state.isBuySelected){
          BuySellPanel.props.buyCoins(BuySellPanel.state.coinSelected, parseInt(BuySellPanel.state.input));
        }
        else{
        BuySellPanel.props.sellCoins(BuySellPanel.state.coinSelected, parseInt(BuySellPanel.state.input));
      }
        // BuySellPanel.props.updateState(BuySellPanel.state.isBuySelected, BuySellPanel.state.coinSelected);
      }
      // BuySellPanel.props.reloadTransactions();
    });
    const connect_url = "https://hodl-invest-server.herokuapp.com/api/v1/users/" + buyOrSell + "/" + this.state.coinSelected + "/" + this.state.input;
    console.log(connect_url);
    xhr.open("POST", connect_url );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.send(data);


  }
  printStuff(e){
    e.preventDefault();
    console.log("aloha");
  }

  displayForm() {

    var userRequest = new XMLHttpRequest();
    userRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/" + this.props.username, false);

    userRequest.send();
    var Userdata = JSON.parse(userRequest.responseText);
    var ticker = this.state.coinSelected;
    var choices = [];
    for (const coin of COIN_LIST) {
      let upperCase = coin.toUpperCase();
      choices.push(<option key={coin} value={coin}>{upperCase}</option>);
    }
    let buttonLabel;
    let infoLine;
    if(this.state.isBuySelected){
      buttonLabel = "Buy"
      infoLine =<div> USD Available: {Math.round(Userdata.playMoney * 100) / 100}<br/></div>;
    }
    else{
      buttonLabel = "Sell"
      infoLine = <div> Coin Available: {Userdata.portfolio[this.state.coinSelected.toUpperCase()]}<br/></div>;

    }
      return( <form>
        Select coin:
        <select value={this.state.coinSelected} onChange={this.handleCoinSelect.bind(this)}>
          {choices}
        </select>
        {infoLine}
        Enter coin amount:
        <input value={this.state.Input} onChange={this.handleInput.bind(this)}/>
        <br/>
        Total cost: ${this.state.usdAmount}
        <br/>
        <button onClick={this.sendToServer}>{buttonLabel}</button>
      </form>
    );

    }


  render() {

    return (<div className="buy-sell-panel">
      <div className="tab">
        <button onClick={this.displayBuy.bind(this)}>Buy</button>
        <button onClick={this.displaySell.bind(this)}>Sell</button>
      </div>
      <div className="tabcontent">
        {this.displayForm()}
      </div>
    </div>)
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({buyCoins: buyCoins, sellCoins: sellCoins}, dispatch);
}
function mapStateToProps(state) {
  return {username: state.login.username, token: state.login.token, coinList: state.portfolio.coinList}
}
export default connect(mapStateToProps, matchDispatchToProps)(BuySellPanel);
