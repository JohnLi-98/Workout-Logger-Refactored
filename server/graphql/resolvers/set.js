const { UserInputError } = require("apollo-server");

const { validateLogSetInput } = require("../../utils/validators");
const checkAuth = require("../../utils/check-auth");
//const Set = require("../../models/Set");
const Exercise = require("../../models/Exercise");
const Workout = require("../../models/Workout");

module.exports = {
    Mutation: {
        async logSet(
            _,
            { logSetInput: { exerciseName, weight, reps, notes } },
            context
        ) {
            const { errors, valid } = validateLogSetInput(exerciseName, weight, reps);
            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }

            const user = checkAuth(context);

            const set = {
                weight,
                reps,
                createdAt: Date.now(),
                notes
            };
            const newExercise = new Exercise({
                exerciseName,
                user: user.id,
                username: user.username
            });

            /**
             * Check to see if the exercise has been done before by the user. If it has, then update the entry by adding the set data to it. If not create a new entry for the
             * exercise and then add the data to it.
             */
            let exercise = await Exercise.findOne({
                exerciseName: exerciseName,
                username: user.username,
            });
            if (!exercise) {
                exercise = await newExercise.save();
            }
            exercise.sets.unshift(set);
            await exercise.save();

            /**
             * Get the most recent workout from the user and check if the time it was done was from the last 4 hours. If it wasn't, create a new workout entry for the user.
             * If it was within the ast 4 hours, check to see if the workout has an exercise that matches with one the user inputted. If there isn't an exercise, create a new 
             * entry and add the set data to it, otherwise update the existing entry for the exercise.
             */
            const now = Date.now();
            let workout = await Workout.findOne({ username: user.username }).sort({
                createdAt: -1,
            });
            if (!workout || now > workout.createdAt + 14400000) {
                const newWorkout = new Workout({
                    user: user.id,
                    username: user.username,
                    createdAt: Date.now(),
                    exercises: [
                        newExercise
                    ]
                });
                newWorkout.exercises
                workout = await newWorkout.save();
                console.log("created new workout");
            }

            /*
            const found = workout.exercises.some(
                (el) => el.exerciseName === exerciseName
            );
            if (!found) {
                console.log("There wasn't a exercise with this name");
                workout.exercises.unshift(newExercise);
            }

            let matchedExercise = workout.exercises.find(
                (e) => e.exerciseName === exerciseName
            );
            matchedExercise.sets.unshift(newSet);
            await workout.save();
            return newSet;
            */

            /*
            const newSet = new Set({
                weight,
                reps,
                createdAt: Date.now(),
                notes
            });
            const newExercise = new Exercise({
                exerciseName,
                user: user.id,
                username: user.username
            });
            const newWorkout = new Workout({
                user: user.id,
                username: user.username,
                createdAt: Date.now()
            });
            */


            /**
             * Get the most recent workout from the user and check if the time it was done was from the last 4 hours. If it wasn't, create a new workout entry for the user.
             * If it was within the ast 4 hours, check to see if the workout has an exercise that matches with one the user inputted. If there isn't an exercise, create a new 
             * entry and add the set data to it, otherwise update the existing entry for the exercise.
             */
            /*
            const now = Date.now();
            let workout = await Workout.findOne({ username: user.username }).sort({
                createdAt: -1,
            });
            if (!workout || now > workout.createdAt + 14400000) {
                workout = await newWorkout.save();
            }

            const found = workout.exercises.some(
                (el) => el.exerciseName === exerciseName
            );
            if (!found) {
                console.log("There wasn't a exercise with this name");
                workout.exercises.unshift(newExercise);
            }

            let matchedExercise = workout.exercises.find(
                (e) => e.exerciseName === exerciseName
            );
            matchedExercise.sets.unshift(newSet);
            await workout.save();
            */

            /**
             * Check to see if the exercise has been done before by the user. If it has, then update the entry by adding the set data to it. If not create a new entry for the
             * exercise and then add the data to it.
             */
            /*
            let exercise = await Exercise.findOne({
                exerciseName: exerciseName,
                username: user.username,
            });
            if (!exercise) {
                exercise = await newExercise.save();
            }
            exercise.sets.unshift(newSet);
            await exercise.save();
            return newSet;
            */
        },

        async deleteSet(_, { workoutId, exerciseId, setId }, context) {
            const { username } = checkAuth(context);

            const workout = await Workout.findById(workoutId);
            if (workout) {
                const exerciseIndex = workout.exercises.findIndex((exercise) => exercise.id === exerciseId);
                const setIndex = workout.exercises[exerciseIndex].sets.findIndex((set) => set.id === setId);
                if (workout.username === username) {
                    workout.exercises[exerciseIndex].sets.splice(setIndex, 1);
                    await workout.save();
                }
            } else {
                throw new UserInputError("Workout not found");
            }

            const exercise = await Exercise.findById(exerciseId);
            if (exercise) {
                const setIndex = exercise.sets.findIndex((set) => set.id === setId);
                if (exercise.username === username) {
                    exercise.sets.splice(setIndex, 1);
                    await exercise.save();
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } else {
                throw new UserInputError("Exercise not found");
            }
        },

        /*
        async editSet(
            _,
            { workoutId, exerciseId, setId, weight, reps, notes },
            context
            ) {
        }
        */
    }
}
