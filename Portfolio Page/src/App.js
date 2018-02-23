import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';

class App extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ['BTC', 'ETH', 'LTC', 'XLM', 'XRP', 'ARK'],
        datasets:[
            ]
          }

      }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to You Hodl Invest Portfolio</h2>
        </div>
        <Chart chartData={this.state.chartData} location="" legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;
