"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    };
};
exports.validationMiddleware = validationMiddleware;
