import React, { Component } from 'react';
import Chart from './Chart';
import Transaction from './Transaction';

export default class Dashboard extends Component {
  render() {
    return (
      
        <div>
<Transaction/>
<Chart/>
                  </div>
     
    );
  }
}
