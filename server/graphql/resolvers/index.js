const usersResolver = require("./users");
const setResolver = require("./set");
const exerciseResolver = require("./exercise");
const workoutResolver = require("./workout");

module.exports = {
    Query: {
        ...workoutResolver.Query,
        ...exerciseResolver.Query
    },

    Mutation: {
        ...usersResolver.Mutation,
        ...setResolver.Mutation,
        ...exerciseResolver.Mutation
    }
}