import React, {Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';

class ResultRow extends Component {
	constructor(props){
		super(props);
	}


	render() {
		let searchIndex = this.props.searchIndex;
		let title = this.props.data.Title || '';
		let releaseYear = this.props.data.Year || '';
		let imgSRC = this.props.data.Poster || '';
		let imdbID = this.props.data.imdbID || '';
		return(
			<Row className='resultRow'>
				<Col xsHidden sm={1} className="column"><div className='verticalAlign'>{searchIndex+'.'}</div></Col>
				<Col xs={12} sm={2} className="movieImgContainer">{imgSRC=='N/A' ? <div className='noImg'>No Image</div> : <img src={imgSRC} className="movieImg"/>}</Col>
				<Col xs={12} sm={5} className="column"><div className='verticalAlign'>{title}</div></Col>
				<Col xs={12} sm={2} className="column"><div className='verticalAlign'><strong>Release: </strong>{releaseYear}</div></Col>
				<Col xs={12} sm={2} className="column"><div className='verticalAlign'><Button bsStyle="success" bsSize="small" onClick={this.viewSearchDetails}>View Details</Button></div></Col>
			</Row>
		);

	}
}
export default ResultRow;