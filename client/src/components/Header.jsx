import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
export default function Header() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [showRegisterBox, setShowRegisterBox] = useState(false);
  const [showLogInBox, setShowLogInBox] = useState(false);
  const handleShow = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };
  // const handleShowLogin = () => {
  //   setShowLogInBox(!showLogInBox);
  //   setShowButtons(!showButtons);
  //   setShowRegisterBox(false);
  // };
  // const handleShowRegister = () => {
  //   setShowButtons(!showButtons);
  //   setShowRegisterBox(!showRegisterBox);
  //   setShowLogInBox(false);
  // };
  return (
    <div className="Header">
      <div className="HeaderInfo">
        <Link to="/">
          <div style={{ color: "white" }}>Logo</div>
        </Link>

        <div className="Auth">
          {!currentUser ? (
            <>
              {!showRegisterBox && (
                <button
                  className="signup"
                  onClick={() => setShowLogInBox(!showLogInBox)}
                >
                  LogIn
                </button>
              )}
              {/* <Link to="/Register"> */}

              {!showLogInBox && (
                <button
                  className="signup"
                  onClick={() => setShowRegisterBox(!showRegisterBox)}
                >
                  SignUp
                </button>
              )}
              {/* </Link> */}
            </>
          ) : (
            <button className="signup" onClick={handleShow}>
              LogOut
            </button>
          )}
        </div>
        {showRegisterBox && (
          <Register setShowRegisterBox={setShowRegisterBox} />
        )}
        {showLogInBox && (
          <Login
            setShowLogInBox={setShowLogInBox}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    </div>
  );
}
