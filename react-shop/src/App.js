import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from "history";
import { Router, Route } from 'react-router-dom';

import Header from "./components/header"
import Catalog from './components/catalog';

import { setBooks } from './actions/books-actions';

class App extends React.Component {
  render() {
    console.log(this.props);

    //const { books } = this.props;

    return (
      <Router history = {createBrowserHistory()}>
        <Header />
        <h1>123</h1>
        {/* <ul>
          {
            books.map(book => (
              <li><b>{book.name}</b> - {book.description}</li>
            ))
          }
        </ul> */}
        <Route path="/catalog/" component = { Catalog } exact />
      </Router>
    );
  }
}

const mapStateToProps = ({ books }) =>  ({
  books: books.items
});

const mapDispatchToProps = dispatch => ({
  setBooks: books => dispatch(setBooks(books))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
