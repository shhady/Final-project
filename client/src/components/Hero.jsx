import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="Hero">
      <div className="form">
        <h1 className="title">Let's Do Sport</h1>
        <p>
          Doing sport is so crucial to keep our bodies healthy. On this website,
          you can find teams to join and play the kind of sports you like.
          Simply select your location down below and find the courts around you.
        </p>
        <Link to="GoogleMap">
          <button style={{ margin: "1rem" }}>
            Find Courts Around You(Maps)
          </button>
        </Link>
        <Link to="/AddCourt">
          <button style={{ margin: "1rem" }}>Add Paid Court</button>
        </Link>
        <Link to="/AddFreeCourt">
          <button style={{ margin: "1rem" }}>Add Free Court</button>
        </Link>
      </div>
    </div>
  );
}
