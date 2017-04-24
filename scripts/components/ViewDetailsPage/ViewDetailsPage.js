import React, {Component } from 'react';
import {Row, Col, Button, Panel} from 'react-bootstrap';
import Rating from 'react-rating';

class ViewDetailsPage extends Component {
	
	constructor(props){
		super(props);
		this.state={
			movieDetails: {},
			viewPlot: false
		}
		
	}

	componentWillMount() { 
		const self = this;
		const imdb = require('imdb-api');  //need to create imdb object here.  Doesn't work when done as an import at the top of the file
	 	imdb.getReq({ id: this.props.imdbID})  //uses imdb-api module to get the details of a movie using it's imdb id
	 	.then(
	 		function(response) {//Promise returned successfully
	 			self.setState({movieDetails: response});
	 			console.log(response);
	 		},
	 		function(err) {//Promise failed
	 			console.warn('Problem occured with imdb-api module');
	 		});
	}

	//Sets state for whether to expand or collapse the plot panel
	togglePlot=()=>{
		this.setState({viewPlot: !this.state.viewPlot});
	}

	render() {
		let movieDetails = this.state.movieDetails;
		return (
			<section className="viewDetailsPage">
				<Row className='top-row removeMargin'> 
					<Col xs={12} sm={4} className="imgContainer">{movieDetails.poster=='N/A' ? <div className='noImg'>No Image</div> : <img src={movieDetails.poster} className="movieImg"/>}</Col>
					<Col xs={12} sm={8} className="movieInfo">
						<h3 className='movieTitle'>{movieDetails.title}</h3>
						<p className='releaseYear'><strong>Release Date: </strong>{movieDetails.year}</p>
						<p className='genres'><strong>Genres: </strong>{movieDetails.genres}</p>
						<p className='rated'><strong>Rated: </strong>{movieDetails.rated}</p>
						<p className='runtime'><strong>Runtime: </strong>{movieDetails.runtime}</p>
						<p className='actors'><strong>Actors: </strong>{movieDetails.actors}</p>
						<p className='director'><strong>Director: </strong>{movieDetails.director}</p>
						<p className='languages'><strong>Language(s): </strong>{movieDetails.languages}</p>
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
			          {movieDetails.plot}
			        </Panel>
				</Row>
				<Button className='returnToSaveBtn' bsStyle="success" bsSize="medium" onClick={this.props.returnToSearch}>Return to Search Results</Button>
			</section>
		);
	}
}

export default ViewDetailsPage;