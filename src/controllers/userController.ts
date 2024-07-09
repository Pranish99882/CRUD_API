import { Request, Response } from 'express';
import { User } from '../models/user';

export let users: User[] = [
  { id: 1, firstName: 'Anish', lastName: 'Karki', email: 'anish@uba.com', phone: '1234567890' },
  { id: 2, firstName: 'Manish', lastName: 'Karki', email: 'manish@uba.com', phone: '0987654321' },
];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const user = users.find(user => user.id === Number(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = (req: Request, res: Response) => {
  const newUser: User = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const userIndex = users.findIndex(user => user.id === Number(req.params.id));
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const userIndex = users.findIndex(user => user.id === Number(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
