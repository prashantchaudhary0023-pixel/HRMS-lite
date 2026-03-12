# Local Run Guide - HRMS Lite

Quick reference for running the backend and frontend servers locally.

## **Backend (Django) Server**

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python manage.py runserver
```

✅ **Backend will run at:** http://localhost:8000

---

## **Frontend (React) Server**

Open a **new terminal** window and run:

```bash
cd frontend
npm run dev
```

✅ **Frontend will run at:** http://localhost:5173

---

## **Quick Summary**

| Server | Command | URL |
|--------|---------|-----|
| Backend | `python manage.py runserver` | http://localhost:8000 |
| Frontend | `npm run dev` | http://localhost:5173 |

### **Additional Useful Commands:**

**Backend:**
- Access Django admin: http://localhost:8000/admin/
- Run migrations: `python manage.py migrate`
- Create superuser: `python manage.py createsuperuser`
- Run on different port: `python manage.py runserver 8001`

**Frontend:**
- Build for production: `npm run build`
- Preview production build: `npm run preview`

---

## **Important Notes**

- Make sure both servers are running simultaneously for the application to work properly
- Backend must be running before making API calls from the frontend
- If you encounter port conflicts, you can run the backend on a different port
- Don't forget to activate the virtual environment before running backend commands

---


