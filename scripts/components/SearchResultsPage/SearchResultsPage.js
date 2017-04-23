import React, {Component } from 'react';
import {Grid} from 'react-bootstrap';
import ResultRow from './../ResultRow/ResultRow';

//Displays the returned search results
class SearchResultsPage extends Component {

	constructor(props){
		super(props);
		this.state={
			pageNum: 1
		}
		
	}

	getSearchResults=()=>{
		const self = this;
		this.searchResultList = this.props.searchResults.Search;
		this.totalNumResults = this.props.searchResults.totalResults;
		let pageNumber = self.state.pageNum;
		let resultRowList = self.searchResultList.map(function(result, index) {
			let searchIndex = (pageNumber-1)*10 +index+1;  //gets the index of the search results
			return (<ResultRow data={result} searchIndex={searchIndex} key={'searchRow'+searchIndex}/>);
		});

		return resultRowList;
	}

	render() {

		let resultRows = this.getSearchResults();

		return (
			<section className="searchResultsPage">
				{resultRows}
			</section>
		);
	}
}

export default SearchResultsPage;