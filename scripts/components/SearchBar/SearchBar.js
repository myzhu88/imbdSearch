import React, {Component } from 'react';
import {Button, Col, Row} from 'react-bootstrap';

class SearchBar extends Component {

	constructor(props){
		super(props);
	}

	render() {

		const errorTooltip = (<div className='errorTooltip'>Please Enter a movie title</div>);
		
		return (
			<Row className="searchContainer"> 
				<Col xs={12} sm={3} className='headerTitle'><h3>IMBD Search</h3></Col>
				<Col xs={8} sm={4} className="searchComponent">
					<label className="searchLabel" htmlFor="titleSearchBox">Search by Title:</label>
					<input id="titleSearchBox" className="searchTextField" type="text" name="titleSearchBox" placeholder="Enter a movie title..." onFocus={this.props.hideErrorTooltip} onBlur={this.props.setQueryString}></input>
					{this.props.showErrorTooltip ? errorTooltip : null}
				</Col>
				<Col xs={4} sm={3} className="findButtonContainer"><Button bsStyle="success" bsSize="small" onClick={this.props.toggleSearch}>Search</Button></Col>

			</Row>
		);
	}
}

export default SearchBar;