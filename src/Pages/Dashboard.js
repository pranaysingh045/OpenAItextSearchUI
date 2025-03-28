import { useState } from "react";

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const resetErrorMessage=()=>{
    setTimeout(()=>{
        setError('')
    },2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      setError("Please enter a search query.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/generate-summary/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_text: searchText }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.response);
      } else {
        setError(data.error || "Something went wrong.");
        resetErrorMessage()
      }
    } catch (err) {
      setError("Failed to fetch results. Try again later.");
      resetErrorMessage()
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Search Text</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="search"
          value={searchText}
          placeholder="Enter search text..."
          onChange={handleChange}
          className="search-input"
          required
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {result && (
        <div className="result-container">
          <h3>Search Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
