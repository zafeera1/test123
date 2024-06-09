import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';

const SignUp = () => {
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  const [addUser, { error, data }] = useMutation(SIGNUP_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form State:", formState);

    try {
      const { data } = await addUser({ variables: { ...formState } });
      console.log("Signup response data:", data);
      Auth.login(data.register.token);
    } catch (e) {
      console.error("Signup error:", e);
    }
  };

  return (
    <div className="sign-up-form">
      <h2 id="sign-head">Sign Up</h2>
      <input
        className="input"
        placeholder="Username"
        name="username"
        type="text"
        value={formState.username}
        onChange={handleChange}
      />
      <input
        className="input"
        placeholder="Email"
        name="email"
        type="email"
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
      <button onClick={handleFormSubmit} id="sign-btn">
        Sign Up
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default SignUp;
