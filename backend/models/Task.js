import mongoose from "mongoose";
const start = Date.now()
const taskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: start
    }
});

export default mongoose.model("Task", taskSchema);