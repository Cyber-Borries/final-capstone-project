//this component is to signin

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  let name, value;
  const handleinputs = (event) => {
    // console.log(event);
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const SendData = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmpassword } = user;
    const res = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmpassword,
      }),
    });

    const data = await res.json();
    // console.log(data);
    if (res.status === 400 || !data) {
      console.log("if");

      window.alert("User already exists or wrong info supplie");
      console.log("Invalid registeration");
    } else if (res.status === 422) {
      console.log("else if");
      window.alert("Either email already exits or password didn't match");
    } else {
      console.log("else");
      window.alert("Registration Succesful");
      console.log("registeration Successful");
      history.push("/login");
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="string"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="name"
              id="name"
              onChange={handleinputs}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={handleinputs}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="form-control mt-1"
              onChange={handleinputs}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              className="form-control mt-1"
              onChange={handleinputs}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={SendData}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
