# TestProject Backend API

A Node.js/Express backend API for the TestProject application.

## Features

- User authentication (register/login) with JWT tokens
- Driver management (CRUD operations)
- Favorites and ratings system
- Role-based access control (personal, business, admin)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (requires auth)

### Drivers
- `GET /api/drivers` - Get all drivers (optional ?search=query)
- `GET /api/drivers/:id` - Get driver by ID
- `POST /api/drivers` - Create new driver (business/admin only)
- `PUT /api/drivers/:id` - Update driver (business/admin or creator)
- `DELETE /api/drivers/:id` - Delete driver (admin only)
- `GET /api/drivers/favorites/:userId` - Get user's favorite drivers
- `POST /api/drivers/:id/favorite` - Add/remove favorite
- `POST /api/drivers/:id/rate` - Rate a driver
- `GET /api/drivers/:id/rating` - Get driver rating info

### Health Check
- `GET /api/health` - Server health check

## Authentication

Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## User Types

- **personal**: Basic user, can view drivers and manage favorites/ratings
- **business**: Can create and edit drivers
- **admin**: Full access including deleting drivers

## Data Storage

Currently uses in-memory storage. For production, replace with a database like MongoDB or PostgreSQL.
