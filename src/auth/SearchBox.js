import { useState } from "react";
import "./style.css";


function SearchBox() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Query:", query);
    // Add search logic here
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Search</h2>
      <form onSubmit={handleSearch} className="login-form">
        {/* <input
          type="text"
          placeholder="Search..."
          className="input-field"
          value={query}
          onChange={handleChange}
        /> */}
                <input
          type="text"
          name="username"
          placeholder="Username"
          className="input-field"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Search</button>
      </form>
    </div>
  );
}

export default SearchBox;
