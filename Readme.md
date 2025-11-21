# 🚀 PrimeTrade.ai - Full Stack MERN Assignment

A full-stack MERN application powered by:

- **React + Vite** (Frontend)
- **Node.js + Express** (Backend)
- **MongoDB & Redis**
- **JWT Authentication (httpOnly Cookies)**
- **Swagger API Documentation**
- **Docker + Docker Compose**

---

## 📁 Project Structure

```
primetrade-assignment/
│
├── front-end/              # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── back-end/               # Express backend + Swagger
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   ├── config/
│   ├── package.json
│   └── server.js
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Installation & Setup

You can run this project in **two ways**:

1. **Manual Setup** (install dependencies and run each server separately)
2. **Docker Compose** (one command to run everything)

---

## 📦 Option 1: Manual Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on `localhost:27017`)
- Redis (running on `localhost:6379`)

### Step 1: Install MongoDB & Redis

**Install MongoDB:**

```bash
# macOS
brew install mongodb-community

# Ubuntu
sudo apt install mongodb

# Start MongoDB
mongod --port 27017
```

**Install Redis:**

```bash
# macOS
brew install redis

# Ubuntu
sudo apt install redis-server

# Start Redis
redis-server --port 6379
```

### Step 2: Setup Backend

```bash
cd back-end
npm install
```

Create `.env` file in `back-end/` directory:

```env
PORT=8000
MONGODB_URL=mongodb://localhost:27017/primatrade
JWT_SECRET=your_jwt_secret_key_here
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@example.com
REDIS_HOST=localhost
REDIS_PORT=6379
```

Start the backend server:

```bash
npm start
```

**Backend will run at:** `http://localhost:8000`

### Step 3: Setup Frontend

Open a new terminal:

```bash
cd front-end
npm install
```

Create `.env` file in `front-end/` directory:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend server:

```bash
npm run dev
```

**Frontend will run at:** `http://localhost:5173`

### Step 4: Access the Application

| Service      | URL                            |
| ------------ | ------------------------------ |
| Frontend     | http://localhost:5173          |
| Backend API  | http://localhost:8000          |
| Swagger Docs | http://localhost:8000/api-docs |

---

## 🐳 Option 2: Docker Compose (Recommended)

### Prerequisites

- Docker
- Docker Compose

### Run Everything with One Command

All environment variables are already configured in `docker-compose.yml`. No need to create `.env` files.

```bash
docker-compose up --build
```

This will start:

- ✅ MongoDB container
- ✅ Redis container
- ✅ Backend server
- ✅ Frontend server

### Access the Application

| Service         | URL                            | Description       |
| --------------- | ------------------------------ | ----------------- |
| 🎨 Frontend     | http://localhost:5173          | React UI          |
| ⚡ Backend API  | http://localhost:8000          | Express server    |
| 📚 Swagger Docs | http://localhost:8000/api-docs | API documentation |
| 🗄️ MongoDB      | `localhost:27017`              | Database          |
| 🔥 Redis        | `localhost:6379`               | Cache             |

### Stop All Containers

```bash
docker-compose down
```

### Remove All Data (Fresh Start)

```bash
docker-compose down -v
```

---

## 📚 API Documentation

Interactive Swagger UI is available at:

👉 **http://localhost:8000/api-docs**

You can:

- View all API endpoints
- Test API requests directly from the browser
- See request/response schemas
- Understand authentication flow

### Example API Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | ❌            |
| POST   | `/api/auth/login`    | User login        | ❌            |
| GET    | `/api/users/me`      | Get current user  | ✅            |
| GET    | `/app/dashboard`     | Dashboard data    | ✅            |

---

## 🔐 Authentication

This application uses **JWT stored in httpOnly cookies** for secure authentication.

### How it Works:

1. User logs in via `/api/auth/login`
2. Server generates JWT and stores it in an httpOnly cookie
3. Cookie is automatically sent with every request
4. Protected routes (under `/app/*`) validate the JWT

### Protected Routes

All routes under `/app/*` require authentication:

```javascript
app.use("/app", authenticationMiddleware, require("./routes/route"));
```

---

## 🗄️ Database & Cache

### MongoDB

- Stores user data and application data
- Persistent storage with Docker volumes

### Redis

- Caches frequently accessed data
- Reduces database load
- Improves response time for GET requests

---

## 🛠️ Available Scripts

### Backend

```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-reload)
```

### Frontend

```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

### Docker

```bash
docker-compose up --build    # Build and start all services
docker-compose up -d         # Start in detached mode
docker-compose down          # Stop all services
docker-compose logs -f       # View logs
docker-compose ps            # Check running containers
```

---

## 🧪 Testing the API

### Using cURL

**Register a user:**

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

**Access protected route:**

```bash
curl -X GET http://localhost:8000/app/dashboard \
  -b cookies.txt
```

### Using Swagger UI

1. Go to http://localhost:8000/api-docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in the parameters
5. Click "Execute"

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### MongoDB Connection Error

Make sure MongoDB is running:

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod --port 27017
```

### Redis Connection Error

Make sure Redis is running:

```bash
# Check if Redis is running
ps aux | grep redis

# Start Redis
redis-server --port 6379
```

### Docker Issues

```bash
# Clean Docker cache
docker system prune -a

# Rebuild containers
docker-compose up --build --force-recreate
```

---

## 📋 Environment Variables Reference

### Backend (.env)

```env
PORT=8000
MONGODB_URL=mongodb://localhost:27017/primatrade
JWT_SECRET=your_jwt_secret_key_here
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@example.com
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

**Note:** When using Docker Compose, these are automatically configured in `docker-compose.yml`.

---

## 👨‍💻 Submission Details

**Submitted by:** Yash Shetye  
**GitHub:** [@yash-2511981](https://github.com/yash-2511981)  
**LinkedIn:** [Yash Shetye](https://www.linkedin.com/in/yash-shetye-62b58b313/)  
**Assignment for:** PrimeTrade.ai Internship

---

**Thank you for reviewing my assignment! 🙏**
