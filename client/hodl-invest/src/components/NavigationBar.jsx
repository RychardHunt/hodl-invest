import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NavigationBar.css'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser} from '../actions/loginAction';
window.logswitch="false";
window.logtext="Login";


class NavigationBar extends Component{

	 registerlink(){
		if(!this.props.isLoggedIn){
				return(<NavItem eventKey={3} componentClass={Link} href="/register" to="/register">Register</NavItem>);}
		else{return;}
	 }
	 logoutUser(){
		 if (this.props.isLoggedIn) {
			 this.props.logoutUser();
			 window.location.href = './';
		 }
	 }



	render(){

		var hreflocation="/login";
		var text="Login";
		if(this.props.isLoggedIn){
			hreflocation=".";
			window.logtext="Logout";

		}





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
							{this.registerlink()}
							<NavItem eventKey={4} componentClass={Link} onClick={() => this.logoutUser()} href={hreflocation} to={hreflocation}>
								{window.logtext}
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
		);
	}
}

	function mapStateToProps(state){
		return {
			isLoggedIn: state.isLoggedIn
		}
	}
	function matchDispatchToProps(dispatch){
		return bindActionCreators({logoutUser: logoutUser }, dispatch);

	}

export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar);
