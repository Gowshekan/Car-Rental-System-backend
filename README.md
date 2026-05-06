# Car Rental System - Backend (PostgreSQL)

## Indian Car Rental API with PostgreSQL

### Features
- User Authentication (Register/Login)
- Car Management (CRUD)
- Booking System
- Admin Dashboard
- JWT Authentication
- PostgreSQL Database with Sequelize ORM

### Indian Cars Available
- Maruti Swift (Hatchback) - ₹1,200/day
- Hyundai i20 (Hatchback) - ₹1,400/day
- Honda City (Sedan) - ₹1,800/day
- Hyundai Verna (Sedan) - ₹2,000/day
- Hyundai Creta (SUV) - ₹2,500/day
- Mahindra Thar (SUV) - ₹3,000/day
- Kia Seltos (SUV) - ₹2,800/day
- Toyota Fortuner (Luxury) - ₹4,500/day
- Mercedes E-Class (Luxury) - ₹8,000/day

### Setup Instructions

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Variables**
Create a `.env` file:
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/car_rental
JWT_SECRET=your_secret_key
NODE_ENV=production
```

3. **Run Locally**
```bash
npm run dev
```

4. **Seed Database** (Optional - Add sample cars)
```bash
node seed.js
```

### Deploy to Render with PostgreSQL

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Name: `car-rental-db`
   - Database: `car_rental`
   - User: `car_rental_user`
   - Region: Singapore (closest to India)
   - Instance Type: Free
   - Click "Create Database"
   - Wait 2-3 minutes for provisioning
   - Copy "Internal Database URL" (starts with postgresql://)

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the backend folder

4. **Configure Service**
   - Name: `car-rental-api`
   - Region: Singapore
   - Branch: `main`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free

5. **Add Environment Variables**
   - Go to "Environment" tab
   - Add:
     - `DATABASE_URL` = (Paste Internal Database URL from step 2)
     - `JWT_SECRET` = (random string, e.g., "mySecretKey123!@#")
     - `NODE_ENV` = `production`

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the URL (e.g., https://car-rental-api.onrender.com)

7. **Seed Database** (Optional)
   - Go to your service → "Shell" tab
   - Run: `node seed.js`
   - This will add 9 Indian cars to your database

### Alternative: Supabase PostgreSQL (Free)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free

2. **Create Project**
   - Click "New Project"
   - Name: car-rental
   - Database Password: (save this!)
   - Region: Mumbai (ap-south-1)
   - Click "Create Project"

3. **Get Connection String**
   - Go to Settings → Database
   - Copy "Connection string" (URI format)
   - Replace `[YOUR-PASSWORD]` with your password

4. **Use in Render**
   - Use this connection string as `DATABASE_URL`

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  address TEXT,
  driver_license VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Cars Table
```sql
CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  seats INTEGER NOT NULL,
  transmission VARCHAR(20) NOT NULL,
  image TEXT NOT NULL,
  plate_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'Available',
  rating DECIMAL(2,1) DEFAULT 4.5,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Bookings Table
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  car_id INTEGER REFERENCES cars(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  total_amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  pickup_location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints

#### Auth
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

#### Cars
- GET `/api/cars` - Get all cars
- GET `/api/cars/:id` - Get car by ID
- POST `/api/cars` - Add car (Admin)
- PUT `/api/cars/:id` - Update car (Admin)
- DELETE `/api/cars/:id` - Delete car (Admin)

#### Bookings
- GET `/api/bookings` - Get bookings
- GET `/api/bookings/:id` - Get booking by ID
- POST `/api/bookings` - Create booking
- PUT `/api/bookings/:id` - Update booking
- DELETE `/api/bookings/:id` - Delete booking (Admin)

#### Users
- GET `/api/users` - Get all users (Admin)
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile
- DELETE `/api/users/:id` - Delete user (Admin)

### Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT
- bcryptjs

### Advantages of PostgreSQL
✅ ACID compliance
✅ Better for complex queries
✅ Strong data integrity
✅ Better performance for large datasets
✅ Free tier on Render (1GB storage)
✅ Free tier on Supabase (500MB storage)
