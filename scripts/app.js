import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';


class app extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AppContainer /> //Container application
		);
	}
}

//Attached react component to the DOM
ReactDOM.render(React.createElement(app), document.querySelector('#main'));