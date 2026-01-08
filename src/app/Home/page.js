"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  function handleLogout(){
     signOut(auth) 
      .then(()=>
        {
          router.push("/")
        }).catch((error)=>{ 
          console.error("Erro ao fazer o logout: ",error)
        })
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 text-white">
      <h1>Esta é a home page</h1>

      <button
      onClick={handleLogout}
      className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
    >
      Sair
    </button>
    </div>
  );
}
