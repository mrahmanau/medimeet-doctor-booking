/* eslint-disable @typescript-eslint/no-unused-vars */
//src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store token securely
      localStorage.setItem("token", data.token);

      // Redirect based on role
      switch (data.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "doctor":
          router.push("/doctor/dashboard");
          break;
        case "patient":
        default:
          router.push("/dashboard");
          break;
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col bg-white items-center justify-center min-h-screen px-4">
      <div className="bg-gray-800 p-6">
        <h1 className="text-3xl text-center font-bold text-gray-200 mb-6">
          Login
        </h1>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 p-6 rounded shadow"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
