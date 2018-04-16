import React, {Component} from 'react'
import './TransactionHistory.css'
import tinyDate from 'tinydate'

/*
This handles the transaction history chart only.
The transactionArray is an array of objects with date and amount properties.  They should be strings.

TODO:
    Refresh
    Limit number of transactions visible
    Button to expand transaction list
 */
export default class TransactionHistory extends Component {
    constructor(props) {
        super(props);
    }

    static renderSingleTransaction(date,ticker,price,time) {
        return <tr>
            <th>{date}</th>
            <th>{time}</th>
            <th>{ticker}</th>
            <th>${price}</th>
        </tr>
    }



    renderTransactions() {
        if(this.props.transactionArray === null || this.props.transactionArray.length === 0) {
            return <p>Nothing here!</p>
        } else {
            let renderedTransactionsArray = [];
            for(let i = 0;i < this.props.transactionArray.length ; ++i) {
                let stamp = tinyDate('{MM}/{DD}/{YY}');
                let currentTransaction = this.props.transactionArray[i];
                let temp = currentTransaction.timestamp;
                let date = stamp(new Date(temp));
                stamp = tinyDate('{HH}:{MM}');
                let time = stamp(new Date(temp));
                let ticker;
                let price;
                if(typeof currentTransaction.cryptocoin !== 'undefined') {
                    ticker = currentTransaction.cryptocoin.ticker;
                    price = currentTransaction.cryptocoin.price;
                }
                renderedTransactionsArray.push(TransactionHistory.renderSingleTransaction(date,ticker,price,time));
            }
            return renderedTransactionsArray;
        }
    }

    render() {
        return (
            <div className="transaction-history" >
                <h1>Transaction History</h1>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Crypto</th>
                        <th>USD</th>
                    </tr>
                    {this.renderTransactions()}
                </table>
            </div>
        )
    }
}