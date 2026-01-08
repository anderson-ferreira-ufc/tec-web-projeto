"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Salva o nome no perfil do usuário
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      router.push("/");
    } catch (err) {
      console.error("Firebase register error:", err);
      const messages = {
        "auth/email-already-in-use": "Esse e-mail já está cadastrado.",
        "auth/invalid-email": "Formato de e-mail inválido.",
        "auth/weak-password": "A senha precisa de pelo menos 6 caracteres.",
        "auth/operation-not-allowed": "Habilite Email/Password no console do Firebase."
      };
      setError(messages[err.code] ?? "Falha ao criar conta. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Lado Esquerdo - Mensagem Motivacional */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-purple-600 to-fuchsia-700 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Comece sua jornada 🚀
          </h1>
          <p className="text-sm text-purple-100 leading-relaxed">
            Crie sua conta e tenha acesso a conteúdos práticos,
            trilhas de aprendizado e projetos reais.
          </p>

          <div className="mt-8 font-mono text-sm bg-black/30 p-4 rounded-lg">
            <span className="text-green-400">const</span>{" "}
            <span className="text-blue-400">dev</span> ={" "}
            <span className="text-yellow-300">true</span>;
          </div>
        </div>

        {/* Formulário */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Criar conta
          </h2>
          <p className="text-gray-400 mb-6">
            Dê o primeiro passo na programação
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="dev@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="Crie uma senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
            >
              Criar conta
            </button>

            <p className="text-sm text-gray-400 text-center">
              Já possui conta?{" "}
              <a href="/" className="text-indigo-400 hover:underline">
                Entrar
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
