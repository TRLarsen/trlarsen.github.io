import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllContentFromFolder } from "@/lib/markdown";

export default async function Writing() {
  const posts = await getAllContentFromFolder("writing");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-16">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Writing</h1>
          <p className="text-xl text-foreground/60 max-w-2xl font-serif">
            Essays, technical notes, and academic reflections.
          </p>
        </header>

        <section className="space-y-12">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <article key={post.id} className="group cursor-pointer">
                <time className="text-sm font-mono text-foreground/40">{post.date}</time>
                <h2 className="text-2xl font-semibold mt-2 group-hover:text-accent transition-colors text-foreground">
                  <a href={`/writing/${post.id}`}>{post.title}</a>
                </h2>
                <div 
                  className="text-foreground/60 mt-3 leading-relaxed max-w-2xl prose-custom line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
                <div className="mt-4 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-all">
                  Read full essay →
                </div>
              </article>
            ))
          ) : (
            <p className="text-foreground/40 italic">Coming soon...</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}