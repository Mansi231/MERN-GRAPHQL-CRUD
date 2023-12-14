const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer, gql } = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const typeDefs = require('../typeDefs/typedefs')
const resolvers = require('../resolvers/resolvers')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// connect to db 

const db = mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connection successfull')
}).catch((err) => { console.log(err, '-----failed connection') })


const server = new ApolloServer({
    typeDefs:typeDefs, resolvers :resolvers
})

const startApolloServer = server.start().then(()=>{

    app.use(bodyParser.json())
    app.use(cors())
    app.use('/graphql',expressMiddleware(server))
    app.listen(process.env.PORT,()=>console.log(`listening to port ${process.env.PORT}`))

}).catch((err)=>console.log(err,'---err---'))

module.exports = {startApolloServer,db}