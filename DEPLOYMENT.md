# Deployment Guide for HRMS Lite

This guide provides step-by-step instructions for deploying the HRMS Lite application.

## Backend Deployment (Render.com)

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure all files are committed

### Step 2: Create PostgreSQL Database on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `hrms-lite-db`
   - Region: Choose closest to you
   - Plan: Free
4. Click "Create Database"
5. Note down the connection details:
   - Internal Database URL
   - External Database URL
   - Database
   - Username
   - Password

### Step 3: Deploy Backend on Render
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `hrms-lite-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn hrms_project.wsgi:application --bind 0.0.0.0:$PORT`

4. Add Environment Variables:
   ```
   DEBUG=False
   SECRET_KEY=your-random-secret-key-here
   ALLOWED_HOSTS=your-app-name.onrender.com
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=hrms_lite_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=5432
   CORS_ALLOW_ALL_ORIGINS=True
   ```

5. Click "Create Web Service"
6. Wait for deployment to complete
7. Note your backend URL: `https://your-app-name.onrender.com`

### Step 4: Test Backend API
Visit: `https://your-app-name.onrender.com/api/employees/`

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. Update `.env` with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### Step 2: Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

6. Click "Deploy"
7. Note your frontend URL: `https://your-app-name.vercel.app`

## Post-Deployment Checklist

### Backend
- [ ] Database is created and connected
- [ ] Migrations have run successfully
- [ ] API endpoints are accessible
- [ ] CORS is configured correctly
- [ ] Environment variables are set

### Frontend
- [ ] Frontend is accessible
- [ ] API connection works
- [ ] Can create employees
- [ ] Can mark attendance
- [ ] All features work as expected

## Troubleshooting

### Backend Issues

**Problem**: Database connection errors
- **Solution**: Verify database credentials in environment variables
- Check that `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` are correct


**Problem**: CORS errors
- **Solution**: Ensure `CORS_ALLOW_ALL_ORIGINS=True` or add specific frontend URL to `CORS_ALLOWED_ORIGINS`

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Check `VITE_API_URL` environment variable
- Verify backend is accessible
- Check browser console for CORS errors

**Problem**: Build fails
- **Solution**: Ensure all dependencies are in `package.json`
- Check Node version compatibility

## Updating Your Deployment

### Backend Updates
1. Push changes to GitHub
2. Render will automatically redeploy
3. Or manually trigger deploy in Render dashboard

### Frontend Updates
1. Push changes to GitHub
2. Vercel/Netlify will automatically redeploy

## Monitoring

### Backend Monitoring
- Check Render logs for errors
- Monitor database connections

### Frontend Monitoring
- Use Vercel Analytics
- Check browser console for errors



