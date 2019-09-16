import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { store } from '../reducers/books-reducer';
import promiseActionsMaker from '../actions/actions';
import { connect } from 'react-redux'

import { GraphQLClient } from 'graphql-request'
const gql = new GraphQLClient("/graphql", { headers: {} })

class BookCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loader: false, name: "", description: "", price: "", image: "", quantity: "" }
  }

  async componentDidMount() {
		let getAllProducts = await promiseActionsMaker('products',
    gql.request(`query getProducts {
        getProducts {
        id,
        name,
        description,
        price,
        quantity,
        categoryId,
        image
        }
    }`)
    );



  await store.dispatch(getAllProducts());

  console.log('___BOOKCARD___');
  console.log(store.getState());
  console.log(this.props.products)


  }


  render() {
    const products= this.props.products;
    //const getProducts = this.props.products;
    console.log(products);



		return (
      <Card.Group itemsPerRow={4}>
        {!products ? 'Loading...' : products.map(products => (
          <Card key={products.id}>
            <Image src={products.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{products.name}</Card.Header>
              <Card.Meta>
                <span className='date'>{products.quantity} pcs.</span>
              </Card.Meta>
              <Card.Description>
                {products.description}
              </Card.Description>
            </Card.Content>
              <Card.Content >
                <Icon name='money' />
                {" " + products.price + " ₴" }
              </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  }
};

// const mapStateToProps = state => {
//   debugger;
// 	return {
// 		info: state
// 	};
// };



export default connect( state => ({products: state.products && state.products.payload && state.products.payload.getProducts}))(BookCard);
