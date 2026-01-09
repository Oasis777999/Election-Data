import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../UserForm";
import api from "../../apis/api";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [existingUser, setExistingUser] = useState(null);

  // 🔹 Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/admin/${id}`);
        setExistingUser(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load user");
      }
    };

    fetchUser();
  }, [id]);

  // 🔹 Update user
  const handleUpdate = async (data) => {
    try {
      await api.put(`/admin/update/${id}`, data);
      alert("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    }
  };

  if (!existingUser) return <p>Loading...</p>;

  return (
    <div className="container p-4">
      <h4>Edit User</h4>
      <UserForm initialData={existingUser} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditUser;
