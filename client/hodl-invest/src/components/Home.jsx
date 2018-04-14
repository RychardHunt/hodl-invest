import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import './Home.css';

class Home extends Component {
	render(){
		return (
			<div>
				<Grid>
					<Jumbotron>
						<h1> Welcome to Hodl Invest	</h1>
						<p> This is a Virtual Cryptocurrency Simulator </p>

						<Link to="/about">
							<Button bsStyle="primary"> Learn more </Button>
						</Link>
					</Jumbotron>
					<Image src="assets/cryptocurrency-coin-explosion.jpg" className="header-img" />

				</Grid>

			</div>
		);
	}
}

export default Home;
