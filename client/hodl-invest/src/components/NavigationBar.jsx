import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NavigationBar.css'

class NavigationBar extends Component {
	render(){
		return(
				<Navbar default collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Hodl Invest</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1} componentClass={Link} href="/" to="/">
								Home
							</NavItem>
							<NavItem eventKey={2} componentClass={Link} href="/dashboard" to="/dashboard">
								Dashboard
							</NavItem>
							<NavItem eventKey={3} componentClass={Link} href="/login" to="/login">
								Login
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
		);
	}
}

export default NavigationBar;
