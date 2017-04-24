import React, {Component } from 'react';
import {Grid} from 'react-bootstrap';

class ViewDetailsPage extends Component {

	constructor(props){
		super(props);
	}

	render() {

		return (
			<Grid>
				<section className="viewDetailsPage">
					{this.props.imdbID}
				</section>
			</Grid>
		);
	}
}

export default ViewDetailsPage;