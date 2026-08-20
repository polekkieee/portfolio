import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* Background Image */}
      <Image
        src="/sam-sunset-rocky-landscape.jpg"
        alt="Sam Polak standing on rocks during sunset"
        fill
        className="object-cover object-center opacity-80"
        priority
      />

      {/* Decorative Halftone Dots (Top Left) */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-50 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle fill="white" cx="4" cy="4" r="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full p-6 lg:p-12">
        
        {/* --- HEADER --- */}
        {/* Desktop Header */}
        <header className="hidden lg:flex w-full justify-between items-start tracking-wide text-sm font-medium font-geist">
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
          {/* Tablet Top Left */}
          <div className="leading-tight hidden sm:block tracking-wider uppercase font-bold"> 
            <p>The Future And</p>
            <p>Past Documented</p>
          </div>
          {/* Mobile Spacer */}
          <div className="sm:hidden"></div>

          {/* Right Side */}
          <div className="font-liter text-right leading-tight">
            <div className="hidden sm:block"> {/* Tablet */}
              <p>Computer Science student</p>
              <p>Based in Utrecht, the Netherlands</p>
              <p className="mt-2 text-gray-300">2026 Edition</p>
            </div>
            <div className="sm:hidden font-bold"> {/* Mobile */}
              <p className="text-gray-300">2026 Edition</p>
              <p className="text-lg tracking-widest mt-1 font-unbounded">PORTFLIO</p>
            </div>
          </div>
        </header>


        {/* --- FOOTER / HERO TEXT --- */}
        <footer className="relative w-full flex flex-col justify-end h-full pb-8 lg:pb-0">
          
          {/* Mobile Bottom-Left Text */}
          <div className="lg:hidden absolute bottom-8 left-0 text-xs sm:text-sm leading-tight font-geist">
             <p>Computer Science student</p>
             <p>Based in Utrecht, the Netherlands</p>
          </div>

          {/* Tablet PORTFLIO */}
          <div className="hidden sm:block lg:hidden w-full text-center mb-2">
            <p className="font-unbounded tracking-widest text-xl font-bold uppercase">PORTFOLIO</p>
          </div>

          {/* Desktop PORTFLIO */}
          <div className="hidden lg:block absolute left-0 bottom-62">
            <p className="font-unbounded tracking-[0.2em] text-xl font-bold uppercase">PORTFOLIO</p>
          </div>

          {/* Huge Name Lockup */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-end md:pr-4 lg:pr-5 xl:pr-13 gap-2 sm:gap-6 lg:gap-8 mb-16 sm:mb-24 lg:mb-24 xl:mb-12">
            <h1 className="font-unbounded text-[5.5rem] sm:text-[6.5rem] lg:text-[9rem] xl:text-[12rem] leading-none font-black tracking-tighter">
              SAM
            </h1>
            
            {/* Ellipse for "polak" */}
            <div 
              className="flex items-center justify-center px-12 py-3 sm:px-16 sm:py-5 lg:px-25 lg:py-6 xl:px-34 xl:py-12 border-[2px] lg:border-[3px] border-white sm:self-end sm:mb-4 lg:mb-8"
              style={{ borderRadius: '50%' }}
            >
              <span className="font-liter text-[3rem] sm:text-[4rem] lg:text-[6rem] xl:text-[8rem] leading-none lowercase mt-[-0.1em]">
                polak
              </span>
            </div>
          </div>

          {/* Decorative Halftone Dots (Bottom Right) */}
          <div className="absolute bottom-0 right-[-2rem] w-48 h-48 opacity-50 pointer-events-none rotate-45">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots-br" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle fill="white" cx="5" cy="5" r="2.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-br)" />
            </svg>
          </div>
        </footer>

      </div>
    </main>
  );
}