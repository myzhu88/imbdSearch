import React, {Component } from 'react';
import SearchBar from './../components/SearchBar/SearchBar';


//Application Wrapper
class AppContainer extends Component {

	constructor(props){
		super(props);
	}

	render() {
		
		return(
			<article>
				<SearchBar />
			</article>
		);
	}
}

export default AppContainer;