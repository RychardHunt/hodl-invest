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
          Hodl Invest is a Mutual Fund with Algorithmic Trading for Cryptocurrencies.
          Minimum Viable Product: Investors would be able to create an account on the website
          and invest their money and in return get shares of the mutual fund. Investors would
          be able to check the current portfolio allocations amongst various fund manager approved
          cryptocurrencies, but would be unable to individually change the portfolio allocations.
          Trading would be done algorithmically based on fund manager approved parameters.
          Add Ons: Investors would be able to withdrawal from the mutual fund.
          Investors would be able to choose amongst different portfolios.
          Investors would be able to refer other investors and get referral fees.
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
