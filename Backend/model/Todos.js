const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    // description: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    expirationDate: { type: Date }
  });
module.exports = mongoose.model("Todo", todoSchema);
