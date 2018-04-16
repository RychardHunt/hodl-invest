import React, {Component} from 'react'
import './Transaction.css'
import TransactionHistory from './TransactionHistory'
import BuySellPanel from "./BuySellPanel"
import request from 'request'



export default class Transaction extends Component {
    constructor (props) {
        super(props);
        this.getTransactions();
        this.state = {
            transactions : [{amount: "$30", date: "yesterday"}]
        }
    }

    getTransactions() {
        let url = this.props.transactionHistoryURL;

        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                // data is already parsed as JSON:
                this.setState ({
                    transactions : data
                })
            }
        });
    }

    render() {
        return (
            <div className="transaction">
                <BuySellPanel transactionURL={this.props.transactionHistoryURL}/>
                <TransactionHistory transactionArray={this.state.transactions}/>
            </div>
        )
    }
}