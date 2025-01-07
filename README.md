
# Secure-Session : Session Management System

## Overview
A secure session management system handling user preferences and session tracking with support for both authenticated and guest users.

## Technology Stack
- Backend: Node.js & Express.js
- Database: MongoDB
- Session Store: connect-mongodb-session
- Validation: Joi
- Cookie Parser: cookie-parser

## Core Features

### 1. Session Management
- 30-minute automatic session expiry
- Session tracking with activity logging
- Cross-device synchronization for authenticated users
- Automatic cleanup of expired sessions

### 2. User Preferences
- Theme selection (dark/light)
- Notification settings (enabled/disabled)
- Language preferences
- Secure cookie-based storage

### 3. Security Features
- HttpOnly cookies
- Secure cookies in production
- SameSite cookie protection
- Session expiration
- Authentication middleware

## API Endpoints

### Authentication
```
POST /auth/register
- Register new user
Body: { username, password, preferences }

POST /auth/login
- User login
Body: { username, password }

GET /auth/logout
- User logout
```

### Session Management
```
POST /session
- Start new session
Response: { sessionId, startTime }

GET /session
- Get session details
Response: { pagesVisited, actions, startTime, duration }

POST /session/page
- Log page visit
Body: { page, action }
Query: ?page=1 (for pagination)

DELETE /session
- End current session
```

### Preferences
```
POST /preferences
- Save user preferences
Body: {
    "theme": "dark|light",
    "notifications": "enabled|disabled",
    "language": "string"
}

GET /preferences
- Retrieve user preferences
```

## Data Models

### User Schema
```javascript
{
    username: String (required, unique),
    password: String (required),
    preferences: {
        theme: String (default: 'light'),
        notifications: String (default: 'enabled'),
        language: String (default: 'English')
    }
}
```

### Session Schema
```javascript
{
    userId: ObjectId (optional),
    pagesVisited: [String],
    actions: [{
        actionType: String,
        timestamp: Date
    }],
    startTime: Date,
    lastActivity: Date,
    sessionDuration: Number
}
```

## Security Measures
1. Session Timeout: Automatic expiry after 30 minutes of inactivity
2. Secure Cookie Configuration:
   - HttpOnly: Prevents client-side access
   - Secure: HTTPS-only in production
   - SameSite: Protection against CSRF attacks
3. Regular cleanup of expired sessions
4. Authentication middleware for protected routes

## Error Handling
- Standard HTTP status codes
- Consistent error response format
- Validation using Joi schema
- Session expiry handling


## Environment Configuration
Required environment variables:
```
MONGO_URI=your-database-uri
SESSION_SECRET=your-secret-key
PORT=3000
NODE_ENV=development|production
```


