import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class Portfolio extends Component{
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
    console.log("USD AMOUNT: "+this.props.playMoney);
    console.log("BTC AMOUNT: "+this.props.btCount);
    console.log("ET AMOUNT: "+this.props.ethCount);
    console.log("LTC AMOUNT: "+this.props.ltcCount);
    console.log("BCH AMOUNT: "+this.props.bchCount);


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
    var amounts=[1,1,1,1,1]
    if(this.state.playMoney!==undefined){
      labels.push('USD');
      amounts[0] = ( this.state.playMoney);
    }
  if(this.state.btcCount!==undefined){
    labels.push('BTC');
    amounts[1] = ( this.state.btcCount*this.state.btcPrice);
  }
  if(this.state.ethCount!==undefined){
    labels.push('ETH');
    amounts[2]=( this.state.ethCount*this.state.ethPrice);
  }
  if(this.state.ltcCount!==undefined){
    labels.push('LTC');
    amounts[3]=( this.state.ltcCount*this.state.ltcPrice);
  }
  if(this.state.bchCount!==undefined){
    labels.push('BCH');
    amounts[4]=( this.state.bchCount*this.state.bchPrice);
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

export default Portfolio;
