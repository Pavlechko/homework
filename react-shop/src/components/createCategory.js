import React from "react";
// import { store } from '../reducers/books-reducer';
// import promiseActionsMaker from '../actions/actions';
// import ReactDataGrid from "react-data-grid";

import { GraphQLClient } from 'graphql-request'
const gql = new GraphQLClient("/graphql", { headers: {} });

// const columns = [
//     { key: "id", name: "Id", editable: true },
//     { key: "name", name: "Name", editable: true },

//   ];

class CreateCategory extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loader: false, name: "", /*getAllCatalogs: '', rows: ''*/ }
	}

	// async componentDidMount() {
    //     let getAllCatalogs = await gql.request(`query getCategories {
    //         getCategories {
    //           id,
    //           name

    //         }
    //     }`)
    //     await this.setState({ getAllCatalogs: getAllCatalogs.getCategories });

    //     var row = [];

    //     for(let i=0; i<getAllCatalogs.getCategories.length;i++){
    //         row[i]= await {id: getAllCatalogs.getCategories[i].id,
	// 			name: getAllCatalogs.getCategories[i].name
	// 			}
    //     }
    //     await this.setState({ rows: row });
    //     await this.setState({ status: true });
    // };

    // onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    //     this.setState(state => {
    //       const rows = state.rows.slice();
    //       for (let i = fromRow; i <= toRow; i++) {
    //         rows[i] = { ...rows[i], ...updated };
    //       }
    //       return { rows };
    //     });
    // };

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state.name);
		gql.request(`
			mutation createCategory($category: CategoryInput){
				createCategory(category: $category){
				  name
				}
			  }`, { name: this.state.name }
			)
		this.setState({name: ''})
		//store.dispatch(createCategory());
	}
	render() {
		return (
			<div>
				{/* <hr />
                <h1>Categoty</h1>
                {!this.state.status
                ? <h3>Loading...</h3>
                : <ReactDataGrid
                    columns={columns}
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={5}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    enableCellSelect={true}
                />} */}
				<hr />
				<h3>form to create Category</h3>
				<label>name</label>
				<input type='text' value={this.state.name} onChange={evt => this.setState({ name: evt.target.value })} />
				<button onClick={this.handleSubmit}>Create...</button>
				<hr />
			</div>
		)
	}
}

export default CreateCategory;
