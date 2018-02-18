import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function Welcome(props) {
  return <h1> Hello and Welcome, {props.name} </h1>;
  // highlight-next-line
}
const element = <Welcome name="Rychard" />;
ReactDOM.render(element, document.getElementById('root'));

class App extends Component {
  render() {
    return (
      <div className="App" id = "root">
      // <header className="App-header">
      // <h1 className="App-title">Welcome to React</h1>
      // </header>
      // <p className="App-intro">
      // To get started, edit <code>src/App.js</code> and save to reload.
      // </p>
      </div>
    );
  }
}


export default App;
