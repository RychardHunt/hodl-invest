import React, { Component } from 'react';
import Chart from './Chart';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import Transaction from './Transaction';

class Dashboard extends Component {
  render() {
    return (

      <div>
        <Transaction/>

        <Chart/>
          <Chart2/>
          <Chart3/>
          <Chart4/>
      </div>
    );
  }
}

export default Dashboard;
