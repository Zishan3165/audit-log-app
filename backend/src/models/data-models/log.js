import mongoose from 'mongoose';

// schema
const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    index: true
  },
  createdAt: { type: Date, required: true },
  action: { type: String, required: true, index: true },
  details: { type: Object, required: true }
});

//reference model
const Log = mongoose.model('Log', logSchema);

export default Log;
