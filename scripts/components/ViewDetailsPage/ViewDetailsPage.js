import React, {Component } from 'react';
import {Row, Col, Button, Panel} from 'react-bootstrap';
import Rating from 'react-rating';
import axios from 'axios';

class ViewDetailsPage extends Component {
	
	constructor(props){
		super(props);
		this.state={
			viewPlot: false
		}
		this.actorsList = [];
		
	}

	componentWillMount() {
		let self=this;
		self.props.imdbData.cast.map(function(cast){
			self.actorsList.push(cast.name+', ');
		});
	}

	//Sets state for whether to expand or collapse the plot panel
	togglePlot=()=>{
		this.setState({viewPlot: !this.state.viewPlot});
	}

	render() {
		let movieDetails = this.props.imdbData;
		return (
			<section className="viewDetailsPage">
				<Row className='top-row removeMargin'> 
					<Col xs={12} sm={4} className="imgContainer">{movieDetails.poster.large=='' ? <div className='noImg'>No Image</div> : <img src={movieDetails.poster.large} className="movieImg"/>}</Col>
					<Col xs={12} sm={8} className="movieInfo">
						<h3 className='movieTitle'>{movieDetails.title}</h3>
						<p className='releaseYear'><strong>Release Date: </strong>{movieDetails.year}</p>
						<p className='genres'><strong>Genres: </strong>{movieDetails.genre}</p>
						<p className='actors'><strong>Actors: </strong>{this.actorsList}</p>
						<p className='rated'><strong>Rated: </strong>{movieDetails.rating}</p>
						<p className='runtime'><strong>Runtime: </strong>{movieDetails.length} minutes</p>
						<p className='director'><strong>Director: </strong>{movieDetails.director}</p>
						<p className='rating'>
							<strong>Rating: </strong>
							<Rating className='ratingsComponent' readonly empty={<img src="assets/images/star-grey.png" className="icon" />} full={<img src="assets/images/star-red.png" className="icon" />} initialRate={movieDetails.rating/2} /> 
							{movieDetails.rating}/10
						</p>
					</Col>
				</Row>
				<Row className="plotDetailsContainer removeMargin">
					
					<a className='togglePlot' onClick={this.togglePlot}><strong>{this.state.viewPlot ? 'Collapse Plot Details' : 'Expand Plot Details'}</strong></a>
					<Panel className="plotPanel" collapsible expanded={this.state.viewPlot}>
			          {movieDetails.storyline}
			        </Panel>
				</Row>
				<Button className='returnToSaveBtn' bsStyle="success" bsSize="medium" onClick={this.props.returnToSearch}>Return to Search Results</Button>
			</section>
		);
	}
}

export default ViewDetailsPage;