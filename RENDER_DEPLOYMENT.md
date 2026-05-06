# 🚀 Backend Deployment Guide - Render

## Backend Successfully Pushed to GitHub! ✅

Repository: https://github.com/Gowshekan/Car-Rental-System-backend.git
Branch: **main**

## 📦 What's Included

- ✅ Node.js + Express server
- ✅ PostgreSQL database with Sequelize ORM
- ✅ JWT Authentication
- ✅ User, Car, Booking models
- ✅ Complete API routes (auth, cars, bookings, users)
- ✅ Seed script with 9 Indian cars
- ✅ Admin middleware
- ✅ .env.example template

## 🌐 Deploy to Render

### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **PostgreSQL**
3. Configure:
   - **Name**: car-rental-db
   - **Database**: car_rental
   - **User**: (auto-generated)
   - **Region**: Singapore (closest to India)
   - **Plan**: Free (1GB storage)
4. Click **Create Database**
5. **Copy the Internal Database URL** (starts with `postgresql://`)

### Step 2: Deploy Backend Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `Car-Rental-System-backend`
3. Configure:
   - **Name**: car-rental-backend
   - **Region**: Singapore
   - **Branch**: main
   - **Root Directory**: (leave empty)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

Click **Environment** tab and add:

```
PORT=5000
DATABASE_URL=<paste_your_internal_database_url>
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=production
```

### Step 4: Deploy

1. Click **Create Web Service**
2. Wait for deployment (2-3 minutes)
3. Your backend URL: `https://car-rental-backend-xxxx.onrender.com`

### Step 5: Seed Database with Indian Cars

1. Go to your web service dashboard
2. Click **Shell** tab
3. Run: `node seed.js`
4. This will add 9 Indian cars to your database

## 🔗 Update Frontend

After backend is deployed, update your frontend `.env`:

```
VITE_API_URL=https://car-rental-backend-xxxx.onrender.com
```

Then redeploy frontend on Vercel.

## 🧪 Test Your API

Test endpoints:
- `GET https://your-backend-url.onrender.com/api/cars` - Should return Indian cars
- `POST https://your-backend-url.onrender.com/api/auth/register` - Register user
- `POST https://your-backend-url.onrender.com/api/auth/login` - Login user

## 📊 Database Tables

Your PostgreSQL database will have:
- **Users** - Customer and admin accounts
- **Cars** - 9 Indian cars (Maruti Swift, Hyundai Creta, etc.)
- **Bookings** - Rental bookings with dates and status

## 🔒 Security Features

✅ JWT authentication
✅ Password hashing (bcrypt)
✅ Protected routes
✅ Admin authorization
✅ SQL injection protection (Sequelize)
✅ CORS enabled

## 🚗 Indian Cars in Database

After seeding:
1. Maruti Swift - ₹1,200/day
2. Hyundai i20 - ₹1,400/day
3. Honda City - ₹1,800/day
4. Hyundai Verna - ₹2,000/day
5. Hyundai Creta - ₹2,500/day
6. Mahindra Thar - ₹3,000/day
7. Kia Seltos - ₹2,800/day
8. Toyota Fortuner - ₹4,500/day
9. Mercedes E-Class - ₹8,000/day

## 📝 Next Steps

1. ✅ Backend pushed to GitHub
2. ⏳ Deploy PostgreSQL database on Render
3. ⏳ Deploy backend web service on Render
4. ⏳ Run seed script to add cars
5. ⏳ Update frontend VITE_API_URL
6. ⏳ Redeploy frontend on Vercel
7. ⏳ Test complete application

## 🆘 Troubleshooting

**Database connection error?**
- Check DATABASE_URL is correct (use Internal Database URL)
- Ensure database is in same region as web service

**Seed script not working?**
- Wait 1-2 minutes after first deployment
- Database tables are created automatically on first run

**CORS errors?**
- Backend already has CORS enabled for all origins
- Check frontend API URL is correct

## 🎉 Success!

Your backend is now ready for deployment on Render with PostgreSQL database!

---

**Made with ❤️ for Indian Car Rental System**
