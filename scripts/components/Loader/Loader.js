import React, {Component } from 'react';

class Loader extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="loader component" key="loader">
				<div className="loader__dots">
				    <span className="loader__dots__dot"/>
				    <span className="loader__dots__dot"/>
				    <span className="loader__dots__dot"/>
				</div>
			</div>
		);
		
	}

}
export default Loader;