import { useState } from 'react'
import './App.css'
import EmployeeManagement from './components/EmployeeManagement'
import AttendanceManagement from './components/AttendanceManagement'

function App() {
  const [activeTab, setActiveTab] = useState('employees')

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>HRMS Lite</h1>
          <p className="subtitle">Human Resource Management System</p>
        </div>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          <span className="tab-icon">👥</span>
          Employees
        </button>
        <button
          className={`tab ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          <span className="tab-icon">📋</span>
          Attendance
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'employees' && <EmployeeManagement />}
        {activeTab === 'attendance' && <AttendanceManagement />}
      </main>

      <footer className="footer">
        <p>© 2026 HRMS Lite - All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default App
