# Deploy checklist (Droplet / PM2)

This project is set up to match the assignment's port layout:
- Frontend: port 80 (nginx)
- Swagger docs: port 2456
- API: port 2490

The backend in this workspace provides:
- API routes under `/api/*`
- OpenAPI JSON at `/api/openapi.json`
- Separate Swagger UI server at `:2456/api-docs/`

## 1) Copy these files to the server

Backend (required):
- moving/alumni-backend/index.js
- moving/alumni-backend/swagger-server.js
- moving/alumni-backend/ecosystem.config.cjs
- moving/alumni-backend/package.json
- moving/alumni-backend/package-lock.json (recommended)
- moving/alumni-backend/seed.js

Frontend (recommended so local + deploy match):
- moving/alumni-frontend/src/index.js
- moving/alumni-frontend/src/pages/Users.js
- moving/alumni-frontend/src/pages/Profile.js

Gitignore (optional):
- moving/.gitignore
- moving/alumni-backend/.gitignore

## 2) On the Droplet: install + seed + start via PM2

From your backend folder on the Droplet:

- npm install
- cp .env.example .env   (then set MONGO_URI in .env)
- npm run seed
- PUBLIC_API_BASE_URL="http://<YOUR_PUBLIC_IP>:2490" pm2 start ecosystem.config.cjs
- pm2 list
- pm2 save

If you have duplicates, you can clean them up (be careful):
- pm2 delete <id>
- pm2 save

## 3) Verify the backend is fixed

Run these from your laptop (PowerShell):

- Invoke-WebRequest -UseBasicParsing "http://<YOUR_PUBLIC_IP>:2490/api/users" | Select-Object -Expand StatusCode
- Invoke-WebRequest -UseBasicParsing "http://<YOUR_PUBLIC_IP>:2490/api/majors" | Select-Object -Expand StatusCode
- Invoke-WebRequest -UseBasicParsing "http://<YOUR_PUBLIC_IP>:2490/api/opportunities" | Select-Object -Expand StatusCode

Swagger check:
- Invoke-WebRequest -UseBasicParsing "http://<YOUR_PUBLIC_IP>:2456/api-docs/" | Select-Object -Expand StatusCode

Expected:
- `/api/*` endpoints return 200 and JSON
- Swagger `/api-docs/` returns 200

## 4) Notes

Swagger runs as a separate PM2 process and is served at:
- http://<YOUR_PUBLIC_IP>:2456/api-docs/
