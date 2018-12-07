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
      usdCount: this.props.usdCount,
      btcCount:this.props.btcCount,
      ltcCount: this.props.ltcCount,
      ethCount: this.props.ethCount,
      bchCount:this.props.bchCount

    }


  }


  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }


  getUserData(){
    var labels=[];
    var amounts=[]
    if(this.state.usdCount!==0){
      labels.push('USD');
      amounts.push(this.state.usdCount);
    }
  if(this.state.btcCount!==0){
    labels.push('BTC');
    amounts.push( this.state.btcCount*this.state.btcPrice);
  }
  if(this.state.ethCount!==0){
    labels.push('ETH');
    amounts.push( this.state.ethCount*this.state.ethPrice);
  }
  if(this.state.ltcCount!==0){
    labels.push('LTC');
    amounts.push( this.state.ltcCount*this.state.ltcPrice);
  }
  if(this.state.bchCount!==0){
    labels.push('BCH');
    amounts.push( this.state.bchCount*this.state.bchPrice);
  }


    this.setState({
      userData:{
        labels: labels,
        datasets:[
          {
            label:'Price',
            data:amounts, //sample numbers waiting to connect to database
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
