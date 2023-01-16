import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [user, setUser] = useState({
    name: "Adriaan",
    email: "adriaan.bornman1@gmail.com",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className="home-container container">
        <h1 className="headings company-name welcome">Adriaan's Tech</h1>
        <span> {isLoggedIn ? `Hello, ${user.name}` : "Please log in"}</span>
        <div className="values-mission container-md">
          <div className="values">
            <h3>Our values</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="mission">
            <h3>Our mission</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
