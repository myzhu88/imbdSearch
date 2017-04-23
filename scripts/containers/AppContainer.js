import React, {Component } from 'react';
import {Grid} from 'react-bootstrap';
import axios from 'axios';
import SearchBar from './../components/SearchBar/SearchBar';
import WelcomePage from './../components/WelcomePage/WelcomePage';
import SearchResultsPage from './../components/SearchResultsPage/SearchResultsPage';
import NoResultsPage from './../components/NoResultsPage/NoResultsPage';



//Application Wrapper
class AppContainer extends Component {

	constructor(props){
		super(props);
		this.state={
			page: 'welcome',
			showSearchErrorTooltip: false
		}
		this.searchResults=[]; //returned search results
		this.movieQuery = '';
	}

	//hides the error tooltip
	showSearchErrorTooltip=()=>{
		this.setState({showSearchErrorTooltip: true});
	}

	//hides the error tooltip
	hideSearchErrorTooltip=()=>{
		this.setState({showSearchErrorTooltip: false});
	}

	//sets the textfield value to this.movieQuery
	setQueryString=(e)=>{
		this.movieQuery = e.target.value;
	}

	//Event handler to toggle search when the search button is clicked
	toggleSearch=()=> {
		const self = this;
		const searchURI = 'http://www.omdbapi.com/?s='; //endpoint for search query
		const searchType = '&type=movie'; //hardcoing the type of search results to return as movie for now.  May implement TV series later
		let searchResults = {};
		let movieQuery = this.movieQuery.trim();

		//check to see if search field is empty
		if (!movieQuery || 0 === movieQuery.length) {  //if empty field
			this.showSearchErrorTooltip();
		} else {  //if field is not empty
			let queryURL = searchURI+movieQuery.replace(/\s+/g, '+')+searchType;;  //create the url
			axios({
			  method:'get',
			  url: queryURL,
			  responseType:'json'
			})
			.then(function(response) { //Promise returned successfully
			  searchResults = response.data;
			  console.log(searchResults);
			  //check to see if any results are found
			  if (!searchResults.Error) { //if  results are found
			  	
			  } else{  //if no results found
			  	
			  }
			},
			function(err) {  //Promise failed
				
			});	
		}
	}

	render() {
		let getPageToShow = this.state.page;
		let pageToShow = null;
		switch (getPageToShow) {
			case 'welcome':
				pageToShow = (<WelcomePage />);
				break;
			case 'searchResults':
				pageToShow = (<SearchResultsPage searchResults={this.searchResults} />);
				break;
			case 'noResults':
				pageToShow = (<NoResultsPage />);
				break;
			default:
				null;
		}

		
		return(
			<article>
				<SearchBar showErrorTooltip={this.state.showSearchErrorTooltip} toggleSearch={this.toggleSearch} setQueryString={this.setQueryString} hideErrorTooltip={this.hideSearchErrorTooltip}/>
				<Grid className="bodyContainer">{pageToShow}</Grid>
							
			</article>
		);
	}
}

export default AppContainer;