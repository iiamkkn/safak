const mongoose = require('mongoose');

const userVeriificationSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  uniqueString: {
    type: String,
  },
  createdAt: { type: Date },
  expiresAt: { type: Date },
});

module.exports = mongoose.model('UserVerification', userVeriificationSchema);
