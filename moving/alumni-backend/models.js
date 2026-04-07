const mongoose = require('./db');

// Major schema
const MajorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Major = mongoose.model('Major', MajorSchema);

// Opportunity schema
const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  posted_by: { type: String, required: true },   // user_name of poster
  type: { type: String, required: true },        // e.g., "job" or "internship"
  description: { type: String, required: true },
  needs_approval: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  approved_by: { type: String, default: null },
  is_paid: { type: Boolean, default: false },
  amount: { type: String, default: null }
});
const Opportunity = mongoose.model('Opportunity', OpportunitySchema);

// User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  year_graduated: { type: Number, required: true },
  email: { type: String, required: true },
  major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true },
  company: { type: String, default: null },
  title: { type: String, default: null },
  linkedin_link: { type: String, default: null }
});
const User = mongoose.model('User', UserSchema);

module.exports = { Major, Opportunity, User };
