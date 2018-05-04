import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';




// function Get(userDataURL){
//     var Httpreq = new XMLHttpRequest(); // a new request
//     Httpreq.open("GET",userDataURL,false);
//     Httpreq.send(null);
//     return Httpreq.responseText;
// }

// var json_obj = JSON.parse(Get(userDataURL));

// var userPlayMoney = json_obj.playMoney;
// var userBTC = json_obj.portfolio
var timesArr;
var opensArr;

class Chart extends Component{
  constructor(props){
    super( props );
    this.state = {
      chartData:props.chartData,
    };
    this.toggleChart = this.toggleChart.bind(this);

  }
  getCoinData(){
    var url = 'https://min-api.cryptocompare.com/data/histoday?fsym='+this.props.coin+'&tsym=USD&limit=3';
    var userUrl='https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=3';


    function Get(url){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",url,false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }

    var json_obj = JSON.parse(Get(url)); //This object holds the result of the get request
    timesArr = [];
    var unixArr = [];
    opensArr = [];

    var data = json_obj.Data;

    for(var i = 0; i < data.length; i++) {
        var obj = data[i];
        var date = new Date((obj.time)*1000);
        var formattedDate = (date.getUTCMonth() + 1)+'-'+date.getUTCDate()+'-'+date.getUTCFullYear();
        timesArr.push(formattedDate);
        opensArr.push(obj.open);
    }
    var userDataURL = "";
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
    this.state={
      // show : true,
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
    };

  }



  toggleChart = () => {
    const { show } = this.state;
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }



  componentWillMount(){
      this.getCoinData();

  }

  render(){
    const { showing } = this.state;
    this.getCoinData();

    return (
      <div className="BTCchart">
      <div ><Line
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
      </div>
    )
  }
}

export default Chart;
