import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import Add from "../img/addAvatar.png";

export default function Register() {
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            setLoading(true);

            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                null,
                (error) => {
                    setLoading(false);
                    setError("Error uploading avatar image. Please try again.");
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {});

                        setLoading(false);
                        navigate("/");
                    });
                }
            );
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
                    <input type="text" placeholder="Display Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="file" id="file" style={{ display: "none" }} />
                    <label htmlFor="file">
                        <img src={Add} alt="Add Avatar" />
                        <span>Add Avatar</span>
                    </label>
                    <button className="btn" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                {error && <span className="error-msg">{error}</span>}
                <p>You have an Account? {<Link to="/login" style={{textDecoration:"none"}}>Login</Link>}</p>
            </div>
        </div>
    );
}
