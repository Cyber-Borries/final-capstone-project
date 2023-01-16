//This is the signin component, in this component I will store the JWT token in sessionStorage
import React, { useContext, useState } from "react";
import { MainState } from "./AppLayout";
import "./Signin.css";

export default function Signin(props) {
  const value = useContext(MainState);
  let [isAdmin, setIsAdmin] = value;
  const [dbData, setDbData] = useState(sessionStorage.getItem("data"));
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePass = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (!response.hasOwnProperty("data")) {
          window.alert("Wrong credentials or user doesn't exist");
        } else {
          window.alert("Login successful");
        }
        setDbData(response);
        setIsAdmin(response.data.admin);
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user", response.data.admin);
      });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handlePass}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={LoginUser}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
