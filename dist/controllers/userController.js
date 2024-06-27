"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
let users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phone: '0987654321' },
];
const getUsers = (req, res) => {
    res.json(users);
};
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.getUserById = getUserById;
const createUser = (req, res) => {
    const newUser = Object.assign({ id: users.length + 1 }, req.body);
    users.push(newUser);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if (userIndex !== -1) {
        users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), req.body);
        res.json(users[userIndex]);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.sendStatus(204);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.deleteUser = deleteUser;
