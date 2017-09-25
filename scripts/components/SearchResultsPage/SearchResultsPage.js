import React, {Component } from 'react';
import {Grid, Pagination} from 'react-bootstrap';
import ResultRow from './../ResultRow/ResultRow';

//Displays the returned search results
class SearchResultsPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			activePage: 1
		}
		
	}

	getSearchResults=()=>{
		const self = this;
		this.searchResultList = this.props.searchResults;
		let pageNumber = self.props.pageNum;
		let resultRowList = self.searchResultList.map(function(result, index) {
			let searchIndex = (pageNumber-1)*10 +index+1;  //gets the index of the search results
			return (<ResultRow data={result} viewSearchDetails={self.props.viewSearchDetails} searchIndex={searchIndex} key={'searchRow'+searchIndex}/>);
		});

		let begIndex = (self.state.activePage - 1) * 10;
		let endIndex = (self.state.activePage * 10) > resultRowList.length ? resultRowList.length : (self.state.activePage * 10) ;

		return resultRowList.slice(begIndex, endIndex);
	}

	handlePagination = (eventKey) => {
	    this.setState({
	      activePage: eventKey
	    });
	}
	
	render() {
		let self = this;
		let resultRows = this.getSearchResults();
		let numberItems = Math.ceil(this.props.searchResults.length/10);

		return (
			<section className="searchResultsPage">
				{resultRows}
				<div className="paginationContainer">
					<Pagination
					        prev
					        next
					        first
					        last
					        ellipsis
					        boundaryLinks
					        items={numberItems}
					        maxButtons={5}
					        activePage={self.state.activePage}
					        onSelect={self.handlePagination} />
				</div>
			</section>
		);
	}
}

export default SearchResultsPage;