import React, { Component } from 'react';
import Chart from './Chart';
import Transaction from './Transaction';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Transaction token={this.props.token} username={this.props.username}/>
        <Chart/>
      </div>
    );
  }
}

export default Dashboard;
