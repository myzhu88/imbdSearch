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
			showSearchErrorTooltip: false,
			searchResults: [],
			searchPageNum: 1
		}
		this.searchURI = 'http://www.omdbapi.com/?s='; //endpoint for search query
		this.searchType = '&type=movie'; //hardcoing the type of search results to return as movie for now.  May implement TV series later
		this.query = '';
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
		this.query = e.target.value;
	}

	//Event handler to toggle search when the search button is clicked
	toggleSearch=()=> {
		const self = this;
		let movieQuery = this.query.trim();
		//check to see if search field is empty
		if (!movieQuery || 0 === movieQuery.length) {  //if empty field
			this.showSearchErrorTooltip();
		} else {  //if field is not empty
			let queryURL = self.searchURI+movieQuery.replace(/\s+/g, '+')+self.searchType;  //create the url
			axios({
			  method:'get',
			  url: queryURL,
			  responseType:'json'
			})
			.then(function(response) { //Promise returned successfully
			   let searchResponse = response.data;
			  //check to see if any results are found
			  if (!searchResponse.Error) { //if  results are found
			  	self.setState({searchResults: searchResponse});
			  	self.setState({page: 'searchResults', pageNum: 1});
			  } else{  //if no results found
			  	self.setState({page: 'noResults'});
			  }
			},
			function(err) {  //Promise failed
				console.warn('Axios request failed');
				self.setState({page: 'noResults'});
			});	
		}
	}

	//handles pagination for search results
	handlePagination=(pageNum)=> {
		const self = this;
		let queryURL = self.searchURI+this.query.replace(/\s+/g, '+')+self.searchType+'&page='+pageNum;  //create the url
			axios({
			  method:'get',
			  url: queryURL,
			  responseType:'json'
			})
			.then(function(response) { //Promise returned successfully
			   let searchResponse = response.data;
			  //check to see if any results are found
			  if (!searchResponse.Error) { //if  results are found
			  	self.setState({searchResults: searchResponse});
			  	self.setState({page: 'searchResults', pageNum: pageNum});
			  } else{  //if no results found
			  	self.setState({page: 'noResults'});
			  }
			},
			function(err) {  //Promise failed
				console.warn('Axios request failed');
				self.setState({page: 'noResults'});
			});
	}

	render() {
		let getPageToShow = this.state.page;
		let pageToShow = null;
		switch (getPageToShow) {
			case 'welcome':
				pageToShow = (<WelcomePage />);
				break;
			case 'searchResults':
				pageToShow = (<SearchResultsPage pageNum={this.state.pageNum} searchResults={this.state.searchResults} handlePagination={this.handlePagination}/>);
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