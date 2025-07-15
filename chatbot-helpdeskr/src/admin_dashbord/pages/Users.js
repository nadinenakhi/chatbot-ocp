import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaPen } from 'react-icons/fa'; // Import icons

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Please fill all fields');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/users', newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
      setError(null);
    } catch (err) {
      setError('Failed to add user: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container-fluid rounded" style={{  
      backgroundColor: 'white',
      minHeight: '100vh', 
      paddingTop: '40px'}}> 
      <center><h3>User Management</h3></center>

      {error && (
        <div style={{ margin: '20px', color: 'red' }}>
          <b>{error}</b>
        </div>
      )}
      <div style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto', padding:"20px"}}>
        <h5>Add New User</h5>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          className="form-select mb-3"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div  className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-success" onClick={handleAddUser}>
          Add User
        </button>
      </div></div>
      <h5 style={{ margin:'20px' }}>Users List</h5>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table" style={{ width: '100%', marginBottom: '15px' }}>
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th> {/* New Actions column */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm "
                    onClick={() => deleteUser(user.id)}
                    title="Delete User"
                    style={{ color: 'red', backgroundColor: 'transparent', border: 'none' }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     </div>

  );
}

export default UserManagement;
