const { model, Schema } = require("mongoose");

const workoutSchema = new Schema({
    workoutName: String,
    username: String,
    createdAt: Number,
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],
    notes: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = model("Workout", workoutSchema);