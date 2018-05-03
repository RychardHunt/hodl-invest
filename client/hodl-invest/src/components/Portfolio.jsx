import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
      btcPrice: 0,
      ethPrice: 0,
      ltcPrice: 0,
      bchPrice: 0,
    }
    console.log("We are in the constructor");
    this.getCoinPrices();
  }


  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }
  getCoinPrices(){
    console.log("We are in coin prices");

    //btc request
    var btcRequest=new XMLHttpRequest();

    btcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/btc");
    btcRequest.onload=function(){
      this.setState({
        btcPrice: btcRequest.responseText
      });
    }
    btcRequest.send();

    //eth request
    var ethRequest=new XMLHttpRequest();
    ethRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/eth");
    ethRequest.onload=function(){
      this.setState({
        ethPrice:ethRequest.responseText
      });

    }
    ethRequest.send();

    //ltc request
    var ltcRequest=new XMLHttpRequest();
    ltcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/ltc");
    ltcRequest.onload=function(){
      this.setState({
        ltcPrice: ltcRequest.responseText
      });

    }
    ltcRequest.send();

    //bch request
    var bchRequest=new XMLHttpRequest();
    bchRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/bch");
    bchRequest.onload=function(){
      this.setState({
        bchPrice: bchRequest.responseText
      });
    }
    bchRequest.send();

  }

  getUserData(){
    // Ajax calls here
    this.setState({
      userData:{
        labels: ['USD', 'BTC', 'ETH', 'LTC', 'BCH'],
        datasets:[
          {
            label:'Price',
            data:[10000, 9932, 1353, 0, 0], //sample numbers waiting to connect to database
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

  componentWillMount(){
    this.getUserData();
  }

  render(){
    return (
      <div className="chart">
      <Pie
      data={this.state.userData}
      options={{
        title:{
          display:this.props.displayTitle,
          text:'Portfolio test for User',
          fontSize:25
        },
        legend:{
          display:this.props.displayLegend,
          position:this.props.legendPosition
        }
      }}
      />
      </div>
    )
  }
}

export default Chart;
