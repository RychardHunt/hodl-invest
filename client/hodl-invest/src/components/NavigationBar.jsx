import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NavigationBar.css'
window.logswitch="false";
window.logtext="Login";
class NavigationBar extends Component {
	render(){
		
		var hreflocation="/login";
		var text="Login";
		if(window.logswitch=="true"){
			hreflocation=".";
			window.logtext="Logout";

		}

		function testlogin(){
		if (window.logswitch=="true")
			{window.location.reload();
		}}

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
							<NavItem eventKey={3} componentClass={Link} href="/register" to="/register">
								Register
							</NavItem>
							<NavItem eventKey={4} componentClass={Link} onClick={testlogin} href={hreflocation} to={hreflocation}>
								{window.logtext}
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
		);
	}
}

export default NavigationBar;
