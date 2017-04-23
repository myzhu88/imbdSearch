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
				<Col xsHidden sm={1}><div className='verticalAlign'>{searchIndex+'.'}</div></Col>
				<Col xs={12} sm={2} className="movieImgContainer">{<img src={imgSRC} className="movieImg"/>}</Col>
				<Col xs={12} sm={5}><div className='verticalAlign'>{title}</div></Col>
				<Col xs={12} sm={2}><div className='verticalAlign'>{releaseYear}</div></Col>
				<Col xs={12} sm={2}><div className='verticalAlign'>button</div></Col>
			</Row>
		);

	}
}
export default ResultRow;