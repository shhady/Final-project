import React, { useState, useRef } from "react";
import "./Register.css";
import axios from "axios";
export default function Register({ setShowRegisterBox }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const familyRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      family: familyRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post(" http://localhost:8080/users/register", newUser);
      // setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="MainContainerRegister">
      <div>
        <h1>Register</h1>
      </div>
      <div>
        <button onClick={() => setShowRegisterBox(false)}>Close Window</button>
      </div>
      <div className="formContainer">
        <form>
          <p>Name</p>
          <input type="text" placeholder="Name" ref={nameRef} />
          <p>family</p>
          <input type="text" placeholder="family" ref={familyRef} />
          <p>phone</p>
          <input type="phone" placeholder="phone" ref={phoneRef} />
          <p>email</p>
          <input type="email" placeholder="email" ref={emailRef} />
          <p>password</p>
          <input type="password" placeholder="password" ref={passwordRef} />
          <button onClick={handleSubmit}>Register</button>
          {success && (
            <span style={{ textAlign: "center", color: "green" }}>
              Registered Successfully
            </span>
          )}{" "}
          {error && (
            <span style={{ textAlign: "center", color: "red" }}>
              Something went wrong, try again
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
