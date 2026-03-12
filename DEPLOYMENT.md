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

## Alternative Backend: Railway.app

### Step 1: Install Railway CLI (Optional)
```bash
npm install -g @railway/cli
```

### Step 2: Deploy on Railway
1. Go to [Railway](https://railway.app/)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Add PostgreSQL database:
   - Click "New" → "Database" → "PostgreSQL"
6. Configure environment variables (same as Render)
7. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn hrms_project.wsgi:application --bind 0.0.0.0:$PORT`

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

## Alternative Frontend: Netlify

### Step 1: Deploy on Netlify
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

6. Click "Deploy site"

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

**Problem**: Static files not loading
- **Solution**: Run `python manage.py collectstatic` in build command

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

## Cost Considerations

### Free Tier Limits
- **Render**:
  - 750 hours/month for web services
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds

- **Railway**:
  - $5 credit/month
  - Pay as you go after credit exhausted

- **Vercel**:
  - Unlimited bandwidth for personal projects
  - 100GB bandwidth/month for free tier

- **Netlify**:
  - 100GB bandwidth/month
  - 300 build minutes/month

## Monitoring

### Backend Monitoring
- Check Render logs for errors
- Monitor database connections
- Set up uptime monitoring (UptimeRobot, etc.)

### Frontend Monitoring
- Use Vercel Analytics
- Monitor API call success rates
- Check browser console for errors

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use strong `SECRET_KEY` in production
3. ✅ Set `DEBUG=False` in production
4. ✅ Use HTTPS for all communications
5. ✅ Regularly update dependencies
6. ✅ Monitor logs for suspicious activity

## Support

For deployment issues:
1. Check platform documentation
2. Review application logs
3. Verify environment variables
4. Test API endpoints independently

---

**Happy Deploying! 🚀**
