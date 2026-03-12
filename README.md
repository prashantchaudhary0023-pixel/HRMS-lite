# HRMS Lite - Human Resource Management System

A lightweight, full-stack web application for managing employees and tracking daily attendance.

## 🚀 Live Demo

- **Frontend**: [https://hrms-lite-isdka49nc-prashantchaudhary0023-pixels-projects.vercel.app/]
- **Backend API**: [https://hrms-lite-backend-zpfn.onrender.com/api/]
- **GitHub Repository**: [https://github.com/prashantchaudhary0023-pixel/HRMS-lite]

## 📋 Features

### Employee Management
- ✅ Add new employees with unique Employee ID
- ✅ View list of all employees
- ✅ Delete employees
- ✅ Validation for required fields and email format
- ✅ Duplicate employee ID and email prevention

### Attendance Management
- ✅ Mark daily attendance (Present/Absent)
- ✅ View attendance records for all employees
- ✅ Filter attendance by date
- ✅ Display total present days per employee
- ✅ Prevent duplicate attendance entries

### Additional Features
- ✅ Clean, professional, production-ready UI
- ✅ Responsive design for mobile and desktop
- ✅ Loading states and error handling
- ✅ Empty states with helpful messages
- ✅ Server-side validation
- ✅ RESTful API design

## 🛠 Tech Stack

### Backend
- **Framework**: Django 5.2.6
- **API**: Django REST Framework
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **CORS**: django-cors-headers
- **Validation**: Django validators & custom validation

### Frontend
- **Framework**: React 19.2.4
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: Custom CSS (No external UI libraries)

### Deployment
- **Frontend**: Vercel 
- **Backend**: Render 
- **Database**: PostgreSQL (Production)

## 📦 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables** (Optional for development)
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   ```bash
   cp .env.example .env
   # Edit .env to point to your backend URL if different
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

## 🎯 API Endpoints

### Employees
- `GET /api/employees/` - List all employees
- `POST /api/employees/` - Create new employee
- `GET /api/employees/{id}/` - Get employee details
- `PUT /api/employees/{id}/` - Update employee
- `DELETE /api/employees/{id}/` - Delete employee
- `GET /api/employees/{id}/attendance_summary/` - Get attendance summary

### Attendance
- `GET /api/attendance/` - List all attendance records
- `POST /api/attendance/` - Mark attendance
- `GET /api/attendance/{id}/` - Get attendance details
- `PUT /api/attendance/{id}/` - Update attendance
- `DELETE /api/attendance/{id}/` - Delete attendance record

### Query Parameters
- `?date=YYYY-MM-DD` - Filter attendance by date
- `?employee={id}` - Filter attendance by employee

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. **Create a new web service**
2. **Set environment variables**:
   ```
   DEBUG=False
   ALLOWED_HOSTS=your-domain.com
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=5432
   ```
3. **Build command**: `pip install -r requirements.txt`
4. **Start command**: `gunicorn hrms_project.wsgi:application`

### Frontend Deployment (Vercel)

1. **Create a new project**
2. **Set environment variables**:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
3. **Build command**: `npm run build`
4. **Output directory**: `dist`

## 📝 Project Structure

```
hrms-lite/
├── backend/
│   ├── hrms/                  # Main Django app
│   │   ├── models.py          # Employee & Attendance models
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   └── urls.py            # App URLs
│   ├── hrms_project/          # Django project settings
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── EmployeeManagement.jsx
│   │   │   ├── AttendanceManagement.jsx
│   │   │   ├── EmployeeManagement.css
│   │   │   └── AttendanceManagement.css
│   │   ├── services/          # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx            # Main App component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔒 Security Features

- CORS protection
- CSRF protection (Django default)
- SQL injection protection (Django ORM)
- XSS protection (React default escaping)
- Input validation (both frontend and backend)
- Email format validation
- Unique constraint enforcement

## ⚠️ Assumptions & Limitations

1. **Single Admin User**: No authentication required (as per requirements)
2. **No User Roles**: System designed for a single administrator
3. **Basic HR Features**: No leave management, payroll, or advanced features
4. **Date-based Attendance**: One attendance record per employee per day
5. **SQLite for Development**: PostgreSQL recommended for production
6. **No Real-time Updates**: Manual refresh needed to see changes

## 🧪 Testing

### Manual Testing Checklist

**Employee Management:**
- [ ] Add employee with valid data
- [ ] Try to add employee with duplicate ID
- [ ] Try to add employee with duplicate email
- [ ] Try to add employee with invalid email
- [ ] View employee list
- [ ] Delete employee

**Attendance Management:**
- [ ] Mark attendance for an employee
- [ ] Try to mark duplicate attendance for same employee and date
- [ ] Filter attendance by date
- [ ] View total present days
- [ ] View attendance for different employees

**Final:**
This project is created as part of a coding assignment.

---


