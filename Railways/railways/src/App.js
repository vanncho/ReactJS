import React, { Component, Fragment } from 'react';
import Navigation from './components/common/Navigation.jsx';
import Routes from './components/common/Routes';
import Footer from './components/common/Footer';

class App extends Component {

  logout() {
    sessionStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return (
      <Fragment>
        <Navigation logout={this.logout.bind(this)}/>
        <main>
          <Routes />
          <Footer />
        </main>
      </Fragment>
    );
  }
}

export default App;
