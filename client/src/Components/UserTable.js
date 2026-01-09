import React from "react";
import { useNavigate } from "react-router-dom";

const UserTable = ({ users, toggleStatus, deleteUser }) => {
  const navigate = useNavigate();

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover text-center align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td className="text-break">{user.email}</td>

              <td>
                <button
                  className={`btn btn-sm ${
                    user.isActive ? "btn-success" : "btn-secondary"
                  }`}
                  onClick={() => toggleStatus(user._id)}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </button>
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit/${user._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
