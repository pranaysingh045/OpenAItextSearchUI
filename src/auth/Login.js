import "./style.css";


function Login(){
    function handleChange(){

    }
    const handleSubmit = ()=>{

    }
return(
<div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input-field"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
)
}
export default Login