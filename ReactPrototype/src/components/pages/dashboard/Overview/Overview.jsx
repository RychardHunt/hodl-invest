import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Blank = React.createClass({
  render: function() {
    return (
      <div className="overview-page" key="overview">
        <Link to="/dashboard/reports" className="pull-right btn btn-primary btn-outline btn-rounded">Reports</Link>
        <h2>Welcome! <small>Your journal of cryptocurrency investment starts here</small></h2>
        <Jumbotron>
          <h1>About Us</h1>
          <h4>
          Hodl Invest is a virtual cryptocurrency exchange whose mission it to educate the general public on cryptocurrencies.
          We seek to become the premier educational virtual cryptocurrency exchange that would introduce the masses into the
          future of Web 3.0
          Minimum Viable Product: Users could use play money to buy and sell virtual bitcoins and see how well they did if they actually made the decision on the real cryptocurrency exchange. Our mission is to make it easier and less daunting for people to get into cryptocurrencies while also creating a fun and interactive experience for intermediate cryptocurrency traders who are interested in testing their investment strategies.
          </h4>


          <img src={require('./flat-avatar.png')} />
          <br /><br />
          <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded">Learn more</a> </p>
        </Jumbotron>
      </div>


    );
  }

});

export default Blank;
