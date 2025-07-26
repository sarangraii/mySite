import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import api from "../config/api";
import "../styles/AdminProfile.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullname: "",
    email: "",
    phone_no: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const response = await api.get("/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
        setEditForm({
          fullname: response.data.fullname,
          email: response.data.email,
          phone_no: response.data.phone_no || "",
        });
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        if (err.response?.status === 401) {
          logout();
        }
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
    fetchUsers();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const response = await api.put(
        "/api/admin/profile",
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAdmin(response.data);
      setIsEditing(false);
      
      // Update localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      user.fullname = response.data.fullname;
      user.email = response.data.email;
      user.phone_no = response.data.phone_no;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    }
  };

  const handleUserStatusChange = async (userId, newStatus) => {
    const token = localStorage.getItem("token");
    
    try {
      await api.put(
        `/api/admin/users/${userId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Update local state to reflect the change
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
      setError("Failed to update user status");
    }
  };

  const filteredUsers = users.filter((user) => {
    if (activeTab === "all") return true;
    return user.status === activeTab;
  });

  return (
    <div className="admin-profile-container">
      <div className="admin-sidebar">
        <div className="admin-info">
          <div className="admin-avatar">
            {admin.fullname ? admin.fullname.charAt(0).toUpperCase() : "A"}
          </div>
          <h3>{admin.fullname}</h3>
          <p>{admin.email}</p>
        </div>
        <div className="admin-menu">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All Users
          </button>
          <button
            className={activeTab === "active" ? "active" : ""}
            onClick={() => setActiveTab("active")}
          >
            Active Users
          </button>
          <button
            className={activeTab === "pending" ? "active" : ""}
            onClick={() => setActiveTab("pending")}
          >
            Pending Users
          </button>
          <button
            className={activeTab === "deactivated" ? "active" : ""}
            onClick={() => setActiveTab("deactivated")}
          >
            Deactivated Users
          </button>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {isEditing ? (
          <div className="edit-profile-section">
            <h2>Edit Profile</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={editForm.fullname}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_no">Phone Number</label>
                <input
                  type="tel"
                  id="phone_no"
                  name="phone_no"
                  value={editForm.phone_no}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="users-section">
            <h2>
              {activeTab === "all"
                ? "All Users"
                : activeTab === "active"
                ? "Active Users"
                : activeTab === "pending"
                ? "Pending Users"
                : "Deactivated Users"}
            </h2>
            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
              <div className="loading">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="no-users">No users found</div>
            ) : (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_no || "N/A"}</td>
                        <td>
                          <span className={`status-badge ${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="action-buttons">
                          {user.status === "pending" && (
                            <button
                              className="approve-btn"
                              onClick={() => handleUserStatusChange(user._id, "active")}
                            >
                              Approve
                            </button>
                          )}
                          {user.status === "active" && (
                            <button
                              className="deactivate-btn"
                              onClick={() => handleUserStatusChange(user._id, "deactivated")}
                            >
                              Deactivate
                            </button>
                          )}
                          {user.status === "deactivated" && (
                            <button
                              className="activate-btn"
                              onClick={() => handleUserStatusChange(user._id, "active")}
                            >
                              Activate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;