module.exports = {
  apps: [
    {
      name: 'alumni-api',
      cwd: __dirname,
      script: 'index.js',
      env: {
        PORT: 2490,
        // Set this on the server so Swagger 'Try it out' uses the public URL.
        // Example: http://143.193.156.46:2490
        PUBLIC_API_BASE_URL:
          process.env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:2490',
      },
    },
    {
      name: 'alumni-swagger',
      cwd: __dirname,
      script: 'swagger-server.js',
      env: {
        PORT: 2456,
        API_BASE_URL: 'http://127.0.0.1:2490',
      },
    },
  ],
};
