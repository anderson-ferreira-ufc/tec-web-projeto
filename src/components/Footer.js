export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-800/80 bg-black/30 backdrop-blur mt-10">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <div className="font-bold text-white">WPLAS</div>
            <p className="text-sm text-gray-400 mt-1">
              Projeto acadêmico — UFC • TechWeb
            </p>
          </div>

          <div className="text-sm text-gray-400">
            <p>
              Interatividade • Autoestudo • Ponte para o código real
            </p>
            <p className="mt-1">© {year} — Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
