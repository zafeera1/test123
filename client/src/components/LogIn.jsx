import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import Auth from '../../utils/auth';

const LogIn = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data, token } = await login({ variables: { ...formState } });
      console.log("Login response data and token:", data, token, data.login.token);
      Auth.login(data.login.token);
      navigate('/profile');
    } catch (e) {
      console.error(e);
    }
    setFormState({ email: "", password: "" });
  };

  return (
    <div className="login-form">
      <h2 id="log-head">Login</h2>
      <input
        className="input"
        name="email"
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={handleChange}
      />
      <input
        className="input"
        placeholder="Password"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      <button onClick={handleFormSubmit} id="log-btn">
        Login
      </button>
      {error && <div>Login failed</div>}
    </div>
  );
};

export default LogIn;
