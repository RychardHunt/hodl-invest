import React, {Component} from 'react';
import {Jumbotron, Grid, Row, Col, Image, Button} from 'react-bootstrap';

class About extends Component {
  render(){
    return(
      <div>
        <Grid>
          <Jumbotron>
            <center>
            <h1> About Us </h1>
            <h2> Team </h2>
            </center>
            <p>We are a team of Blockchain Evangelists who seek to educate the masses of investors
            about the viability of digital assets on the blockchain as a form of liquid security.</p>

            <p>
            <strong>Daniel Connolly*</strong>: Frontend Software Engineer <br/>
            <strong>Richard Guo</strong>: Technical Product Manager & Lead Frontend Software Engineer <br/>
            <strong>Aaron Lin*</strong>: Frontend Software Engineer <br/>
            <strong>Luis Lopez-Cardona*</strong>: Frontend Software Engineer <br/>
            <strong>Thomas Ly*</strong>: Frontend Software Engineer <br/>
            <strong>Alex Wu</strong>: Backend Software Engineer <br/>
            <strong>Kenny Zhao</strong>: Backend Software Engineer
            </p>

            <center>
            <h2> Goal </h2>
            </center>
            <p>At the current moment, we are supporting some of the biggest cryptocurrencies
            by market capitalization, but we will eventually add support for various security
            tokens once they are approved for the general public by regulators.</p>

            <center>
            <h2> Note </h2>
            </center>
            <p>
            * indicates the team member is not enrolled in CSE 442 Software Engineering Concepts at the University at Buffalo for Spring 2018 </p>
          </Jumbotron>
        </Grid>
      </div>
    );
  }
}

export default About;
