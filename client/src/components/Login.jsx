import React, { useRef, useState } from "react";
import "./Register.css";
import axios from "axios";
export default function Login({ setShowLogInBox, myStorage, setCurrentUser }) {
  const [error, setError] = useState(null);
  const emailRef = useRef();

  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(" http://localhost:8080/users/login", user);
      myStorage.setItem("user", res.data.email);

      setCurrentUser(res.data);

      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="MainContainerRegister">
      <div>
        <h1>Log In</h1>
      </div>
      <div>
        <button onClick={() => setShowLogInBox(false)}>Close window</button>
      </div>
      <div className="formContainer">
        <form onClick={handleSubmit}>
          <p>email</p>
          <input type="email" placeholder="email" ref={emailRef} />
          <p>password</p>
          <input type="password" placeholder="password" ref={passwordRef} />
          <button
            onClick={() => {
              setShowLogInBox(false);
            }}
          >
            Log In
          </button>
          {error && <div>Wrong email or password</div>}
        </form>
      </div>
    </div>
  );
}
