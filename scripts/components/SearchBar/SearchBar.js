import React, {Component } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class SearchBar extends Component {

	constructor(props){
		super(props);
	}

	//Event handler to toggle search when the search button is clicked
	toggleSearch = () => {
		let searchResults = {};
		axios({
		  method:'get',
		  url:'http://www.omdbapi.com/?s=star+wars&type=movie',
		  responseType:'json'
		})
		.then(function(response) { //Promise returned successfully
		  searchResults = response.data;
		  console.log(searchResults);
		},
		function(err) {  //Promise failed
			console.log('request failed: ',err);
		});

		
	}

	render() {



		return (
			<section> 
				<h3>IMBD Search</h3>
				<div className="searchByContainer">
						<label className="searchLabel" htmlFor="titleSearch">Title:</label>
						<input id="titleSearchField" className="searchField" type="text" name="titleSearch"></input>
				</div>

				<Button bsStyle="success" bsSize="small" onClick={this.toggleSearch}>Search</Button>

			</section>
		);
	}
}

export default SearchBar;