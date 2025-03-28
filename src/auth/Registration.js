import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    conformpassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.conformpassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting...");
        
        // Store JWT tokens in localStorage
        localStorage.setItem("accessToken", data.tokens.access);
        localStorage.setItem("refreshToken", data.tokens.refresh);

        // Reset form
        setForm({ username: "", email: "", password: "", confirmPassword: "" });

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard or login page
        }, 2000);
      } else {
        setError(data.username || data.email || "Registration failed.");
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
          name="conformpassword"
          value={form.confirmPassword}
          placeholder="Confirm Password"
          className="input-field"
          onChange={handleChange}
          required
        />
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p><Link to="/">Sign In</Link></p>
      </form>
    </div>
  );
}

export default Registration;
