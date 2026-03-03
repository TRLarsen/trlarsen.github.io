import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMarkdownData, getAllContentFromFolder } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllContentFromFolder("writing");
  return posts.map((post: any) => ({
    slug: post.id,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getMarkdownData(`writing/${slug}`);
    
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        
        <div className="flex-grow max-w-6xl mx-auto w-full px-6 pt-40 pb-20 flex gap-12">
          {/* Sidebar / Table of Contents */}
          <aside className="hidden lg:block w-64 sticky top-40 h-fit self-start shrink-0">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-6">In this article</h4>
            <nav className="space-y-3">
              {post.headings.map((h: any, i: number) => (
                <Link 
                  key={i} 
                  href={`#${h.id}`}
                  className={`block text-sm transition-colors hover:text-accent ${
                    h.level === 3 ? "pl-4 text-foreground/40" : "text-foreground/60 font-medium"
                  }`}
                >
                  {h.text}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="max-w-3xl w-full">
            <article className="space-y-12">
              <header className="space-y-4">
                <time className="text-sm font-mono text-foreground/40">{post.date}</time>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  {post.title}
                </h1>
              </header>
              
              <div 
                className="prose-article font-serif text-lg leading-relaxed text-foreground/80"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>
          </main>
        </div>
        
        <Footer />
      </div>
    );
  } catch (e) {
    notFound();
  }
}