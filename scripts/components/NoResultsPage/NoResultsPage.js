import React, {Component } from 'react';
import {Grid} from 'react-bootstrap';

//Page for no results found or errors with the query call
class NoResultsPage extends Component {

	constructor(props){
		super(props);
	}

	render() {

		return (
			<section className="noResultsPage">
				<h2> No search results found</h2>
			</section>
		);
	}
}

export default NoResultsPage;