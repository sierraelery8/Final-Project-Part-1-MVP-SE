# 🌿 **Plant Care Tracker API**

A RESTful backend service that allows users to manage their plants, track their care activities, and to stay consistent with plant maintenance. This API supports user authentication, CRUD operations for plants and care logs, and role‑based access control.

---

## **Project Overview**

The **Plant Care Tracker API** helps plant owners stay organized and consistent with plant care routines. Users can:

- Log their plants

- Track watering, fertilizing, and pruning

- Record notes

- Maintain a care history

This solves a real‑world problem: people forget plant care schedules, leading to unhealthy plants. This API centralizes plant data so users can maintain healthier plants with less stress.

## **Live Deployment** 
Render URL:  
👉 https://final-project-part-1-mvp-se-1.onrender.com

Example health check:

Code
GET https://final-project-part-1-mvp-se-1.onrender.com/api/health

## **Target Users**

- Plant owners
- Gardeners
- Plant hobbyists
- Small plant shops
- Plant‑sitting services


## **Tech Stack**

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **PostgreSQL**
- **JWT Authentication**
- **Jest + Supertest** (automated testing)
- **Render** (deployment)

---

## **Project Structure**

/config
  database.js

/database
  User.js
  Plant.js
  CareLog.js

/middleware
  auth.js
  requireRole.js

/routes
  userRoutes.js
  plantRoutes.js
  careLogRoutes.js

/tests
  user.test.js
  plant.test.js
  carelog.test.js

app.js
server.js
README.md
```
```

## **Authentication**

The API uses **JWT-based authentication**.

- Users register with a username + password
- Passwords are hashed
- Login returns a JWT token
- Protected routes require:

```
Authorization: Bearer <token>
```

## **Role-Based Access Control (RBAC)**

Your project supports two roles:

- user
- admin

Admin-only capabilities:
- Delete any user
- Delete any plant

User-only capabilities:
- Manage only their own plants
- Manage only their own care logs
```
```
## **Data Models** ##

### **User**
- id  
- username  
- password (hashed)  
- role (user/admin)

### **Plant**
- id  
- userId  
- name  
- species  
- dateAcquired  
- sunlight  
- wateringFrequency  
- notes  

### **CareLog**
- id  
- userId  
- plantId  
- action (watering, fertilizing, pruning)  
- notes  
- date  

```

## **Setup/ Installation**

### 1. Clone the repo
```
git clone <your-repo-url>
cd Final-Project-Part-1-MVP-SE
```

### 2. Install dependencies
```
npm install
```

### 3. Create `.env`
```
JWT_SECRET=yourSecretKey
DATABASE_URL=yourLocalOrRenderDB
NODE_ENV=development
```

### 4. Run the server
```
npm start
```

### 5. Run tests
```
npm test
```


## **API Endpoints**

All endpoints are prefixed with:

Code
/api

```
```

# **User Routes**

### **Register**
```
POST /users/register
```

### **Login**
```
POST /users/login
```

### **Delete User (admin only)**
```
DELETE /users/:id
```
```


# **Plant Routes**

### **Create Plant**
```
POST /plants
```

### **Get All Plants**
```
GET /plants
```

### **Update Plant**
```
PUT /plants/:id
```

### **Delete Plant**
```
DELETE /plants/:id
```


# **Care Log Routes**

### **Create Care Log**
```
POST /api/carelogs
```

### **Get All Care Logs**
```
GET /api/carelogs
```

### **Get Care Logs for a Plant**
```
GET /api/carelogs/plant/:plantId
```

### **Update Care Log**
```
PUT /api/carelogs/:id
```

### **Delete Care Log**
```
DELETE /api/carelogs/:id
```


## **Testing**

My project includes Jest + Supertest tests for:

- Users
- Plants
- CareLogs 

Run:

```
npm test
```

## **Deployment**

Deployed using Render with:

- PostgreSQL database

- Environment variables

- Production DATABASE_URL

- process.env.PORT binding


## **Future Enhancements**

- Watering/fertilizing reminders
- Email or SMS notifications
- Plant photo uploads
- Growth tracking
- Frontend dashboard 
