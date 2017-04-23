import React, {Component } from 'react';
import {Grid} from 'react-bootstrap';

//Displays the returned search results
class SearchResultsPage extends Component {

	constructor(props){
		super(props);
	}

	render() {

		return (
			<section className="searchResultsPage">
				{JSON.stringify(this.props.searchResults)}
			</section>
		);
	}
}

export default SearchResultsPage;