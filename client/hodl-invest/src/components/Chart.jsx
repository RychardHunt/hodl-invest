import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

var url = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=3'

function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var json_obj = JSON.parse(Get(url)); //This object holds the result of the get request

var timesArr = [];
var unixArr = [];
var opensArr = [];

var data = json_obj.Data;
console.log(data);

for(var i = 0; i < data.length; i++) {
    var obj = data[i];
    var date = new Date((obj.time)*1000);
    var formattedDate = (date.getUTCMonth() + 1)+'-'+date.getUTCDate()+'-'+date.getUTCFullYear();
    timesArr.push(formattedDate);
    opensArr.push(obj.open);
}

var userDataURL = "";

// let token = this.props.token;
// let username = this.props.username;

var userids = "";

try {
  userids = JSON.stringify({
              "token": this.props.token,
              "username": this.props.username
          });
  userDataURL = "https://hodl-invest-server.herokuapp.com/api/v1/users/" + userids.username
}
catch(err) {
  //giving default user
  userDataURL = "https://hodl-invest-server.herokuapp.com/api/v1/users/zoro"
}


function Get(userDataURL){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",userDataURL,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var json_obj = JSON.parse(Get(userDataURL));

var userPlayMoney = json_obj.playMoney;
// var userBTC = json_obj.portfolio

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    coin:'BTC'
  }

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: timesArr,
        datasets:[
          {
            borderWidth:'5',
            borderColor: 'rgb(40, 146, 215)',
            label:'Price',
            data:opensArr,
            backgroundColor:'rgba(255, 255, 255, .01)'
          }
        ]
      }
    });
  }

  getUserData(){
    //ajax calls here

    this.setState({
      userData:{
        labels: ['USD', 'BTC', 'ETH'],
        datasets:[
          {
            label:'Price',
            data:[10000, 0, 0], //sample portfolio numbers
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
    this.getChartData();
    this.getUserData();
  }

  render(){
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.coin + '\'s\ ' +  'Historical Prices',
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
