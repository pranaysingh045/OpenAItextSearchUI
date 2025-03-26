import { useState } from "react";

function Registration() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful!");
        setForm({ username: "", email: "", password: "", confirmPassword: "" });
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="username"
          value={form.username}
          placeholder="Username"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          placeholder="Confirm Password"
          className="input-field"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Registration;
