import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { store } from '../reducers/books-reducer';
import promiseActionsMaker from '../actions/actions';

import { GraphQLClient } from 'graphql-request'
const gql = new GraphQLClient("/graphql", { headers: {} })

class BookCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loader: false, name: "", description: "", price: "", image: "", quantity: "" }
  }

  async componentDidMount() {
		let getAllProducts = promiseActionsMaker('products',
    gql.request(`query getProducts {
        getProducts {
        id,
        name,
        description,
        price,
        quantity,
        categoryId
        }
    }`)
    );

  store.dispatch(getAllProducts());
  console.log(store.getState.getAllProducts);
	}

  render() {
		return (
      <Card>
      <Image src='#' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{}</Card.Header>
        <Card.Meta>
          <span className='date'>{} sht</span>
        </Card.Meta>
        <Card.Description>
          {}
        </Card.Description>
      </Card.Content>
      <Card.Content >
          <Icon name='ukr' />
          {} ₴
      </Card.Content>
    </Card>
);
}
}
export default BookCard;
