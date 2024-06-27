// src/models/user.ts
import Joi from 'joi';

export const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required()
});



export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

