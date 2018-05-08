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
    var labels=[];
    var amounts=[]
    if(this.state.playMoney!==0){
      labels.push('USD');
      amounts.push( this.state.playMoney);
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
