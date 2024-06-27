"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
// src/models/user.ts
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(30).required(),
    lastName: joi_1.default.string().min(2).max(30).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().pattern(/^[0-9]+$/).min(10).max(15).required()
});
