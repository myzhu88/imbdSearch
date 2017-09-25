import React, {Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';

class ResultRow extends Component {
	constructor(props){
		super(props);
	}

	//event handler to view details of the selected movie
	viewSearchDetails=()=>{
		this.props.viewSearchDetails(this.props.data);
	}

	render() {

		return(
			<Row className='resultRow'>
				<Col xsHidden sm={1} className="column"><div className='verticalAlign'>{ this.props.searchIndex+'.'}</div></Col>
				<Col xs={12} sm={2} className="movieImgContainer">{this.props.data.poster.thumb=='' ? <div className='noImg'>No Image</div> : <img src={this.props.data.poster.thumb} className="movieImg"/>}</Col>
				<Col xs={12} sm={5} className="column"><div className='verticalAlign'>{this.props.data.title}</div></Col>
				<Col xs={12} sm={2} className="column"><div className='verticalAlign'><strong>Release: </strong>{this.props.data.year}</div></Col>
				<Col xs={12} sm={2} className="column"><div className='verticalAlign'><Button bsStyle="success" bsSize="small" onClick={this.viewSearchDetails}>View Details</Button></div></Col>
			</Row>
		);

	}
}
export default ResultRow;