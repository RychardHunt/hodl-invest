import React, {Component} from 'react'
import './TransactionHistory.css'
import tinydate from 'tinydate'

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []//Array of elements
        };
    }

    renderTransactions() {
        let transactions = this.props.transactions;
        let transactionArray = [];

        for(let i = 0; i < transactions.length; ++i) {
            let currentTransaction = transactions[i];

            //Money handling
            let coin = currentTransaction.cryptocoin.ticker;
            let coinAmount = currentTransaction.cryptocoin.price;
            let usdAmount = currentTransaction.amount;
            let transactionType = currentTransaction.transactionType;
            if(transactionType === 'BUY') {
                coinAmount = '+' + coinAmount + ' ' + coin.toUpperCase();
                usdAmount = '-$' + usdAmount;
            } else {
                coinAmount = '-' + coinAmount + ' ' + coin.toUpperCase();
                usdAmount = '+$' + usdAmount;
            }

            //Time handling
            let timeStamp = currentTransaction.timestamp;
            let stamp = tinydate('{MM}/{DD}/{YY}');
            let dateObject = new Date(timeStamp);
            let date = stamp(dateObject);
            stamp = tinydate('{HH}:{mm}');
            let time = stamp(dateObject);
            transactionArray.push(TransactionHistory.getTransactionRow(coinAmount,usdAmount,date,time))
        }
        return transactionArray;
    }

    static getTransactionRow(coinAmount,usdAmount,date,time) {
        return <tr><th>{date}</th><th>{time}</th><th>{coinAmount}</th><th>{usdAmount}</th></tr>
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

export default TransactionHistory;
