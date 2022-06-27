import React from "react";
import queryString from "query-string";

const Login = () => {
  const parsed = queryString.parse(window.location.search);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parsed.client_id) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email"> Email </label>
        <input type={"email"} id="email" />
      </div>
      <div>
        <label htmlFor="password">Password </label>
        <input type={"email"} id="email" />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
