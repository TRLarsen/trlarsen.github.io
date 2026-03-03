export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-zinc-800 bg-zinc-950 text-zinc-500 text-sm text-center">
      <div className="max-w-4xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Tyler R. Larsen. Built with Next.js & Tailwind CSS. Hosted on GitHub Pages.</p>
      </div>
    </footer>
  );
}