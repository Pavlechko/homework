import React from 'react';
//import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { store } from './reducers/books-reducer';
import Header from './components/header';
import Catalog from './components/catalog';
import BookCard from './components/bookCard';
import CreateCategory from './components/createCategory';


class App extends React.Component {
  render() {
    console.log(this.props);

    return (
      <Provider store={store}>
        <Router history = {createBrowserHistory()}>
          <Container>
            <Header />
            <h1>123</h1>
            <Menu>
                    <Menu.Item
                        name='Catalog'
                        onClick={this.handleItemClick}
                    >
                        <Link to="/catalog">Catalog</Link>
                    </Menu.Item>
                    <Menu.Item
                        name='createCategory'
                        onClick={this.handleItemClick}
                    >
                        <Link to="/createCategory">create Category</Link>
                    </Menu.Item>
                    <Menu.Item
                        name='bookcard'
                        onClick={this.handleItemClick}
                    >
                        <Link to="/bookcard">bookcard</Link>
                    </Menu.Item>
            </Menu>

            <Route path="/bookcard/" component = { BookCard } exact />
            <Route path="/catalog/" component = { Catalog } exact />
            <Route path="/createCategory/" component = { CreateCategory } exact />
          </Container>
        </Router>
    </Provider>
    );
  }
}

export default App;
