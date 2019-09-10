import React from 'react';
//import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import Header from './components/header';
import Catalog from './components/catalog';
import BookCard from './components/bookCard';

class App extends React.Component {
  render() {
    console.log(this.props);

    return (
      <Router history = {createBrowserHistory()}>
        <Container>
          <Header />
          <h1>123</h1>
          <Route path="/bookcard/" component = { BookCard } exact />
          <Route path="/catalog/" component = { Catalog } exact />
        </Container>
      </Router>
    );
  }
}

export default App;
