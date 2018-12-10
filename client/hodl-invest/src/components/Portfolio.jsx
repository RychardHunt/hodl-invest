import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {getCoinValue} from '../library/utility.js';
import {COIN_LIST} from '../library/settings.js';

class Chart extends Component{

  constructor(props){
    super(props);
    // this.getCoinPrices();
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }



  render(){
    var labels=[];
    var amounts=[]
    for(const coin in this.props.coinList){
      if(coin!==0){
        labels.push([coin]);
        amounts.push(this.props.coinPrices[coin.toLowerCase()]*this.props.coinList[coin]);
      }
    }

    let userData = {
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
    return (
      <div className="chart">
        <Pie
          data={userData}
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
function mapStateToProps(state){
  return{
    coinList : state.portfolio.coinList,
    coinPrices : state.coinData.coinPriceList
  }
}

export default connect(mapStateToProps)(Chart);
