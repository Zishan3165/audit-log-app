import mongoose from 'mongoose';

// schema
const siteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: Date, required: false },
  lat: { type: Number, required: true },
  long: { type: Number, required: true }
});

//reference model
const Site = mongoose.model('Site', siteSchema);

export default Site;
