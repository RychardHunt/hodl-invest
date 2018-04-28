import React, { Component } from 'react';
 import './BuySellPanel.css'
 import Chart from './Chart.jsx'

class Charts extends Component{

  constructor(props){
    super(props);
    this.state={
      chartType: 'ETH'
    }
  }

 displayChart(coinName){
   this.setState({
    chartType: coinName
   }
   );
  }



render(){

  return(
    <div >
      <div class="tab">
        <button onClick={this.displayChart.bind(this, "ETH")}> ETH</button>
        <button  onClick={this.displayChart.bind(this, "BTC")}> BTC </button>
        <button onClick={this.displayChart.bind(this, "LTC")}> LTC </button>
        <button onClick={this.displayChart.bind(this, "BHC")}> BHC </button>

      </div>
      <Chart coin={this.state.chartType}/>


    </div>


  );
}


}
export default Charts;
