import React, {Component} from 'react'
import './TransactionHistory.css'

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
        this.state = {
            transactionArray : this.props.transactionArray
        }
    }

    static renderSingleTransaction(transactionObject) {
        return <tr>
            <th>{transactionObject.date}</th>
            <th>{transactionObject.amount}</th>
        </tr>
    }



    renderTransactions() {
        if(this.state.transactionArray === null || this.state.transactionArray.length === 0) {
            return <p>Nothing here!</p>
        } else {
            let renderedTransactionsArray = [];
            for(let i = 0;i < this.state.transactionArray.length ; ++i) {
                let currentTransaction = this.state.transactionArray[i];
                renderedTransactionsArray.push(TransactionHistory.renderSingleTransaction(currentTransaction));
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
                        <th>Amount</th>
                    </tr>
                    {this.renderTransactions()}
                </table>
            </div>
        )
    }
}