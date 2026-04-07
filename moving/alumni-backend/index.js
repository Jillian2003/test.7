const express = require('express');
const mongoose = require('./db'); // MongoDB connection
const { Major, Opportunity, User } = require('./models');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());

// Allow browser-based clients (React) to call the API.
app.use(cors());

// -------------------------
// API base route
// -------------------------
app.get(['/api', '/api/'], (req, res) => {
  res.json({ ok: true });
});

// -------------------------
// Majors routes
// -------------------------

/**
 * @swagger
 * /api/majors:
 *   get:
 *     summary: Get all majors
 *     responses:
 *       200:
 *         description: List of majors
 */
async function getMajors(req, res) {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.get(['/api/majors', '/majors'], getMajors);

/**
 * @swagger
 * /api/majors:
 *   post:
 *     summary: Create a new major
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Major created
 */
async function createMajor(req, res) {
  try {
    const major = new Major(req.body);
    await major.save();
    res.status(201).json(major);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

app.post(['/api/majors', '/majors'], createMajor);

// -------------------------
// Opportunities routes
// -------------------------

/**
 * @swagger
 * /api/opportunities:
 *   get:
 *     summary: Get all opportunities
 *     responses:
 *       200:
 *         description: List of opportunities
 */
async function getOpportunities(req, res) {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.get(['/api/opportunities', '/opportunities'], getOpportunities);

/**
 * @swagger
 * /api/opportunities:
 *   post:
 *     summary: Create a new opportunity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - posted_by
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               posted_by:
 *                 type: string
 *               type:
 *                 type: string
 *               needs_approval:
 *                 type: boolean
 *               approved:
 *                 type: boolean
 *               approved_by:
 *                 type: string
 *               is_paid:
 *                 type: boolean
 *               amount:
 *                 type: string
 *     responses:
 *       201:
 *         description: Opportunity created
 */
async function createOpportunity(req, res) {
  try {
    const opp = new Opportunity(req.body);
    await opp.save();
    res.status(201).json(opp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

app.post(['/api/opportunities', '/opportunities'], createOpportunity);

// -------------------------
// Users routes
// -------------------------

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
async function getUsers(req, res) {
  try {
    const users = await User.find().populate('major'); // <--- Populates major name
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.get(['/api/users', '/users'], getUsers);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - major
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               major:
 *                 type: string
 *                 description: Major ID
 *     responses:
 *       201:
 *         description: User created
 */
async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    const populatedUser = await User.findById(user._id).populate('major');
    res.status(201).json(populatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

app.post(['/api/users', '/users'], createUser);

// -------------------------
// OpenAPI JSON (Swagger spec)
// -------------------------
const PUBLIC_API_BASE_URL =
  process.env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:2490';

const openApiOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WebApp API',
      version: '1.0.0',
      description: 'API for Users, Majors, and Opportunities',
    },
    servers: [{ url: PUBLIC_API_BASE_URL }],
  },
  apis: ['./index.js'],
};

const openApiSpec = swaggerJsdoc(openApiOptions);

app.get(['/api/openapi.json', '/openapi.json'], (req, res) => {
  res.json(openApiSpec);
});

// -------------------------
// Start server
// -------------------------
const PORT = process.env.PORT || 2490;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
