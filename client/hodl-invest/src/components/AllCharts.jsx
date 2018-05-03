import React, {Component} from 'react';
import './BuySellPanel.css'
import Chart from './Chart.jsx'

class AllCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartType: 'BTC'
    }
  }

  displayChart(coinName) {
    this.setState({chartType: coinName});
  }

  render() {
    return (<div >
      <div className="tab">
        <button onClick={this.displayChart.bind(this, "BTC")}>
          BTC
        </button>
        <button onClick={this.displayChart.bind(this, "ETH")}>
          ETH
        </button>
        <button onClick={this.displayChart.bind(this, "LTC")}>
          LTC
        </button>
        <button onClick={this.displayChart.bind(this, "BCH")}>
          BCH
        </button>
        <button onClick={this.displayChart.bind(this, "XRP")}>
          XRP
        </button>
        <button onClick={this.displayChart.bind(this, "XLM")}>
          XLM
        </button>
      </div>
      <Chart coin={this.state.chartType}/>
    </div>);
  }

}
export default AllCharts;
