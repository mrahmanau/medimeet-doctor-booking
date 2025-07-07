"use client"; // This makes the page a client component for React hooks

import React, { useState } from "react";

export default function RegisterPage() {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for handling loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basic front-end validation
    if (!name || !email || !password) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      // Call the backend API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If API returns error, show it
        setError(data.error || "Something went wrong!");
      } else {
        // Registration successful
        setSuccess("Registration successful! You can now log in.");
        // Optionally clear inputs
        setName("");
        setEmail("");
        setPassword("");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Network error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Register to MediMeet
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold text-black" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your full name"
        />

        <label className="block mb-2 font-semibold text-black" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        <label
          className="block mb-2 font-semibold text-black"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="At least 6 characters"
          minLength={6}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
}
