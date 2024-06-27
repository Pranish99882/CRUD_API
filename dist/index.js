"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const schema_1 = require("./graphql/schema");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middleware
app.use(body_parser_1.default.json());
// REST API Routes
app.use('/api', userRoutes_1.default);
// GraphQL Server Setup
const server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: schema_1.resolvers });
await server.start();
server.applyMiddleware({ app });
// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}${server.graphqlPath}`);
});
