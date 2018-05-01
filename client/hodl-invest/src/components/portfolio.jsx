import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }

  getUserData(){
    // Ajax calls here
    this.setState({
      userData:{
        labels: ['USD', 'BTC', 'ETH', 'XLM', 'XRP'],
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
