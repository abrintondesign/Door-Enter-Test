import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Menu, ArrowRight, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Door Animation Transformations
  const doorRotation = useTransform(smoothProgress, [0, 0.3], [-35, -110]);
  const contentOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <div className="min-h-screen bg-brand-bg select-none">
      {/* Navigation */}
      <nav className="fixed top-[60px] right-[60px] z-50 flex gap-[30px] font-sans text-[11px] tracking-[0.1em] uppercase font-medium">
        <a href="#" className="text-white/60 hover:text-white transition-colors">Collections</a>
        <a href="#" className="text-white/60 hover:text-white transition-colors">Bespoke</a>
        <a href="#" className="text-white/60 hover:text-white transition-colors">Showroom</a>
        <a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a>
      </nav>

      {/* Main Experience Section */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex border-brand-line border overflow-hidden">
          
          {/* Sidebar Area */}
          <div className="w-full md:w-[45%] p-[60px] flex flex-col justify-between z-10 bg-brand-bg border-r border-brand-line">
            <div>
              <div className="font-sans text-[14px] font-bold tracking-[0.3em] uppercase text-brand-sub/50">
                Arch Door Co.
              </div>
              
              <motion.div 
                style={{ opacity: heroTextOpacity }}
                className="mt-[40px]"
              >
                <h1 className="font-sans text-7xl lg:text-[120px] leading-[0.85] font-bold uppercase -tracking-[0.05em] m-0">
                  Enter<br />
                  <span className="text-brand-accent">Pure</span><br />
                  Craft
                </h1>
                <p className="text-[18px] mt-[30px] text-brand-sub max-w-[320px] leading-[1.4] font-light">
                  Architectural pivot doors designed for the world's most distinguished residential projects.
                </p>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-[20px] mt-[60px]">
                  <div className="stat-item">
                    <div className="text-[10px] uppercase tracking-[0.1em] text-brand-label mb-[5px]">Material</div>
                    <div className="text-[14px] font-medium">Smoked Eucalyptus</div>
                  </div>
                  <div className="stat-item">
                    <div className="text-[10px] uppercase tracking-[0.1em] text-brand-label mb-[5px]">Height</div>
                    <div className="text-[14px] font-medium">Up to 4500mm</div>
                  </div>
                  <div className="stat-item">
                    <div className="text-[10px] uppercase tracking-[0.1em] text-brand-label mb-[5px]">Mechanism</div>
                    <div className="text-[14px] font-medium">FritsJurgens M+</div>
                  </div>
                  <div className="stat-item">
                    <div className="text-[10px] uppercase tracking-[0.1em] text-brand-label mb-[5px]">Finish</div>
                    <div className="text-[14px] font-medium">Matte Obsidian</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-auto">
              <a href="#" className="inline-block px-[40px] py-[20px] bg-white text-black font-bold text-[12px] uppercase tracking-[0.2em] transform hover:scale-105 transition-transform duration-300">
                Enquire Now
              </a>
            </div>
          </div>

          {/* Interactive Door Canvas */}
          <div className="hidden md:flex flex-1 bg-brand-canvas relative items-center justify-center overflow-hidden perspective-1500">
            {/* Background Accent Number */}
            <div className="absolute bottom-[20px] right-[40px] text-[280px] font-black text-[#111] leading-none select-none">
              01
            </div>

            {/* Interior Revelation */}
            <motion.div 
              style={{ opacity: contentOpacity }}
              className="absolute inset-0 z-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070" 
                alt="Luxury Interior" 
                className="w-full h-full object-cover opacity-40 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-radial-gradient from-brand-muted/20 to-brand-bg" />
            </motion.div>

            {/* Door Structure */}
            <div className="relative w-[360px] h-[600px] border-2 border-brand-muted flex items-center justify-end">
              {/* Backglow Reveal */}
              <div className="absolute inset-0 bg-radial-gradient from-[#332211] to-[#111] -z-10" />
              
              {/* The Actual Door Panel */}
              <motion.div 
                style={{ 
                  rotateY: doorRotation,
                  transformOrigin: "left"
                }}
                className="w-full h-full bg-linear-to-br from-[#1A1A1A] to-[#2A2A2A] border border-brand-accent door-shadow flex items-center justify-end preserve-3d"
              >
                {/* Door Handle */}
                <div className="w-[4px] h-[120px] bg-brand-gold mr-[30px] shadow-[0_0_15px_rgba(170,136,102,0.3)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Section */}
      <section className="py-[120px] px-[60px] border-b border-brand-line">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-[100px] items-start">
          <div className="flex-1">
            <h2 className="text-6xl font-bold uppercase -tracking-wider mb-12">Legacy</h2>
            <p className="text-xl text-brand-sub leading-relaxed font-light font-sans max-w-xl">
              From historical restorations to ultra-modern masterworks, Portal Doors combines ancient techniques with modern precision engineering. Every door is a unique commission.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1974" className="w-full grayscale border border-brand-line" referrerPolicy="no-referrer" />
             <img src="https://images.unsplash.com/photo-1582234372722-50d7ccc30e5a?q=80&w=1974" className="w-full grayscale border border-brand-line self-end" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-[60px] border-t border-brand-line">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="font-sans text-[14px] font-bold tracking-[0.3em] uppercase text-brand-sub/50 mb-8">
              Arch Door Co.
            </div>
            <p className="text-brand-sub/50 max-w-sm text-sm">
              Since 1984, we have redefined the threshold between space and time through masterful joinery.
            </p>
          </div>
          
          <div>
            <h6 className="text-[10px] uppercase tracking-widest font-bold text-brand-label mb-6">Contact</h6>
            <ul className="space-y-4 text-sm font-light text-brand-sub">
              <li className="flex items-center gap-3"><Phone size={14}/> +1 800 PORTAL</li>
              <li className="flex items-center gap-3"><Mail size={14}/> studio@portal.design</li>
              <li className="flex items-center gap-3"><Instagram size={14}/> @portal_doors</li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-[10px] uppercase tracking-widest font-bold text-brand-label mb-6">Offices</h6>
            <ul className="space-y-4 text-sm font-light text-brand-sub">
              <li className="flex items-center gap-3"><MapPin size={14}/> New York, NY</li>
              <li className="flex items-center gap-3"><MapPin size={14}/> London, UK</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-screen-xl mx-auto mt-24 pt-12 border-t border-brand-line/30 flex justify-between text-[10px] uppercase tracking-widest text-brand-label">
           <span>&copy; 2026 Portal Doors</span>
           <span className="text-white/20">All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
