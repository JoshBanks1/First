# StripeCore MVP

StripeCore is a production-oriented MVP for a task-and-reward platform where users earn by completing advertiser-funded tasks. The platform includes secure auth, walleting, referrals, postback ingestion, withdrawals, and an admin panel.

## Monorepo Layout

- `server/` Express + PostgreSQL + Sequelize + Redis-ready backend
- `client/` React + Vite + Tailwind frontend

## Features

- JWT auth (access + refresh)
- Password hashing with bcrypt
- Wallet credit/debit with DB transactions
- Mock tasks and test task completion credit
- Referral system with first-task bonus
- Offerwall postback endpoint with signature validation and duplicate protection
- Withdrawal request + admin approve/reject flow
- Admin overview (users, balances, withdrawals, logs)
- Fraud controls (login rate limit, IP logging, account-per-IP cap)
- Security headers via Helmet

## Environment Variables

Copy `server/.env.example` and provide:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `REDIS_URL`
- `POSTBACK_SECRET`
- `PAYSTACK_SECRET`
- `ACCESS_TOKEN_EXPIRES`
- `REFRESH_TOKEN_EXPIRES`
- `MIN_WITHDRAWAL`
- `MAX_ACCOUNTS_PER_IP`
- `CORS_ORIGIN`

## Local Setup

### Backend

```bash
cd server
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## Seeded Test Data

- Admin: `admin@stripecore.com` / `Admin123!`
- 5 test users (`user1@...` to `user5@...`, same password)
- 10 mock tasks
- 3 mock transactions per user

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/user/dashboard`
- `GET /api/user/tasks`
- `POST /api/user/tasks/complete`
- `GET /api/user/referrals`
- `POST /api/postback`
- `POST /api/withdrawals`
- `PATCH /api/withdrawals/:id/approve`
- `PATCH /api/withdrawals/:id/reject`
- `GET /api/admin/overview`

## Deployment Guide (High-Level)

1. Provision PostgreSQL and Redis.
2. Set production env vars for backend and frontend API base URL.
3. Run Sequelize migrations and seeders in target environment.
4. Deploy backend behind HTTPS reverse proxy (Nginx/Caddy).
5. Build frontend (`npm run build`) and serve static bundle.
6. Configure log monitoring and alerting for postback failures.

## Business Rules Enforced

- No user deposits, ROI, or investment earnings.
- Earnings originate from task completion and advertiser postbacks.
- Withdrawals require admin review.
- Fraud checks can suspend accounts and limit multi-accounting by IP.
