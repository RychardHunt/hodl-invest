import React, {Component} from 'react'
import './Transaction.css'
import TransactionHistory from './TransactionHistory'
import BuySellPanel from "./BuySellPanel";

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.getTransactions();
        this.state = {
            transactions: []//Array of objects
        }
    }

    getTransactions() {
        let transaction = this;
        let username = 'zoro';
        let url = 'https://hodl-invest-server.herokuapp.com/api/v1/users/' + username + '/transactions';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.addEventListener('readystatechange',function () {
            if (this.readyState === 4) {
                transaction.setState ({
                    transactions: JSON.parse(this.responseText)//An array of objects
                });
            }
        });
        xhr.send();
    }

    render() {
        return (
            <div className="transaction">
                <BuySellPanel/>
                <TransactionHistory transactions={this.state.transactions}/>
            </div>
        )
    }
}

export default Transaction;
