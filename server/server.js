//dependencies
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

//create middleware
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

//server connection
const app = express();
const PORT = process.env.PORT || 3001;

//creating server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

//importing type defs
const { typeDefs, resolvers } = require('./schemas');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
server.start().then(() => {
  server.applyMiddleware({ app });
});

// npm run build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
