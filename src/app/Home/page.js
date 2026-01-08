"use client";

import "./home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  // 🔗 URL externa dos exercícios (página do artigo)
  const EXERCISES_URL = "COLE_AQUI_A_URL_DOS_EXERCICIOS";

  // 📄 PDF do artigo (opcional)
  const PAPER_URL = "/wplas-artigo.pdf";

  const isExercisesConfigured = useMemo(() => {
    return EXERCISES_URL && !EXERCISES_URL.includes("COLE_AQUI");
  }, [EXERCISES_URL]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      setUserName(user.displayName || user.email || "Usuário");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  function openExercises() {
    if (!isExercisesConfigured) {
      alert("A URL dos exercícios ainda não foi configurada.");
      return;
    }
    window.open(EXERCISES_URL, "_blank", "noopener,noreferrer");
  }

  function openPaper() {
    window.open(PAPER_URL, "_blank", "noopener,noreferrer");
  }

  async function logout() {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Erro ao sair:", err);
      alert("Erro ao encerrar a sessão.");
    }
  }

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-wrap">
          <div className="loading-card">
            <div className="spinner" />
            <div>
              <p className="loading-title">Carregando sua área…</p>
              <p className="loading-sub">
                Validando autenticação e preparando a plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header onLogout={logout} />

      <main className="home-container">
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="chip">Bem-vindo, {userName}</p>

            <h1>Aprenda. Pratique. Construa.</h1>

            <p className="hero-lead">
              Esta plataforma foi criada para apoiar o aprendizado em
              desenvolvimento Web, conectando teoria, prática e código real,
              com foco em interatividade e autoestudo.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={openExercises}>
                Acessar Exercícios
              </button>

              <button
                className="btn-secondary"
                onClick={() => router.push("/")}
              >
                Ir para Login
              </button>

              <button className="btn-ghost" onClick={openPaper}>
                Abrir Artigo (PDF)
              </button>
            </div>

            <div className="hero-meta">
              <div className="meta-item">
                <span className="meta-label">Disciplina</span>
                <span className="meta-value">TechWeb — UFC</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Abordagem</span>
                <span className="meta-value">Aprendizado ativo</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Foco</span>
                <span className="meta-value">
                  Interatividade e autonomia
                </span>
              </div>
            </div>
          </div>

          <div className="hero-footer">
            <code>const dev = true;</code>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="section" id="sobre">
          <div className="section-head">
            <h2>Como funciona</h2>
            <p>
              O sistema foi projetado para oferecer uma navegação simples,
              segura e alinhada ao fluxo apresentado no artigo acadêmico.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div>
                <h3>Autenticação</h3>
                <p>
                  O acesso à plataforma é realizado por meio de login com e-mail
                  e senha, garantindo controle de sessão e segurança.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-num">2</div>
              <div>
                <h3>Homepage acadêmica</h3>
                <p>
                  Após o login, o usuário visualiza a proposta do sistema,
                  seus objetivos pedagógicos e os recursos disponíveis.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-num">3</div>
              <div>
                <h3>Exercícios externos</h3>
                <p>
                  Os exercícios do artigo são acessados em uma página externa,
                  mantendo a aplicação focada na navegação e na experiência.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PILARES */}
        <section className="section" id="servicos">
          <div className="section-head">
            <h2>Pilares do WPLAS</h2>
            <p>
              A plataforma se fundamenta em três pilares pedagógicos principais.
            </p>
          </div>

          <div className="grid-3">
            <article className="card">
              <h3>Interatividade</h3>
              <p>
                O aprendizado ocorre por meio da interação constante do aluno
                com o conteúdo, reduzindo a passividade no estudo.
              </p>
            </article>

            <article className="card">
              <h3>Autonomia</h3>
              <p>
                O sistema foi pensado para favorecer o autoestudo, permitindo
                que o aluno avance no próprio ritmo.
              </p>
            </article>

            <article className="card">
              <h3>Código real</h3>
              <p>
                A proposta conecta teoria e prática, preparando o estudante
                para compreender e escrever código real.
              </p>
            </article>
          </div>
        </section>

        {/* RECURSOS */}
        <section className="section" id="contato">
          <div className="section-head">
            <h2>Recursos do projeto</h2>
            <p>
              Abaixo estão os principais recursos utilizados na avaliação do
              trabalho.
            </p>
          </div>

          <div className="grid-3">
            <article className="card card-action">
              <h3>Exercícios</h3>
              <p>
                Acesso à página externa que contém os exercícios propostos
                no artigo.
              </p>

              <button
                className="btn-primary btn-full"
                onClick={openExercises}
              >
                Abrir Exercícios
              </button>

              {!isExercisesConfigured && (
                <p className="warn">
                  Configure a URL dos exercícios no código.
                </p>
              )}
            </article>

            <article className="card card-action">
              <h3>Artigo (PDF)</h3>
              <p>
                Documento científico que fundamenta o desenvolvimento do
                sistema.
              </p>

              <button
                className="btn-secondary btn-full"
                onClick={openPaper}
              >
                Abrir PDF
              </button>
            </article>

            <article className="card card-action">
              <h3>Sessão</h3>
              <p>
                Encerrar a sessão atual e retornar à tela de login.
              </p>

              <button className="btn-ghost btn-full" onClick={logout}>
                Sair
              </button>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
