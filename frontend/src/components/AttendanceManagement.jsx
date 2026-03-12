import { useState, useEffect } from 'react';
import { attendanceAPI, employeeAPI } from '../services/api';
import './AttendanceManagement.css';

function AttendanceManagement() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [formData, setFormData] = useState({
    employee: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  useEffect(() => {
    if (filterDate) {
      fetchAttendance({ date: filterDate });
    } else {
      fetchAttendance();
    }
  }, [filterDate]);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.results || response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const fetchAttendance = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await attendanceAPI.getAll(params);
      setAttendanceRecords(response.data.results || response.data);
    } catch (err) {
      setError('Failed to load attendance records. Please try again.');
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.employee) {
      errors.employee = 'Please select an employee';
    }
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    if (!formData.status) {
      errors.status = 'Status is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    try {
      await attendanceAPI.create(formData);
      setFormData({
        employee: '',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
      });
      setShowForm(false);
      fetchAttendance();
    } catch (err) {
      const errorMessage = err.response?.data?.error ||
                          Object.values(err.response?.data || {}).flat().join(', ') ||
                          'Failed to mark attendance. Please try again.';
      setError(errorMessage);
      console.error('Error creating attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? employee.full_name : 'Unknown';
  };

  const getTotalPresentDays = (employeeId) => {
    return attendanceRecords.filter(
      (record) => record.employee === employeeId && record.status === 'present'
    ).length;
  };

  return (
    <div className="attendance-management">
      <div className="section-header">
        <h2>Attendance Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Mark Attendance'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      {showForm && (
        <div className="card form-card">
          <h3>Mark Attendance</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="employee">Employee *</label>
                <select
                  id="employee"
                  name="employee"
                  value={formData.employee}
                  onChange={handleInputChange}
                  className={formErrors.employee ? 'error' : ''}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.employee_id} - {emp.full_name}
                    </option>
                  ))}
                </select>
                {formErrors.employee && (
                  <span className="error-text">{formErrors.employee}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={formErrors.date ? 'error' : ''}
                />
                {formErrors.date && (
                  <span className="error-text">{formErrors.date}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={formErrors.status ? 'error' : ''}
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
                {formErrors.status && (
                  <span className="error-text">{formErrors.status}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Marking...' : 'Mark Attendance'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="filter-section">
        <div className="form-group">
          <label htmlFor="filterDate">Filter by Date</label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Select date to filter"
          />
          {filterDate && (
            <button className="btn btn-sm btn-secondary" onClick={() => setFilterDate('')}>
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {loading && !showForm && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading attendance records...</p>
        </div>
      )}

      {!loading && attendanceRecords.length === 0 && !showForm && (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No Attendance Records Yet</h3>
          <p>Start by marking attendance for employees</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Mark Attendance
          </button>
        </div>
      )}

       {!loading && attendanceRecords.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Present Days</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <span className="badge">{record.employee_id_display}</span>
                  </td>
                  <td>{record.employee_name}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${record.status}`}>
                      {record.status === 'present' ? '✓' : '✕'} {record.status}
                    </span>
                  </td>
                  <td>
                    <span className="present-count">
                      {getTotalPresentDays(record.employee)} days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} 
      
      
    </div>
  );
}

export default AttendanceManagement;
