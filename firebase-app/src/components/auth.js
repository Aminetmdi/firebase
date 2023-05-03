import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div style={{ borderBottom: "2px solid gray" }} className="container-div">
        <h1>Sign In</h1>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />
        <div className="button">
          <button className="signinBtn" onClick={signIn}>
            Sign In
          </button>

          <button className="signinGoogleBtn" onClick={signinWithGoogle}>
            Sign in With Google
          </button>

          <button className="logoutBtn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
