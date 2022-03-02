import mongoose from 'mongoose';

// schema
const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  },
  createdAt: { type: Date, required: true },
  action: { type: String, required: true },
  details: { type: Object, required: true }
});

//reference model
const Log = mongoose.model('Log', logSchema);

export default Log;
