"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header({ onLogout }) {
  return (
    <header className="w-full border-b border-gray-800/80 bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/wplas-logo.png"
            alt="WPLAS"
            width={140}
            height={40}
            priority
            className="object-contain"
          />
          <span className="hidden sm:block text-sm text-gray-300">
            Plataforma Acadêmica
          </span>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#home" className="hover:text-white transition">
            Home
          </a>
          <a href="#sobre" className="hover:text-white transition">
            Sobre
          </a>
          <a href="#servicos" className="hover:text-white transition">
            Serviços
          </a>
          <a href="#contato" className="hover:text-white transition">
            Contato
          </a>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition font-semibold text-sm"
          >
            Login
          </Link>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold text-sm"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
