// tests/integration/userRoutes.test.ts
import request from 'supertest';
import app from '../../src/index';
// import { describe, it, expect,beforeEach, beforeAll,afterAll, jest } from "@jest/globals";
import {users} from '../../src/controllers/userController';

describe('User Routes', () => {

    // beforeEach(() => {
    //     // Reset users array or add a default user if needed
    //     users.length = 0;
    //     users.push({
    //       id: 1,
    //       firstName: 'John',
    //       lastName: 'Doe',
    //       email: 'john@example.com',
    //       phone: '1234567890',
    //     });
    //   });


  it('should fetch all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should fetch a single user by ID', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should create a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    };
    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
  });

  it('should update an existing user', async () => {
    const updatedUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '0987654321',
    };
    const response = await request(app).patch('/api/users/1').send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedUser);
  });


  it('should delete a user', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.status).toBe(204);
    // expect(response.body).toBe(true);

  });
});
