const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


// Require users routes
const userRoutes = require('./src/routes/user.routes')

// using as middleware
app.use('/api/users', userRoutes)


app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});