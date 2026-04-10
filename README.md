# 🌿 **Plant Care Tracker API**

A RESTful backend service that allows users to manage their plants, track their care activities, and to stay consistent with plant maintenance. This API supports user authentication, CRUD operations for plants and care logs, and role‑based access control.

---

## **Project Overview**

The **Plant Care Tracker API** is designed to help plant owners stay organized and be consistent with plant care. Users can log their plants, track watering and fertilizing schedules, record growth notes, and maintain a history of care.

This API solves a real‑world problem: people often forget plant care routines, leading to unhealthy plants. By centralizing plant data and care logs, users can maintain healthier plants with less stress.


## **Target Users**

The main users would be plant owners, gardeners, and plant enthusiasts… It could also be useful for small plant shops or plant‑sitting services.


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
server.js
README.md
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
- Update/delete only their own plants
- Update/delete only their own care logs


## **Data Models**

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

---

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

---

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
POST /carelogs
```

### **Get All Care Logs**
```
GET /carelogs
```

### **Get Care Logs for a Plant**
```
GET /carelogs/plant/:plantId
```

### **Update Care Log**
```
PUT /carelogs/:id
```

### **Delete Care Log**
```
DELETE /carelogs/:id
```


## **Testing**

My project includes full Jest + Supertest coverage:

- User tests  
- Plant tests  
- CareLog tests  

Run:

```
npm test
```

All tests should pass:

```
PASS tests/user.test.js
PASS tests/plant.test.js
PASS tests/carelog.test.js
```

## **Deployment**

Deploy using **Render**.


## **Future Enhancements**

- Reminder system for watering/fertilizing  
- Email or SMS notifications  
- Plant photo uploads  
- Growth tracking with charts  
- Frontend dashboard  
