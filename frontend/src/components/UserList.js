// UserList.js
import React, { useState, useEffect } from 'react';

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    // Simulating API call to fetch users
    setTimeout(() => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Editor', status: 'active', lastLogin: '2025-03-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Viewer', status: 'active', lastLogin: '2025-03-12' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', status: 'inactive', lastLogin: '2025-02-20' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Editor', status: 'active', lastLogin: '2025-03-14' },
        { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2025-01-05' },
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.status === filter);

  return (
    <div className="user-list">
      <h2>User List</h2>
      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Users
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'inactive' ? 'active' : ''} 
          onClick={() => setFilter('inactive')}
        >
          Inactive
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <button onClick={() => onUserSelect(user)}>View</button>
                  <button 
                    className={user.status === 'active' ? 'deactivate' : 'activate'}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;