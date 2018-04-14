import React, {Component} from 'react'
import './Transaction.css'
import TransactionHistory from './TransactionHistory'
import BuySellPanel from "./BuySellPanel";

class Transaction extends Component {
    render() {
        var username="zoro";
        var userinfo;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/"+username,true);
        xhr.send();
        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
	        userinfo=JSON.parse(this.responseText);
		    console.log(userinfo.transactions);

         }
                });

        return (
            <div className="transaction">
                <BuySellPanel/>
                <TransactionHistory transactionArray={[{amount: "$30", date: "yesterday"}]}/>
            </div>
        )
    }
}

export default Transaction;
