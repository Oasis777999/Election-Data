import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../UserTable";
import api from "../../apis/api";

const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/list");

      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const response = await api.patch(`/admin/status/${id}`);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isActive: response.data.isActive } : user
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/delete/${id}`);
      alert("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between">
          <h5>Registered Users</h5>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/add")}
          >
            + Add User
          </button>
        </div>

        <div className="card-body p-0">
          <UserTable
            users={users}
            toggleStatus={toggleStatus}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
