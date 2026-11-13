import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { ArrowLeft, ExternalLink, GitGraph } from "lucide-react";
import { ScrollReveal } from "@/app/components/ScrollReveal";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Simple markdown parser to render headings, bold text, lists, and paragraphs
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-2 font-liter text-white/80 my-4 text-base md:text-lg">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  const renderInline = (text: string) => {
    // Basic inline markdown: bold (**text**), italics (*text*)
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index} className="text-white/90 italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${index}`} className="font-unbounded text-xl md:text-2xl font-bold mt-10 mb-4 text-white">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${index}`} className="font-unbounded text-2xl md:text-3xl font-bold mt-12 mb-4 text-white">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={`h1-${index}`} className="font-unbounded text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">
          {trimmed.slice(2)}
        </h1>
      );
    } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      listItems.push(
        <li key={`li-${index}`}>
          {renderInline(trimmed.slice(2))}
        </li>
      );
    } else {
      flushList();
      elements.push(
        <p key={`p-${index}`} className="font-liter text-white/80 text-base md:text-lg leading-relaxed mb-4">
          {renderInline(trimmed)}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-2">{elements}</div>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-geist uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <ScrollReveal>
          {/* Header */}
          <header className="border-b border-white/20 pb-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <h1 className="font-unbounded text-3xl md:text-5xl lg:text-6xl font-bold">
                {project.title}
              </h1>

              {/* Action Links */}
              <div className="flex items-center gap-4 text-white/60">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:border-white hover:text-white transition-colors text-sm font-geist"
                  >
                    <GitGraph size={18} />
                    <span>Source</span>
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-white/80 transition-colors text-sm font-geist font-semibold"
                  >
                    <span>Visit Live</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="font-liter text-lg md:text-xl text-white/70 max-w-2xl mb-6">
              {project.short_description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.tech_stack?.map((tech: string) => (
                <span
                  key={tech}
                  className="font-geist px-3 py-1 text-xs tracking-wider uppercase border border-white/30 rounded-full text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Optional Project Hero Image */}
          {project.image_url && (
            <div className="relative w-full h-[300px] md:h-[450px] mb-12 rounded-lg overflow-hidden border border-white/10">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          {project.content ? (
            <article className="prose prose-invert max-w-none">
              <MarkdownContent content={project.content} />
            </article>
          ) : null}
        </ScrollReveal>
      </div>
    </main>
  );
}
