const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());

const API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:2490';

// Swagger UI served separately (expected by assignment)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: `${API_BASE_URL}/api/openapi.json`,
    },
  })
);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

const PORT = Number(process.env.PORT || 2456);
app.listen(PORT, () => {
  console.log(`Swagger docs running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`Using API spec from: ${API_BASE_URL}/api/openapi.json`);
});
