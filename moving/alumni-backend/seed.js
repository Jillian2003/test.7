const mongoose = require('./db');
const { Major, Opportunity, User } = require('./models');

async function ensureMajors() {
  const existing = await Major.find();
  if (existing.length >= 4) return existing;

  const names = ['Computer Science', 'Business', 'Biology', 'Psychology'];
  const toCreate = names
    .filter(n => !existing.some(m => m.name === n))
    .map(name => ({ name }));

  if (toCreate.length === 0) return existing;
  await Major.insertMany(toCreate);
  return Major.find();
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

async function ensureUsers(majors) {
  const count = await User.countDocuments();
  const target = 16;
  if (count >= target) return;

  const majorsByIndex = majors.length ? majors : await Major.find();
  const docs = [];

  for (let i = count; i < target; i += 1) {
    const idx = i + 1;
    const major = majorsByIndex[i % majorsByIndex.length];
    docs.push({
      username: `user${pad2(idx)}`,
      first_name: `First${pad2(idx)}`,
      last_name: `Last${pad2(idx)}`,
      year_graduated: 2010 + (i % 15),
      email: `user${pad2(idx)}@example.com`,
      major: major._id,
      company: `Company${(i % 5) + 1}`,
      title: `Title${(i % 4) + 1}`,
      linkedin_link: `https://linkedin.com/in/user${pad2(idx)}`,
    });
  }

  await User.insertMany(docs);
}

async function ensureOpportunities() {
  const count = await Opportunity.countDocuments();
  const target = 16;
  if (count >= target) return;

  const docs = [];
  for (let i = count; i < target; i += 1) {
    const idx = i + 1;
    docs.push({
      title: `Opportunity ${pad2(idx)}`,
      posted_by: `user${pad2(((i % 16) + 1))}`,
      type: i % 2 === 0 ? 'job' : 'internship',
      description: `Description for opportunity ${idx}.`,
      needs_approval: false,
      approved: true,
      approved_by: null,
      is_paid: i % 3 !== 0,
      amount: i % 3 !== 0 ? `$${(15 + i)}/hr` : null,
    });
  }

  await Opportunity.insertMany(docs);
}

async function main() {
  await mongoose.connection.asPromise();
  console.log('Connected; seeding…');

  const majors = await ensureMajors();
  await ensureUsers(majors);
  await ensureOpportunities();

  const totals = await Promise.all([
    Major.countDocuments(),
    User.countDocuments(),
    Opportunity.countDocuments(),
  ]);

  console.log(`Majors: ${totals[0]}`);
  console.log(`Users: ${totals[1]}`);
  console.log(`Opportunities: ${totals[2]}`);

  await mongoose.disconnect();
}

main().catch(async err => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
