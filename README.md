
# Secure-Session: Session Management System

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Demo Video](#demo-video)  
3. [Prerequisites](#prerequisites)  
4. [Setup](#setup)  
5. [Development](#development)  
6. [Testing with Postman](#testing-with-postman)  

---

## Project Overview
A secure session management system that handles user preferences and session tracking, supporting both authenticated and guest users. Features include cross-device synchronization for authenticated users, automatic session expiration, and secure cookie management.

## Demo Video  
[DEMO-VIDEO-LINK]

---

## Prerequisites
1. **Node.js** (v14 or higher)  
2. **MongoDB** (v4.4 or higher)  
3. **Postman** (for API testing)  
4. **curl** (optional, for command-line testing)

---

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/harsh-kumar-patwa/secure-session.git
cd secure-session
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root directory with the following content:
```env
MONGO_URI=mongodb://localhost:27017/secure-sessions
SESSION_SECRET=your-secret-key
PORT=3000
NODE_ENV=development
```

### 4. Start the MongoDB Service
Ensure MongoDB is running on your system. The application will automatically create necessary collections.

### 5. Start the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## Development

### Setting Up the Development Environment
1. **Install Development Dependencies**:  
   ```bash
   npm install --save-dev
   ```
2. **Run Application Locally**:  
   ```bash
   npm run dev
   ```

### Making Changes
After making code changes:
1. Restart the development server:
   ```bash
   npm run dev
   ```

---

## Testing with Postman

### Base URL
- **Development**: `http://localhost:3000`
- Replace `localhost` with your server address for production.

### Endpoints to Test

#### 1. Register a New User
**Method**: POST  
**URL**: `/auth/register`  
**Body** (JSON):  
```json
{
    "username": "testuser",
    "password": "securepassword",
    "preferences": {
        "theme": "light",
        "notifications": "enabled",
        "language": "English"
    }
}
```

#### 2. Login a User
**Method**: POST  
**URL**: `/auth/login`  
**Body** (JSON):  
```json
{
    "username": "testuser",
    "password": "securepassword"
}
```

#### 3. Start a New Session
**Method**: POST  
**URL**: `/session`  
**Response**:  
```json
{
    "sessionId": "unique-session-id",
    "startTime": "2025-01-07T00:00:00Z"
}
```

#### 4. Save User Preferences
**Method**: POST  
**URL**: `/preferences`  
**Body** (JSON):  
```json
{
    "theme": "dark",
    "notifications": "enabled",
    "language": "English"
}
```

#### 5. End Current Session
**Method**: DELETE  
**URL**: `/session`

---

## Testing Workflow

1. **Register a User** and verify the response.  
2. **Log in** with the registered credentials.  
3. **Start a Session** and save the session ID.  
4. Update **user preferences** and verify changes.  
5. **End the session** and confirm it cannot be accessed again.

---

## Security Features

1. **Secure Cookies**:  
   - Cookies are `HttpOnly` and `SameSite` by default.  
   - Set `Secure` in production to enable HTTPS-only access.
2. **Session Timeout**:  
   - Sessions expire after 30 minutes of inactivity.
3. **Authentication Middleware**:  
   - Protects routes to ensure only authenticated users can access sensitive data.
4. **Validation**:  
   - Uses `Joi` for request body validation.

---

## Error Handling

- **Standardized Responses**:  
  All API errors return structured JSON responses with meaningful messages and status codes.  

- **Example Error Response**:  
  ```json
  {
      "error": "Session expired",
      "statusCode": 401
  }
  ```

---

## Verifying Session Behavior
- Monitor session activity directly in the MongoDB database.  
- Check for automatic cleanup of expired sessions in the `sessions` collection.  

