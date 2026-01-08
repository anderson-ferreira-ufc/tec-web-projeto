"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Home");
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2">
          Entrar
        </h1>
        <p className="text-gray-400 mb-6">
          Acesse a plataforma de programação
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {error && (
            <p className="text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
          >
            Entrar
          </button>

          {/* Atalho para cadastro */}
          <p className="text-sm text-gray-400 text-center">
            Ainda não tem conta?{" "}
            <a
              href="/Register"
              className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
            >
              Criar conta
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
