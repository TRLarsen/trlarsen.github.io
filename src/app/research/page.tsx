import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllContentFromFolder } from "@/lib/markdown";

export default async function Research() {
  const research = await getAllContentFromFolder("research");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-16">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Research</h1>
          <p className="text-lg text-foreground/60 max-w-2xl font-serif">
            My work focuses on autopilot ecosystems, safety-critical systems, and UAV autonomy.
          </p>
        </header>

        <section className="space-y-12">
          <div className="space-y-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">Publications & Projects</h2>
            {research.map((pub: any) => (
              <div key={pub.id} className="group relative space-y-2">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    {pub.title}
                  </a>
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {pub.authors?.join(", ")}
                </p>
                <p className="text-sm italic text-foreground/40">
                  {pub.venue}
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed pt-2">
                  {pub.content}
                </p>
                <div className="pt-2">
                  <a href={pub.link} className="text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-0.5 hover:border-accent transition-all">
                    Link
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}