"use client"; // Ensure this is at the top for client-side rendering

import { useState } from "react";
import { auth, googleProvider } from "../firebase"; // Assuming firebase.js is set up

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Handle Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Logged in with Google: ", result.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google login error: ", error);
      setErrorMessage("Failed to login with Google");
    }
  };

  // Handle Email and Password Login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Email login error: ", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to MeritLand</h1>
        <div className="space-y-4">
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          
          <button
            onClick={signInWithGoogle}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none"
          >
            Login with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-400 mx-2">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleEmailLogin}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg focus:outline-none"
            >
              Login with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;