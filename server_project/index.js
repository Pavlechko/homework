const express = require('express');
const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const expressJwt = require('express-jwt');
// const jwt = require('jsonwebtoken');

const { buildSchema } = require('graphql');
const express_graphql = require('express-graphql');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:62886288@localhost/project');

class User extends Sequelize.Model {}
User.init({
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    login: Sequelize.STRING,
    account_type: Sequelize.STRING
}, { sequelize, modelName: 'user' });

class  Purchase extends Sequelize.Model {}
Purchase.init({
    date_purchase: Sequelize.DATE,
    price_purchase: Sequelize.DECIMAL,
    quantity_of_products: Sequelize.INTEGER
}, { sequelize, modelName: 'purchase' });

User.hasMany(Purchase);
Purchase.belongsTo(User);

class ProductPurchase extends Sequelize.Model {}
ProductPurchase.init({
    price: Sequelize.DECIMAL,
    count: Sequelize.INTEGER
}, { sequelize, modelName: 'productPurchase'});

class Product extends Sequelize.Model {}
Product.init({
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    price: Sequelize.DECIMAL,
    quantity: Sequelize.INTEGER
}, { sequelize, modelName: 'product' });

Product.belongsToMany(Purchase, { through: ProductPurchase });
Purchase.belongsToMany(Product, { through: ProductPurchase });

class Category extends Sequelize.Model {}
Category.init({
    name: Sequelize.STRING
}, { sequelize, modelName: 'category'});

Product.belongsTo(Category);
Category.hasMany(Product);
Category.hasMany(Category);
Category.belongsTo(Category);

let schema = buildSchema(`
    type Query {
        getUsers(query: String): [User]
        getOneUser(query: String): User
        getPurchases(query: String): [Purchase]
        getOnePurchase(query: String): Purchase
        getProducts(query: String): [Product]
        getOneProduct(query: String): Product
        getCategories(query: String): [Category]
        getOneCategory(query: String): Category
        getProductPurchase(query: String): [ProductPurchase]
        getOneProductPurchase(query: String): ProductPurchase
    }
    type Mutation {
        UserDelete(user: UserInput): User
        UserUpsert(user: UserInput): User
        PurchaseUpsert(purchase: PurchaseInput): Purchase
        PurchaseDelete(purchase: PurchaseInput): Purchase
        ProductDelete(product: ProductInput): Product
        ProductUpsert(product: ProductInput): Product
        CategoryDelete(category: CategoryInput): Category
        CategoryUpsert(category: CategoryInput): Category
        ProductPurchaseDelete(productPurchase: ProductPurchaseInput): ProductPurchase
        ProductPurchaseUpsert(productPurchase: ProductPurchaseInput): ProductPurchase
        createProduct(product: ProductInput): Product
        createUser(user: UserInput): User
        createCategory(category: CategoryInput): Category
    }
    type User {
        id: Int
        username: String
        login: String
        account_type: String
        createdAt: String
        updatedAt: String
        purchases: [Purchase]
    }
    input UserInput {
        username: String
        login: String
        account_type: String
        password: String
    }
    type Purchase {
        id: ID
        createdAt: String
        productPurchases: [ProductPurchase]
        total: Float
    }
    input PurchaseInput {
        productPurchases: [ProductPurchaseInput]
    }
    type Product {
        id: ID
        createdAt: String
        name: String
        description: String
        price: Float
        quantity: Float
        productPurchases: [ProductPurchase]
        categories: [Category]
    }
    input ProductInput {
        name: String!
        description: String!
        price: Float!
        quantity: Float!
        categories: [CategoryInput]
    }
    type Category {
        id: ID
        createdAt: String
        name: String
        products: [Product]
    }
    input CategoryInput {
        name: String!
        products: [ProductInput]
    }
    type ProductPurchase {
        id: ID
        createdAt: String
        price: Float
        count: Float
        product: Product
        purchase: Purchase
    }
    input ProductPurchaseInput {
        count: Int
        products: [ProductInput]
        purchases: [PurchaseInput]
    }
`);

//INSERT INTO categories (name, createdAt, updatedAt) VALUES("Test1", NOW(), NOW());

async function getUsers(){
    return await User.findAll({})
}

async function getProducts(){
    return await Product.findAll({})
}

async function getPurchases(){
    return await Purchase.findAll({})
}

async function getCategories(){
    return await Category.findAll({})
}

var root = {
    getUsers,
    getProducts,
    getPurchases,
    getCategories,
};


app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
    }));

;(async () => {
    await sequelize.sync()
})()

app.listen(4000, () => console.log('localhost:4000/graphql'));