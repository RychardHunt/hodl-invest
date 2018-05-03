import React, {Component} from 'react';
import './Transaction.css';
import TransactionHistory from './TransactionHistory';
import BuySellPanel from "./BuySellPanel";

class Transaction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [] //Array of objects
    };
    console.log("Bitcoin value" + this.props.portfolio);

    this.getTransactions();
  }

  // updateDashboard(_isBuy, _coin) {
  //   this.props.updateState(_isBuy, _coin);
  // }

  // updateToken(_token, _coin) {
  //   let transact = this;
  //   transact.props.updateState(true, "btc");
  //  }

  getTransactions() {
    let transaction = this;
    let username = this.props.username;
    let url = 'https://hodl-invest-server.herokuapp.com/api/v1/users/' + username + '/transactions';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        transaction.setState({
          transactions: JSON.parse(this.responseText) //An array of objects
        });
      }
    });
    xhr.send();
  }

  render() {
    return (<div className="transaction">
      <BuySellPanel portfolio={this.props.portfolio} reloadTransactions={this.getTransactions.bind(this)} token={this.props.token} username={this.props.username} updateState={this.props.updateState} />
      <TransactionHistory transactions={this.state.transactions}/>
    </div>)
  }
}

export default Transaction;
