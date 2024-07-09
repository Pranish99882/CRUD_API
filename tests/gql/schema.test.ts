
import request from 'supertest';
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '../../src/graphql/schema';
import express from 'express';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
// import { describe, it, expect, beforeAll,afterAll, jest } from "@jest/globals";

let app: express.Application;
let server: ApolloServer;

beforeAll(async () => {
  app = express();
  app.use(bodyParser.json());

  server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server));//apollo-server-testing: Provides utilities like createTestClient to test your Apollo Server without needing an HTTP server.
                                                  // This allows you to simulate queries and mutations directly.


});

afterAll(async () => {
  await server.stop();
});

describe('GraphQL API', () => {
  it('should fetch all users', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            users {
              id
              firstName
              lastName
              email
              phone
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('users');
  });

  it('should fetch a single user by ID', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            user(id: "1") {
              id
              firstName
              lastName
              email
              phone
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('user');
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createUser(firstName: "John", lastName: "Doe", email: "john@example.com", phone: "1234567890") {
              id
              firstName
              lastName
              email
              phone
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('createUser');
    expect(response.body.data.createUser).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
    });
  });

  it('should update an existing user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateUser(id: "1", firstName: "Jane", lastName: "Smith", email: "jane@example.com", phone: "0987654321") {
              id
              firstName
              lastName
              email
              phone
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('updateUser');
    expect(response.body.data.updateUser).toMatchObject({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '0987654321',
    });
  });

  it('should delete a user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            deleteUser(id: "1")
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('deleteUser', true);
  });
});


//It seems like there's a dependency conflict between graphql versions required by apollo-server-testing and your project's graphql version (^16.9.0). 
//The error indicates that apollo-server-testing expects a different range of graphql versions (^0.12.0 || ^0.13.0 || ^14.0.0 || ^15.0.0) than what your project is currently using.