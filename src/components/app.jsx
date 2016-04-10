import React from 'react';
import Header from './header';
import Footer from './footer';

if (process.env.BROWSER) {
	require('materialize-css/dist/css/materialize.min.css');
}

class App extends React.Component {

  	render() {
		return (
			<div>
				<Header />
				{ this.props.children }
				<Footer />
	  		</div>
		);
  	}
}

export default App;

