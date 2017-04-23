import React, {Component } from 'react';
import {Grid} from 'react-bootstrap';

class WelcomePage extends Component {

	constructor(props){
		super(props);
	}

	render() {

		return (
			<section className="welcomePage">
				<h2> Thank you for taking a look at my IMBD Search application.</h2>
				<h4>To get started, please type a movie name into the searchbox above.</h4>
			</section>
		);
	}
}

export default WelcomePage;