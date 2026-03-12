# Quick Start Guide - HRMS Lite

Get your HRMS Lite application running in 5 minutes!

## 🚀 Local Development Setup

### Prerequisites Check
```bash
# Check Python version (need 3.9+)
python3 --version

# Check Node version (need 18+)
node --version

# Check npm version
npm --version
```

### Backend Setup (2 minutes)

```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python3 -m venv venv

# 3. Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run migrations
python manage.py migrate

# 6. Start server
python manage.py runserver
```

✅ Backend running at: http://localhost:8000

### Frontend Setup (2 minutes)

Open a **new terminal** window:

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

✅ Frontend running at: http://localhost:5173

## 🎯 Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Add Employee" and create your first employee
3. Switch to "Attendance" tab
4. Mark attendance for the employee

## 📋 Quick Commands Reference

### Backend Commands
```bash
# Create superuser for Django admin
python manage.py createsuperuser

# Access Django admin
# Visit: http://localhost:8000/admin

# Run tests (when implemented)
python manage.py test

# Create new migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### Frontend Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

## 🐛 Common Issues & Solutions

### Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'rest_framework'`
```bash
# Solution: Install dependencies
pip install -r requirements.txt
```

**Issue**: `django.db.utils.OperationalError: no such table`
```bash
# Solution: Run migrations
python manage.py migrate
```

**Issue**: Port 8000 already in use
```bash
# Solution: Run on different port
python manage.py runserver 8001
# Then update frontend API URL
```

### Frontend Issues

**Issue**: `Cannot find module 'axios'`
```bash
# Solution: Install dependencies
npm install
```

**Issue**: API calls failing with CORS error
```bash
# Solution: Ensure backend is running and CORS is configured
# Check backend settings.py has corsheaders installed
```

**Issue**: Port 5173 already in use
```bash
# Solution: Kill process or use different port
# Vite will automatically suggest alternative port
```

## 🔍 Verify Installation

### Check Backend
```bash
# Test employee endpoint
curl http://localhost:8000/api/employees/

# Expected: [] (empty array)
```

### Check Frontend
1. Open http://localhost:5173
2. You should see the HRMS Lite header
3. Two tabs: Employees and Attendance

## 📚 Next Steps

1. **Read the README.md** for detailed documentation
2. **Review API endpoints** at http://localhost:8000/api/
3. **Check DEPLOYMENT.md** for deployment instructions
4. **Explore the code** to understand the architecture

## 🆘 Need Help?

1. Check the main **README.md**
2. Review **DEPLOYMENT.md** for deployment issues
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Review Django logs

## 🎉 Success!

Your HRMS Lite application is now running locally!

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/

---

**Happy Coding! 💻**
