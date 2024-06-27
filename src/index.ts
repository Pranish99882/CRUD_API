import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './graphql/schema';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 8000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
// REST API Routes
app.use('/api', userRoutes);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply GraphQL middleware
  app.use('/graphql', expressMiddleware(server));

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`GraphQL endpoint at http://localhost:${port}/graphql`);
  });
}

startServer();
