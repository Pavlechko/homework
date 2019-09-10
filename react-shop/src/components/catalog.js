import React from 'react';
import { GraphQLClient } from 'graphql-request';
import ReactDataGrid from "react-data-grid";
import { connect } from 'react-redux';

//import { setBooks } from '../actions/books-actions';

const gql = new GraphQLClient("/graphql");

const columns = [
    //{ key: "id", name: "Id", editable: true },
    { key: "name", name: "Name", editable: true },
    { key: "description", name: "Description", editable: true },
    { key: "price", name: "Price", editable: true },
    { key: "quantity", name: "Quantity", editable: true },
    { key: "categoryId", name: "CategoryId", editable: true }
  ];

class Catalog extends React.Component {

    constructor(props) {
        super(props)
        this.state = { loader: false, getBooksAll: '', rows: '' }
    };

    async componentDidMount() {
        let getBooksAll = await gql.request(`query getProducts {
            getProducts {
              id,
              name,
              description,
              price,
              quantity,
              categoryId
            }
        }`)
        await this.setState({ getBooksAll: getBooksAll.getProducts });

        var row = [];

        for(let i=0; i<getBooksAll.getProducts.length;i++){
            row[i]= await {name: getBooksAll.getProducts[i].name,
            description: getBooksAll.getProducts[i].description,
            price: getBooksAll.getProducts[i].price,
            quantity: getBooksAll.getProducts[i].quantity,
            categoryId: getBooksAll.getProducts[i].categoryId}
        }
        await this.setState({ rows: row });
        await this.setState({ status: true });
    };

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
          const rows = state.rows.slice();
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
          }
          return { rows };
        });
    };

    render() {
        return(
            <div>
                <h1>Catalog</h1>
                {!this.state.status
                ? <h3>Loading...</h3>
                : <ReactDataGrid
                    columns={columns}
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={10}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    enableCellSelect={true}
                />}
            </div>
        );
    };
};

// const mapStateToProps = ({ books }) =>  ({
//     books: books.items
// });

// const mapDispatchToProps = dispatch => ({
//     setBooks: books => dispatch(setBooks(books))
// });
// console.log(mapStateToProps);

  export default connect(/*mapStateToProps, mapDispatchToProps*/)(Catalog);
