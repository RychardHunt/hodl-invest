import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Buttons = React.createClass({
  render: function() {
    return (

      <div key="reports" className="reports-page">
        <div className="ng-scope">
          <Link to="/dashboard/overview" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Overview</Link>
          <h2>Investment Portfolio <small>This shows your current investment values in USD</small></h2>
          <i className="glyphicon glyphicon-dashboard bg-fade"></i>
          <Jumbotron>
            <h1>Current Portfolio</h1>

            <img src={require('./flat-avatar.png')} />


            <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded">Learn more</a> </p>
          </Jumbotron>
        </div>
      </div>

    );
  }

});

export default Buttons;
