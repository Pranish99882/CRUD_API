import { gql } from 'apollo-server-express';
import { users } from '../controllers/userController'; // Ensure the users array is imported
import { User } from '../models/user'; // Ensure User model is imported

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, phone: String!): User!
    updateUser(id: ID!, firstName: String, lastName: String, email: String, phone: String): User
    deleteUser(id: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    users: () => users,
    user: (_: unknown, { id }: { id: string }) => users.find(user => user.id === Number(id)),
  },
  Mutation: {
    createUser: (_: unknown, { firstName, lastName, email, phone }: { firstName: string; lastName: string; email: string; phone: string }) => {
      const newUser = { id: users.length + 1, firstName, lastName, email, phone };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_: unknown, { id, firstName, lastName, email, phone }: { id: string; firstName: string; lastName: string; email: string; phone: string }) => {
      const userIndex = users.findIndex(user => user.id === Number(id));
      if (userIndex === -1) return null;
      
      const updatedUser = {
        ...users[userIndex],
        firstName: firstName || users[userIndex].firstName,
        lastName: lastName || users[userIndex].lastName,
        email: email || users[userIndex].email,
        phone: phone || users[userIndex].phone,
      };

      users[userIndex] = updatedUser;
      return updatedUser;
    },
    deleteUser: (_: unknown, { id }: { id: string }) => {
      const userIndex = users.findIndex(user => user.id === Number(id));
      if (userIndex === -1) return false;
      
      users.splice(userIndex, 1);
      return true;
    },
  },
};
