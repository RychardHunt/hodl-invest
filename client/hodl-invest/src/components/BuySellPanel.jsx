import React, {Component} from 'react'
import './BuySellPanel.css'

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

class BuySellPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.getBtcValue();
  }

  static validateInput(input) {
    //Only numbers and periods
    for (let i = 0; i < input.length; ++i) {
      let currentChar = input.charAt(i);
      if (!((currentChar >= '0' && currentChar <= '9') || currentChar === '.')) {
        return false;
      }
    }
    //Only one period
    let hasPeriod = false;
    for (let i = 0; i < input.length; ++i) {
      let currentChar = input.charAt(i);
      if (currentChar === '.') {
        if (hasPeriod) {
          return false;
        } else {
          hasPeriod = true;
        }
      }
    }
    return true;
  }

  coinToUsd(input, ticker) {
    if (input === '' || input === '.') {
      return '0';
    }
    let parsedInput = parseFloat(input);
    if (ticker == "btc") {
      return '' + (
        (parsedInput * this.state.btcPrice).toFixed(2));
      } else if(ticker==="eth"){
        return '' + (
          (parsedInput * this.state.ethPrice).toFixed(2));
        }
        else if(ticker==="ltc"){
          return '' + (
            (parsedInput * this.state.ltcPrice).toFixed(2));
          }
          else if(ticker==="bch"){
            return '' + (
              (parsedInput * this.state.bchPrice).toFixed(2));
            }  else if(ticker==="xrp"){
              return '' + (
                (parsedInput * this.state.xrpPrice).toFixed(2));
              }else{
                return '' + (
                  (parsedInput * this.state.xlmPrice).toFixed(2));
                }
              }


              getBtcValue(){
                //Bitcoin Request
                let BuySellPanel=this;
                var btcRequest=new XMLHttpRequest();
                btcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/btc" );
                btcRequest.onload=function(){
                  console.log("We are here in BTC");
                  BuySellPanel.setState({
                    btcPrice: btcRequest.responseText
                  });
                }
                btcRequest.send();

                //  ETH request
                var ethRequest=new XMLHttpRequest();
                ethRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/eth" );
                ethRequest.onload=function(){
                  BuySellPanel.setState({
                    ethPrice: ethRequest.responseText
                  });
                }
                ethRequest.send();

                //LTC Request
                var ltcRequest=new XMLHttpRequest();
                ltcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/ltc" );
                ltcRequest.onload=function(){
                  BuySellPanel.setState({
                    ltcPrice: ltcRequest.responseText
                  });
                }
                ltcRequest.send();

                //BCH Request
                var bchRequest=new XMLHttpRequest();
                bchRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/bch" );
                bchRequest.onload=function(){
                  BuySellPanel.setState({
                    bchPrice: bchRequest.responseText
                  });
                }
                bchRequest.send();

                //XRPRequest
                var xrpRequest=new XMLHttpRequest();
                xrpRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/xrp" );
                xrpRequest.onload=function(){
                  BuySellPanel.setState({
                    xrpPrice: xrpRequest.responseText
                  });
                }
                xrpRequest.send();

                //XLM Request
                var xlmRequest=new XMLHttpRequest();
                xlmRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/xlm" );
                xlmRequest.onload=function(){
                  BuySellPanel.setState({
                    xlmPrice: xlmRequest.responseText
                  });
                  console.log("XLM is :" +xlmRequest.responseText);
                }
                xlmRequest.send();
              }

              displayBuy() {
                this.setState({isBuySelected: true});
              }

              displaySell() {
                this.setState({isBuySelected: false, usdAmount: '0', input: '', coinSelected: 'btc'})
              }

              handleCoinSelect(event) {
                this.setState({
                  usdAmount: this.coinToUsd(this.state.input, event.target.value),
                  coinSelected: event.target.value

                });
              }

              handleInput(event) {
                let input = event.target.value;

                if (!BuySellPanel.validateInput(input)) {
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

                xhr.addEventListener("readystatechange", function() {
                  if (this.readyState === 4 && this.status === 500) {
                    alert("Please actually click on a ticker from the drop down menu!");
                  }
                  if (this.readyState === 4 && this.status === 400) {
                    alert("Insufficient coins! Please lower order quantity!");
                  }
                });

                xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/" + buyOrSell + "/" + this.state.coinSelected + "/" + this.state.input);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Cache-Control", "no-cache");

                xhr.send(data);
                event.preventDefault();
                sleep(500);
                this.props.reloadTransactions();
              }

              displayForm() {
                if (this.state.isBuySelected) {
                  return <form>
                  Select coin:
                  <select value={this.state.coinSelected} onChange={this.handleCoinSelect.bind(this)}>
                  <option value="btc">BTC</option>
                  <option value="eth">ETH</option>
                  <option value="ltc">LTC</option>
                  <option value="bch">BCH</option>
                  <option value="xrp">XRP</option>
                  <option value="xlm">XLM</option>
                  </select>
                  <br/>
                  Enter coin amount:
                  <input value={this.state.Input} onChange={this.handleInput.bind(this)}/>
                  <br/>
                  Total cost: ${this.state.usdAmount}
                  <br/>
                  <button onClick={this.sendToServer.bind(this)}>Buy</button>
                  </form>
                } else {
                  return <form>
                  Select coin:
                  <select value={this.state.coinSelected} onChange={this.handleCoinSelect.bind(this)}>
                  <option value="eth">ETH</option>
                  <option value="btc">BTC</option>
                  <option value="ltc">LTC</option>
                  <option value="bch">BCH</option>
                  <option value="xrp">XRP</option>
                  <option value="xlm">XLM</option>
                  </select>
                  <br/>
                  Enter coin amount:
                  <input value={this.state.input} onChange={this.handleInput.bind(this)}/>
                  <br/>
                  Total value: ${this.state.usdAmount}
                  <br/>
                  <button onClick={this.sendToServer.bind(this)}>Sell</button>
                  </form>
                }
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

            export default BuySellPanel;
