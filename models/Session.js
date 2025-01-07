const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  pagesVisited: [{ type: String }],
  actions: [{
    actionType: String,
    timestamp: { type: Date, default: Date.now }
  }],
  startTime: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  sessionDuration: {type: Number, default: 0},
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);