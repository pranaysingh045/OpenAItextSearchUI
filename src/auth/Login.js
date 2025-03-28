import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [initialValue, setInitialValue] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Submitting form data:", initialValue);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialValue),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Login successful! Tokens:", data);

      // Store the access token
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Reset form
      setInitialValue({ username: "", password: "" });

      // Redirect to dashboard (or another page)
      window.location.href = "/dashboard"; // Change URL as needed
    } catch (error) {
      console.error("Login error:", error.message);
      setMessage(error.message);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input-field"
          value={initialValue.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={initialValue.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Login</button>
        <p><Link to='/registration'>Signup</Link></p>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default Login;
