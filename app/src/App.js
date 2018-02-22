// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;
//
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './App.css';
//
// function Welcome(props) {
//   return <h1> Hello and Welcome, {props.name} </h1>;
//   // highlight-next-line
// }
// const element = <Welcome name="Rychard" />;
// ReactDOM.render(element, document.getElementById('root'));
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App" id = "root">
//       // <header className="App-header">
//       // <h1 className="App-title">Welcome to React</h1>
//       // </header>
//       // <p className="App-intro">
//       // To get started, edit <code>src/App.js</code> and save to reload.
//       // </p>
//       </div>
//     );
//   }
// }
//
//
// export default App;
//
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView , StatusBar, Text, View } from 'react-native-web';
import PieChart from 'react-native-pie-chart';
'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
});

export default class test extends Component {
  render() {
    const chart_wh = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <StatusBar
            hidden={true}
          />
          <Text style={styles.title}>Basic</Text>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
          />
          <Text style={styles.title}>Doughnut</Text>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        </View>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('test', () => test);
