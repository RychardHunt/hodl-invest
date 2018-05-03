import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
      btcPrice: this.props.btcPrice,
      ethPrice: this.props.ethPrice,
      ltcPrice: this.props.ltcPrice ,
      bchPrice: this.props.bchPrice,
      btcCount:this.props.btCount,
      ltcCount: this.props.ltcCount,
      ethCount: this.props.ethCount,
      bchCount:this.props.bchCount

    }
    console.log("BTC Price: "+this.props.btcPrice);
    console.log("Eth Count "+this.props.ethCount);


  }


  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }
//   getCoinPrices(){
//     let Portfolio=this;
//     console.log("We are in coin prices");
//
//     //btc request
//   var btcRequest=new XMLHttpRequest();
//
//   btcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/btc");
//   btcRequest.onload=function(){
//     Portfolio.setState({
//     btcPrice: btcRequest.responseText
//   });
//   }
//   btcRequest.send();
//
//   //eth request
// var ethRequest=new XMLHttpRequest();
// ethRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/eth");
// ethRequest.onload=function(){
//   Portfolio.setState({
//   ethPrice:ethRequest.responseText
// });
//
// }
// ethRequest.send();
//
// //ltc request
// var ltcRequest=new XMLHttpRequest();
// ltcRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/ltc");
// ltcRequest.onload=function(){
//   Portfolio.setState({
//   ltcPrice: ltcRequest.responseText
// });
//
// }
// ltcRequest.send();
//
// //bch request
// var bchRequest=new XMLHttpRequest();
// bchRequest.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/bch");
// bchRequest.onload=function(){
//   Portfolio.setState({
//   bchPrice: bchRequest.responseText
// });
// }
// bchRequest.send();
//
//   }
  getDerivedStateFromProps(nextProps, prevState){
    this.setState({
      btcPrice: this.nextProps.btcPrice,
      ethPrice: this.nextProps.ethPrice,
      ltcPrice: this.nextProps.ltcPrice ,
      bchPrice: this.nextProps.bchPrice,
      btcCount:this.nextProps.btCount,
      ltcCount: this.nextProps.ltcCount,
      ethCount: this.nextProps.ethCount,
      bchCount:this.nextProps.bchCount

    });

  }

  getUserData(){


    this.setState({
      userData:{
        labels: ['USD', 'BTC', 'ETH', 'LTC', 'BCH'],
        datasets:[
          {
            label:'Price',
            data:[this.props.playMoney, this.state.btcCount*this.state.btcPrice,
               this.state.ethCount*this.state.ethPrice,this.state.ltcCount*this.state.ltcPrice,
                this.state.bchCount*this.state.bchPrice], //sample numbers waiting to connect to database
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
    console.log("LTC value Portfolio" +this.state.ltcPrice);
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
