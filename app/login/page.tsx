"use client";  // Ensure this is at the top of the file

import { useState } from "react";
import { auth, googleProvider } from "../../firebase"; // Make sure this path is correct
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");  // State for email
  const [password, setPassword] = useState("");  // State for password
  const [error, setError] = useState<string | null>(null);  // State for error message
  const router = useRouter();  // Router to redirect

  // Handle email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");  // Redirect to the home page
    } catch (err) {
      setError("Login failed. Check credentials.");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");  // Redirect to the home page
    } catch (err) {
      setError("Google login failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}  {/* Display error message if exists */}
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update email state
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update password state
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-2 mt-2">
        Login with Google
      </button>
    </div>
  );
}
