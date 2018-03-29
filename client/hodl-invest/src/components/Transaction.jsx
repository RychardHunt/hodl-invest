import React, {Component} from 'react'
import './Transaction.css'
import TransactionHistory from './TransactionHistory'
import BuySellPanel from "./BuySellPanel";

export default class Transaction extends Component {
    render() {
        return (
            <div>
                <BuySellPanel/>
                <TransactionHistory transactionArray={[{date:"april",amount:"400"},{date:"august",amount:"300"}]}/>
            </div>
        )
    }
}