import React, {Component } from 'react';
import SearchBar from './../components/SearchBar/SearchBar';
import {Grid} from 'react-bootstrap';


//Application Wrapper
class AppContainer extends Component {

	constructor(props){
		super(props);
	}

	render() {
		
		return(
			<article>
				<SearchBar />
				<Grid>
				</Grid>
			</article>
		);
	}
}

export default AppContainer;