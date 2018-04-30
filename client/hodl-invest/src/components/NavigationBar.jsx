import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NavigationBar.css'

class NavigationBar extends Component {
	render(){
		function deleteAllCookies() {
    			var cookies = document.cookie.split(";");

    			for (var i = 0; i < cookies.length; i++) {
        		var cookie = cookies[i];
        		var eqPos = cookie.indexOf("=");
       			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
       			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
   				 }
			}
		var option="Login";
		if(document.cookie.length>0)
			option="Logout";
			hreflocation=".";
			deleteAllCookies();
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
							<NavItem eventKey={4} componentClass={Link} href={hreflocation} to={hreflocation}>
								{option}
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
		);
	}
}

export default NavigationBar;
