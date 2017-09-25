import React, {Component } from 'react';
import {Grid} from 'react-bootstrap';
import axios from 'axios';
import SearchBar from './../components/SearchBar/SearchBar';
import WelcomePage from './../components/WelcomePage/WelcomePage';
import SearchResultsPage from './../components/SearchResultsPage/SearchResultsPage';
import NoResultsPage from './../components/NoResultsPage/NoResultsPage';
import ViewDetailsPage from './../components/ViewDetailsPage/ViewDetailsPage';
import Loader from './../components/Loader/Loader';



//Application Wrapper
class AppContainer extends Component {

	constructor(props){
		super(props);
		this.state={
			page: 'welcome',
			showSearchErrorTooltip: false,
			searchResults: [],
			searchPageNum: 1,
			imdbData: null,
			loading: false
		}
		this.searchURI = 'http://www.theimdbapi.org/api/find/movie?title='; //endpoint for search query
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
		self.setState({loading: true})
		let movieQuery = this.query.trim();
		//check to see if search field is empty
		if (!movieQuery || 0 === movieQuery.length) {  //if empty field
			this.showSearchErrorTooltip();
		} else {  //if field is not empty
			let queryURL = self.searchURI+movieQuery.replace(/\s+/g, '+');  //create the url
			axios({
			  method:'get',
			  url: queryURL,
			  responseType:'json'
			})
			.then(function(response) { //Promise returned successfully
			   let searchResponse = response.data;
			  //check to see if any results are found
			  if (searchResponse) { //if  results are found
			  	self.setState({searchResults: searchResponse,page: 'searchResults', pageNum: 1, loading: false});
			  } else{  //if no results found
			  	self.setState({page: 'noResults', loading: false});
			  }
			},
			function(err) {  //Promise failed
				console.warn('Axios request failed');
				self.setState({page: 'noResults', loading:false});
			});	
		}
	}

	//handles view details page
	viewSearchDetails=(data)=>{
		this.setState({imdbData: data, page:'viewDetails'});

	}
	returnToSearch=()=> {
		this.setState({page: 'searchResults'});
	}

	render() {
		let getPageToShow = this.state.page;
		let pageToShow = null;
		switch (getPageToShow) {
			case 'welcome':
				pageToShow = (<WelcomePage />);
				break;
			case 'searchResults':
				pageToShow = (<SearchResultsPage pageNum={this.state.pageNum} searchResults={this.state.searchResults} viewSearchDetails={this.viewSearchDetails} handlePagination={this.handlePagination}/>);
				break;
			case 'noResults':
				pageToShow = (<NoResultsPage />);
				break;
			case 'viewDetails':
				pageToShow = (<ViewDetailsPage imdbData={this.state.imdbData} returnToSearch={this.returnToSearch}/>);
			default:
				null;
		}

		
		return(
			<article>
				<SearchBar showErrorTooltip={this.state.showSearchErrorTooltip} toggleSearch={this.toggleSearch} setQueryString={this.setQueryString} hideErrorTooltip={this.hideSearchErrorTooltip}/>
				{this.state.loading ? <div className="loaderContainer"><Loader /></div> : <Grid className="bodyContainer">{pageToShow}</Grid>}					
			</article>
		);
	}
}

export default AppContainer;