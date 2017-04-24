import React, {Component } from 'react';
import {Grid, Pagination} from 'react-bootstrap';
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
		let pageNumber = self.state.pageNum;
		let resultRowList = self.searchResultList.map(function(result, index) {
			let searchIndex = (pageNumber-1)*10 +index+1;  //gets the index of the search results
			return (<ResultRow data={result} searchIndex={searchIndex} key={'searchRow'+searchIndex}/>);
		});

		return resultRowList;
	}

	handlePagination=(e)=>{
		this.setState({pageNum: e});
		this.props.handlePagination(e);
	}

	render() {
		let resultRows = this.getSearchResults();
		let numberItems = Math.ceil(this.props.searchResults.totalResults/10);

		return (
			<section className="searchResultsPage">
				{resultRows}
				      <Pagination
				        prev
				        next
				        first
				        last
				        ellipsis
				        boundaryLinks
				        items={numberItems}
				        maxButtons={5}
				        activePage={this.state.pageNum}
				        onSelect={this.handlePagination} />
			</section>
		);
	}
}

export default SearchResultsPage;