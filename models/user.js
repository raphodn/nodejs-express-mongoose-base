const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  country: String,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
