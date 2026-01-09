import React, { useState } from "react";

const UserForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="text"
          className="form-control"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        <label className="form-check-label">Active</label>
      </div>

      <button className="btn btn-primary w-100">Save</button>
    </form>
  );
};

export default UserForm;
