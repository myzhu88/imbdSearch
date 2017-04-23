import React, {Component } from 'react';
import {Button, Col, Row} from 'react-bootstrap';

import axios from 'axios';

class SearchBar extends Component {

	constructor(props){
		super(props);

		this.state = {
			showErrorTooltip: false
		}

		this.movieQuery = '';
	}

	//Event handler to toggle search when the search button is clicked
	toggleSearch=()=> {
		let searchResults = {};
		let movieQuery = this.movieQuery.trim();

		//check to see if search field is empty
		if (!movieQuery || 0 === movieQuery.length) {
			this.setState({showErrorTooltip: true});
		}

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

	//hides the error tooltip
	hideErrorTooltip=()=>{
		this.setState({showErrorTooltip: false});
	}

	//sets the textfield value to this.movieQuery
	setQueryString=(e)=>{
		this.movieQuery = e.target.value;
	}

	render() {

		const errorTooltip = (<div className='errorTooltip'>Please Enter a movie title</div>);
		
		return (
			<Row className="searchContainer"> 
				<Col xs={12} sm={3} className='headerTitle'><h3>IMBD Search</h3></Col>
				<Col xs={8} sm={4} className="searchComponent">
					<label className="searchLabel" htmlFor="titleSearchBox">Search by Title:</label>
					<input id="titleSearchBox" className="searchTextField" type="text" name="titleSearchBox" placeholder="Enter a movie title..." onFocus={this.hideErrorTooltip} onBlur={this.setQueryString}></input>
					{this.state.showErrorTooltip ? errorTooltip : null}
				</Col>
				<Col xs={4} sm={3} className="findButtonContainer"><Button bsStyle="success" bsSize="small" onClick={this.toggleSearch}>Search</Button></Col>

			</Row>
		);
	}
}

export default SearchBar;