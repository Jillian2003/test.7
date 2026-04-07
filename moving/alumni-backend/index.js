const express = require('express');
const mongoose = require('./db'); // MongoDB connection
const { Major, Opportunity, User } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// -------------------------
// Majors routes
// -------------------------

/**
 * @swagger
 * /majors:
 *   get:
 *     summary: Get all majors
 *     responses:
 *       200:
 *         description: List of majors
 */
app.get('/majors', async (req, res) => {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /majors:
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
app.post('/majors', async (req, res) => {
  try {
    const major = new Major(req.body);
    await major.save();
    res.status(201).json(major);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------
// Opportunities routes
// -------------------------

/**
 * @swagger
 * /opportunities:
 *   get:
 *     summary: Get all opportunities
 *     responses:
 *       200:
 *         description: List of opportunities
 */
app.get('/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /opportunities:
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
app.post('/opportunities', async (req, res) => {
  try {
    const opp = new Opportunity(req.body);
    await opp.save();
    res.status(201).json(opp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------
// Users routes
// -------------------------

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().populate('major'); // <--- Populates major name
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/**
 * @swagger
 * /users:
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
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const populatedUser = await User.findById(user._id).populate('major');
    res.status(201).json(populatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------
// Swagger setup
// -------------------------
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WebApp API",
      version: "1.0.0",
      description: "API for Users, Majors, and Opportunities",
    },
    servers: [
      { url: "http://143.198.156.64:3000" },
    ],
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// -------------------------
// Start server
// -------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
