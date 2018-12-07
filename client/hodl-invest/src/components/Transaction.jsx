import React, {Component} from 'react';
import './Transaction.css';
import TransactionHistory from './TransactionHistory';
import BuySellPanel from "./BuySellPanel";
import {connect} from 'react-redux';

class Transaction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [] //Array of objects
    };
    console.log("Bitcoin value" + this.props.portfolio);

    this.getTransactions();
  }

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
      <BuySellPanel portfolio={this.props.portfolio} reloadTransactions={this.getTransactions.bind(this)}   updateState={this.props.updateState} />
      <TransactionHistory transactions={this.state.transactions}/>
    </div>)
  }
}
function mapStateToProps(state){
  return{
    username: state.username
  }
}

export default connect(mapStateToProps)( Transaction);
