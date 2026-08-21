import Image from "next/image";
import Link from "next/link";
import { supabase } from "./lib/supabase"; 
import { ExternalLink, GitGraph } from "lucide-react"; 
import { ScrollReveal } from "./components/ScrollReveal";

// export const revalidate = 3600; // Optional: revalidate cache every hour

export default async function Home() {
  // Fetch projects from Supabase
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black overflow-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <Image
          src="/sam-sunset-rocky-landscape.jpg"
          alt="Sam Polak standing on rocks during sunset"
          fill
          sizes="100vw"
          className="object-cover sm:object-center object-[64%] opacity-80 -translate-y-10"
          priority
        />

        {/* Reflection */}
        <Image
          src="/sam-sunset-rocky-landscape.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover sm:object-center object-[64%] opacity-50 origin-bottom -scale-y-100 blur-xs [mask-image:linear-gradient(to_bottom,transparent_50%,black)] -translate-y-10 pointer-events-none"
          priority
        />

        {/* Decorative Halftone Dots (Top Left) */}
        <div className="absolute -top-92 -left-100 lg:-top-100 lg:-left-80 w-140 h-200 lg:w-140 lg:h-140 opacity-70 pointer-events-none z-0">
          <Image
            src="/dots.webp"
            alt="Halftone Dots"
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Decorative Halftone Dots (Bottom Right) */}
        <div className="absolute -bottom-100 -right-100 lg:-bottom-130 lg:-right-190 w-140 h-200 lg:w-240 lg:h-240 opacity-70 pointer-events-none z-0">
          <Image
            src="/dots.webp"
            alt="Halftone Dots"
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-6 lg:p-12 min-h-120">

          {/* Desktop Header */}
          <header className="hidden lg:flex w-full px-14 justify-between items-start tracking-wide text-sm font-medium font-geist">
            <div className="leading-tight tracking-wider">
              <p>THE FUTURE AND</p>
              <p>PAST DOCUMENTED</p>
            </div>
            <div className="flex gap-4">
              <p className="font-liter text-gray-300">Project by</p>
              <div className="font-liter leading-tight">
                <p>Sam Polak</p>
                <p className="font-liter text-gray-300">Creative Director</p>
              </div>
            </div>
            <div className="font-liter flex gap-16">
              <p>2026 Edition</p>
              <div className="leading-tight">
                <p>Computer Science student</p>
                <p>Based in Utrecht, the Netherlands</p>
              </div>
            </div>
          </header>

          {/* Tablet & Mobile Header */}
          <header className="flex lg:hidden justify-between items-start text-xs sm:text-sm font-geist">
            <div className="leading-tight hidden sm:block tracking-wider uppercase font-bold translate-y-[10rem] translate-x-[2rem]">
              <p>The Future And</p>
              <p>Past Documented</p>
            </div>
            <div className="sm:hidden"></div>
            <div className="font-liter text-right leading-tight">
              <div className="hidden sm:block">
                <p>Computer Science student</p>
                <p>Based in Utrecht, the Netherlands</p>
                <p className="mt-2 text-gray-300">2026 Edition</p>
              </div>
              <div className="sm:hidden pt-10">
                <p className="text-gray-300 text-lg">2026 Edition</p>
                <p className="text-xl tracking-widest font-unbounded">PORTFOLIO</p>
              </div>
            </div>
          </header>

          {/* Footer / Hero Text */}
          <footer className="relative w-full flex flex-col justify-end h-full pb-8 lg:pb-0">
            <div className="font-liter sm:hidden absolute bottom-8 left-0 text-xs sm:text-sm leading-tight font-geist">
              <p>Computer Science student</p>
              <p>Based in Utrecht, the Netherlands</p>
            </div>
            <div className="hidden sm:block lg:hidden w-full text-center mb-2">
              <p className="font-unbounded tracking-widest text-xl font-bold uppercase">PORTFOLIO</p>
            </div>
            <div className="hidden lg:block absolute left-0 bottom-62">
              <p className="font-unbounded tracking-[0.2em] text-xl font-bold uppercase">PORTFOLIO</p>
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center justify-end md:pr-4 lg:pr-5 xl:pr-13 gap-2 sm:gap-6 lg:gap-8 mb-16 sm:mb-24 lg:mb-24 xl:mb-12 ">
              <h1 className="font-unbounded text-[5.5rem] sm:text-[6.5rem] lg:text-[9rem] xl:text-[12rem] leading-none font-black tracking-tighter">
                SAM
              </h1>
              <div className="flex items-center justify-center px-12 py-3 sm:px-14 sm:py-5 lg:px-25 lg:py-6 xl:px-32 xl:py-12 border-[2px] lg:border-[3px] border-white sm:self-end sm:mb-4 lg:mb-8" style={{ borderRadius: '50%' }}>
                <span className="font-liter text-[3rem] sm:text-[4rem] lg:text-[6rem] xl:text-[8rem] leading-none lowercase mt-[-0.1em]">
                  polak
                </span>
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="max-w-5xl mx-auto px-6 py-32 z-20 relative bg-black">
        <h2 className="font-unbounded text-3xl md:text-5xl font-bold mb-16">SELECTED WORKS</h2>

        <div className="grid gap-12 md:gap-24">
          {projects?.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.15}>
            <article
              key={project.id}
              className="group flex flex-col gap-4 border-b border-white/20 pb-12"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-geist text-2xl md:text-4xl font-semibold">
                  <Link href={`/projects/${project.slug}`} className="hover:opacity-70 transition-opacity">
                    {project.title}
                  </Link>
                </h3>

                {/* Links */}
                <div className="flex gap-4 text-white/50">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      <GitGraph size={24} />
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>

              <p className="font-liter text-white/70 text-lg md:text-xl max-w-2xl">
                {project.short_description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mt-4">
                {project.tech_stack.map((tech: string) => (
                  <span
                    key={tech}
                    className="font-geist px-4 py-1.5 text-xs tracking-wider uppercase border border-white/30 rounded-full"
                  >
                    {tech}
                  </span>
                 
                ))}
              </div>
            </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </main>
  );
}