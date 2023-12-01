import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">CONNECTIFY</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="btn">Sign In</button>
                </form>
                {error && <span className="error-msg">{error}</span>}
                <p>You have an Account? {<Link to="/register" style={{ textDecoration: "none" }}>Register</Link>} </p>
            </div>
        </div>
    );
}   