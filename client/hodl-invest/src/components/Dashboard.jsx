import React, { Component } from 'react';
import Chart from './Chart';
import Transaction from './Transaction';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Transaction/>
        <Chart/>
      </div>
    );
  }
}

export default Dashboard;
