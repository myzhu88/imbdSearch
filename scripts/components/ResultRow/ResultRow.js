import React, {Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';

class ResultRow extends Component {
	constructor(props){
		super(props);

		this.searchIndex = this.props.searchIndex;
		this.title = this.props.data.Title || '';
		this.releaseYear = this.props.data.Year || '';
		this.imgSRC = this.props.data.Poster || '';
		this.imdbID = this.props.data.imdbID || '';
	}

	//event handler to view details of the selected movie
	viewSearchDetails=()=>{
		this.props.viewSearchDetails(this.imdbID);
	}

	render() {

		return(
			<Row className='resultRow'>
				<Col xsHidden sm={1} className="column"><div className='verticalAlign'>{this.searchIndex+'.'}</div></Col>
				<Col xs={12} sm={2} className="movieImgContainer">{this.imgSRC=='N/A' ? <div className='noImg'>No Image</div> : <img src={this.imgSRC} className="movieImg"/>}</Col>
				<Col xs={12} sm={5} className="column"><div className='verticalAlign'>{this.title}</div></Col>
				<Col xs={12} sm={2} className="column"><div className='verticalAlign'><strong>Release: </strong>{this.releaseYear}</div></Col>
				<Col xs={12} sm={2} className="column"><div className='verticalAlign'><Button bsStyle="success" bsSize="small" onClick={this.viewSearchDetails}>View Details</Button></div></Col>
			</Row>
		);

	}
}
export default ResultRow;