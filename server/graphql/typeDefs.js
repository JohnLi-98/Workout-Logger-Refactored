const { gql } = require("apollo-server");

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: Float!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        helloWorld: String
    }

    type Mutation {
        register(registerInput: RegisterInput) : User!
    }
`