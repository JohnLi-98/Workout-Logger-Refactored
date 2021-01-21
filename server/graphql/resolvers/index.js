const usersResolver = require("./users");

module.exports = {
    Query: {
        helloWorld() {
            console.log("Hello World!");
        }
    },

    Mutation: {
        ...usersResolver.Mutation,
    }
}