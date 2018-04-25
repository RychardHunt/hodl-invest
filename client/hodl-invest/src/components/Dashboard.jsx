import React, { Component } from 'react';
import Chart from './Chart';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import Transaction from './Transaction';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Transaction token={this.props.token} username={this.props.username} />
        <Chart token={this.props.token} username={this.props.username} />
        <Chart2 token={this.props.token} username={this.props.username} />
        <Chart3 token={this.props.token} username={this.props.username} />
        <Chart4 token={this.props.token} username={this.props.username} />
      </div>
    );
  }
}

export default Dashboard;
