import React from "react";
import UserForm from "../UserForm";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";

const AddUser = () => {
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    try {
       await api.post("/admin/add", data);
      alert("User added successfully");
      navigate("/users");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="container p-4">
      <h4>Add User</h4>
      <UserForm
        initialData={{ email: "", password: "", isActive: true }}
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default AddUser;
