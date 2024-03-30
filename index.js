require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/user');


const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(process.env.MONGODB,{useNewUrlParser: true})
    .then(()=>{
        console.log("MongoDB connected");
        return server.listen({port:process.env.PORT})
    })
    .then(res=>{
        console.log("Server is running at port 4000...");
    })