const Workout = require("../../models/Workout");

const checkAuth = require("../../utils/check-auth");

module.exports = {
    Query: {
        async getAllWorkoutLogs(_, __, context) {
            const { username } = checkAuth(context);

            try {
                const userWorkouts = await Workout.find({ username: username }).sort({
                    createdAt: -1
                });
                return userWorkouts;
            } catch (error) {
                throw new Error(err);
            }
        },

        async getWorkoutLog(_, { workoutId }, context) {
            const { username } = checkAuth(context);

            try {
                const workoutLog = await Workout.findById(workoutId);
                if (workoutLog && workoutLog.username === username) {
                    return workoutLog;
                } else {
                    throw new Error("Log for this workout not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getMostRecentWorkout(_, __, context) {
            const { username } = checkAuth(context);

            try {
                const workout = await Workout.findOne({
                    username: username,
                }).sort({ createdAt: -1 });
                return [workout];
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}