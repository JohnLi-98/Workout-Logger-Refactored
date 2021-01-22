const checkAuth = require("../../utils/check-auth");
const Exercise = require("../../models/Exercise");

module.exports = {
    Query: {
        async getAllExerciseLogs(_, __, context) {
            const { username } = checkAuth(context);

            try {
                const allExerciseLogs = await Exercise.find({
                    username: username
                }).sort({ createdAt: -1 });
                return allExerciseLogs;
            } catch(err) {
                throw new Error(err);
            }
        },

        async getExerciseLog(_, { exerciseId }, context) {
            const { username } = checkAuth(context);

            try {
                const exerciseLog = await Exercise.findById(exerciseId);
                if (exerciseLog && exerciseLog.username === username) {
                    return exerciseLog;
                } else {
                    throw new Error("Log for this exercise not found");
                }
            } catch(err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        async addExercise(_, { exerciseName }, context) {
            const user = checkAuth(context);

            if (exerciseName.trim() === "") {
                throw new UserInputError("Empty Field", {
                    errors: {
                        exerciseName: "Enter the exercise name"
                    }
                });
            }

            const exerciseExists = await Exercise.find({
                exerciseName: exerciseName,
                username: user.username
            });

            if (exerciseExists.length !== 0) {
                throw new Error("Already exists", {
                    errors: {
                        exerciseName: "This exercise already exists"
                    }
                })
            } else {
                const newExercise = new Exercise({
                    exerciseName,
                    user: user.id,
                    username: user.username,
                    createdAt: Date.now()
                });
                const exercise = await newExercise.save();
                return exercise;
            }
        }
    }
}