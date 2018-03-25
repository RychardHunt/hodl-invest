import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';

var url = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10'

function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var json_obj = JSON.parse(Get(url));

var timeArray = [];
var priceArray = [];

for (var time in json_obj) {
  if (json_obj.hasOwnProperty(time)) {
    var val = json_obj[time];
    timeArray.push(val);
  }
}

for (var open in json_obj) {
  if (json_obj.hasOwnProperty(open)) {
    var val = json_obj[open];
    priceArray.push(val);
  }
}

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
        labels: timeArray,
        datasets:[
          {
            label:'Price',
            data:priceArray,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Your Hodl Invest Portfolio</h2>
        </div>
        <Chart chartData={this.state.chartData} location="" legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;
