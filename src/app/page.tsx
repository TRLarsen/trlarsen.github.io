import { Github, Linkedin, Mail, FileText, MapPin, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMarkdownData, getAllContentFromFolder } from "@/lib/markdown";

export default async function Home() {
  const bio = await getMarkdownData("bio");
  const news = await getAllContentFromFolder("news");
  const allResearch = await getAllContentFromFolder("research");
  const research = allResearch.filter((r: any) => r.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent/30">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <div className="max-w-4xl mx-auto px-6 space-y-20 pb-20">
          {/* Hero Section */}
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                {bio.name}
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-foreground/60 text-sm">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> {bio.role}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {bio.location}
                </span>
              </div>
            </div>

            <div 
              className="text-lg sm:text-xl text-foreground/80 max-w-3xl leading-relaxed font-serif prose-custom"
              dangerouslySetInnerHTML={{ __html: bio.contentHtml }}
            />

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 font-medium rounded-md transition-all">
                <FileText className="w-4 h-4" /> Download CV
              </a>
              <div className="flex items-center gap-5 border-l border-border pl-6">
                <a href={bio.github} className="text-foreground/60 hover:text-accent transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={bio.linkedin} className="text-foreground/60 hover:text-accent transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${bio.email}`} className="text-foreground/60 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </section>

          {/* Featured Sections */}
          <div className="grid sm:grid-cols-2 gap-12 pt-12 border-t border-border">
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">Current Research</h2>
              {research.map((item: any) => (
                <div key={item.id} className="space-y-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div 
                    className="text-foreground/60 text-sm leading-relaxed prose-custom"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                  />
                  <a href="/research" className="inline-block text-sm font-medium text-accent hover:underline decoration-2 underline-offset-4">
                    Learn more →
                  </a>
                </div>
              ))}
            </section>

            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">Recent News</h2>
              <div className="space-y-4">
                {news.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <span className="text-xs font-mono text-foreground/30 mt-1 whitespace-nowrap">{item.date}</span>
                    <div 
                      className="text-sm text-foreground/80 prose-custom"
                      dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}