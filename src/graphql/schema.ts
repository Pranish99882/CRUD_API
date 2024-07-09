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
    users: (): User[] => users, // Explicitly define the return type as User[]
    user: (_: unknown, { id }: { id: string }): User | undefined => users.find((user: User) => user.id === Number(id)),
  },
  Mutation: {
    createUser: (_: unknown, { firstName, lastName, email, phone }: { firstName: string; lastName: string; email: string; phone: string }): User => {
      const newUser: User = { id: users.length + 1, firstName, lastName, email, phone };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_: unknown, { id, firstName, lastName, email, phone }: { id: string; firstName?: string; lastName?: string; email?: string; phone?: string }): User | null => {
      const userIndex = users.findIndex((user: User) => user.id === Number(id));
      if (userIndex === -1) return null;
      
      const updatedUser: User = {
        ...users[userIndex],
        firstName: firstName || users[userIndex].firstName,
        lastName: lastName || users[userIndex].lastName,
        email: email || users[userIndex].email,
        phone: phone || users[userIndex].phone,
      };

      users[userIndex] = updatedUser;
      return updatedUser;
    },
    deleteUser: (_: unknown, { id }: { id: string }): boolean => {
      const userIndex = users.findIndex((user: User) => user.id === Number(id));
      if (userIndex === -1) return false;
      
      users.splice(userIndex, 1);
      return true;
    },
  },
};