"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const userController_1 = require("../controllers/userController"); // Make sure to adjust the import to where your users array is actually defined
// GraphQL Schema Definition
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, phone: String!): User
    updateUser(id: ID!, firstName: String, lastName: String, email: String, phone: String): User
    deleteUser(id: ID!): Boolean
  }
`;
// Resolvers for the GraphQL schema
exports.resolvers = {
    Query: {
        users: () => userController_1.users,
        user: (_, { id }) => userController_1.users.find(user => user.id === Number(id)),
    },
    Mutation: {
        createUser: (_, { firstName, lastName, email, phone }) => {
            const newUser = {
                id: userController_1.users.length + 1,
                firstName,
                lastName,
                email,
                phone,
            };
            userController_1.users.push(newUser);
            return newUser;
        },
        updateUser: (_, { id, firstName, lastName, email, phone }) => {
            const userIndex = userController_1.users.findIndex(user => user.id === Number(id));
            if (userIndex === -1) {
                throw new Error('User not found');
            }
            const updatedUser = Object.assign(Object.assign({}, userController_1.users[userIndex]), { firstName, lastName, email, phone });
            userController_1.users[userIndex] = updatedUser;
            return updatedUser;
        },
        deleteUser: (_, { id }) => {
            const userIndex = userController_1.users.findIndex(user => user.id === Number(id));
            if (userIndex === -1) {
                throw new Error('User not found');
            }
            userController_1.users.splice(userIndex, 1);
            return true;
        },
    },
};
