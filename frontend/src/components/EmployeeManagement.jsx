import { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import './EmployeeManagement.css';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.results || response.data);
    } catch (err) {
      setError('Failed to load employees. Please try again.');
      console.error('Error fetching employees:', err);
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
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.employee_id.trim()) {
      errors.employee_id = 'Employee ID is required';
    }
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
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
      await employeeAPI.create(formData);
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
      });
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      const errorMessage = err.response?.data?.error ||
                          Object.values(err.response?.data || {}).flat().join(', ') ||
                          'Failed to add employee. Please try again.';
      setError(errorMessage);
      console.error('Error creating employee:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await employeeAPI.delete(id);
      fetchEmployees();
    } catch (err) {
      setError('Failed to delete employee. Please try again.');
      console.error('Error deleting employee:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-management">
      <div className="section-header">
        <h2>Employee Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Employee'}
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
          <h3>Add New Employee</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="employee_id">Employee ID *</label>
                <input
                  type="text"
                  id="employee_id"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  className={formErrors.employee_id ? 'error' : ''}
                  placeholder="EMP001"
                />
                {formErrors.employee_id && (
                  <span className="error-text">{formErrors.employee_id}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="full_name">Full Name *</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={formErrors.full_name ? 'error' : ''}
                  placeholder="John Doe"
                />
                {formErrors.full_name && (
                  <span className="error-text">{formErrors.full_name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                  placeholder="john@example.com"
                />
                {formErrors.email && (
                  <span className="error-text">{formErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={formErrors.department ? 'error' : ''}
                  placeholder="Engineering"
                />
                {formErrors.department && (
                  <span className="error-text">{formErrors.department}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Employee'}
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

      {loading && !showForm && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading employees...</p>
        </div>
      )}

      {!loading && employees.length === 0 && !showForm && (
        <div className="empty-state">
          <span className="empty-icon">👤</span>
          <h3>No Employees Yet</h3>
          <p>Start by adding your first employee</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Employee
          </button>
        </div>
      )}

      {!loading && employees.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <span className="badge">{employee.employee_id}</span>
                  </td>
                  <td>{employee.full_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(employee.id)}
                      disabled={loading}
                    >
                      🗑 Delete
                    </button>
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

export default EmployeeManagement;
