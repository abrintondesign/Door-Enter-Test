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
    stiffness: 50,
    damping: 25,
    restDelta: 0.001
  });

  // Door Animation Transformations
  const doorRotation = useTransform(smoothProgress, [0, 0.45], [-35, -115]);
  const doorZ = useTransform(smoothProgress, [0, 0.45], [0, 50]); // Move forward slightly as it opens
  const contentOpacity = useTransform(smoothProgress, [0.1, 0.5], [0, 1]);
  const contentScale = useTransform(smoothProgress, [0.1, 0.7], [1.1, 1]);
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.15], [0, -40]);
  const bgNumberY = useTransform(smoothProgress, [0, 1], [0, 150]);
  
  // Lighting sheen on door surface
  const sheenOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [0.1, 0.4, 0]);
  const sheenX = useTransform(smoothProgress, [0, 0.45], ["-100%", "100%"]);

  return (
    <div className="min-h-screen bg-brand-bg select-none relative italic-fixes">
      {/* Texture Background Overlay */}
      <div className="fixed inset-0 grain-overlay z-[100]" />

      {/* Navigation */}
      <nav className="fixed top-[60px] right-[60px] z-[60] flex gap-[30px] font-sans text-[11px] tracking-[0.2em] uppercase font-bold">
        <a href="#" className="text-brand-ink/40 hover:text-brand-gold transition-all duration-500">Collections</a>
        <a href="#" className="text-brand-ink/40 hover:text-brand-gold transition-all duration-500">Bespoke</a>
        <a href="#" className="text-brand-ink/40 hover:text-brand-gold transition-all duration-500">Showroom</a>
        <a href="#" className="text-white bg-brand-gold/20 backdrop-blur-sm px-4 py-2 border border-brand-gold/30 -mt-2">Contact</a>
      </nav>

      {/* Main Experience Section */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex border-brand-line border overflow-hidden">
          
          {/* Sidebar Area */}
          <div className="w-full md:w-[45%] p-[80px] flex flex-col justify-between z-10 bg-brand-muted/30 backdrop-blur-3xl border-r border-brand-line relative">
             {/* Subtle Sidebar Gradient */}
             <div className="absolute inset-0 bg-linear-to-b from-brand-gold/5 to-transparent pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-1 border border-brand-gold" />
                <div className="font-sans text-[13px] font-bold tracking-[0.4em] uppercase text-brand-gold">
                  Arch Door Co.
                </div>
              </div>
              
              <motion.div 
                style={{ opacity: heroTextOpacity, y: heroTextY }}
                className="mt-[60px]"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-5xl lg:text-[88px] lg:leading-[0.88] font-black uppercase -tracking-[0.04em] m-0"
                >
                  Universal<br />
                  <span className="text-brand-gold font-serif italic tracking-tight opacity-90 capitalize">Solutions</span><br />
                  Unified By<br />
                  Vision
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="text-[18px] mt-[40px] text-brand-ink/80 max-w-[400px] leading-[1.6] font-light"
                >
                  The leading provider of high-performance door solutions for contractors, developers, and homeowners. Serving commercial horizons and bespoke retreats.
                </motion.p>

                {/* Stakeholder Badges */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="flex flex-wrap gap-2 mt-10"
                >
                  {['Contractors', 'Architects', 'Developers', 'Homeowners'].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-brand-gold/5 border border-brand-gold/20 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Capabilities Grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                  className="grid grid-cols-2 gap-[40px] mt-[80px]"
                >
                  {[
                    { label: "Scope", value: "Residential & Industrial" },
                    { label: "Distribution", value: "Global Fulfillment" },
                    { label: "Engineering", value: "Pivot & Bespoke" },
                    { label: "Support", value: "24/7 Consultation" }
                  ].map((stat, i) => (
                    <div key={i} className="stat-item relative border-l border-brand-gold/20 pl-6">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/60 mb-2 font-bold">{stat.label}</div>
                      <div className="text-[13px] font-medium leading-[1.4] text-brand-ink tracking-wide">{stat.value}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1 }}
              className="mt-auto flex flex-col sm:flex-row gap-6 relative"
            >
              <a href="#" className="flex-1 text-center group relative inline-block px-[30px] py-[22px] bg-brand-gold text-brand-muted font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:brightness-110 active:scale-95 shadow-xl">
                Request a Quote
              </a>
              <a href="#" className="flex-1 text-center group relative inline-block px-[30px] py-[22px] border border-brand-gold/30 text-brand-gold font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-brand-gold/10 active:scale-95">
                View Catalog
              </a>
            </motion.div>
          </div>

          {/* Interactive Door Canvas */}
          <div className="hidden md:flex flex-1 bg-brand-canvas relative items-center justify-center overflow-hidden perspective-1500">
            {/* Background Accent Number */}
            <motion.div 
              style={{ y: bgNumberY }}
              className="absolute bottom-[40px] right-[60px] text-[320px] font-black text-brand-gold/5 leading-none select-none"
            >
              ∞
            </motion.div>

            {/* Interior Revelation - Showcases variety */}
            <motion.div 
              style={{ opacity: contentOpacity, scale: contentScale }}
              className="absolute inset-0 z-0 p-12"
            >
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="relative overflow-hidden border border-brand-line p-2 bg-brand-muted/40 backdrop-blur-md">
                   <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-700" referrerPolicy="no-referrer" alt="Residential" />
                </div>
                <div className="relative overflow-hidden border border-brand-line p-2 bg-brand-muted/40 backdrop-blur-md">
                   <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-700" referrerPolicy="no-referrer" alt="Commercial" />
                </div>
                <div className="relative overflow-hidden border border-brand-line p-2 bg-brand-muted/40 backdrop-blur-md">
                   <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2127" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-700" referrerPolicy="no-referrer" alt="Modern" />
                </div>
                <div className="relative overflow-hidden border border-brand-line p-2 bg-brand-muted/40 backdrop-blur-md">
                   <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-700" referrerPolicy="no-referrer" alt="Industrial" />
                </div>
              </div>
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-brand-bg/60 to-brand-bg" />
            </motion.div>

            {/* Door Structure */}
            <div className="relative w-[380px] h-[640px] border border-brand-gold/10 flex items-center justify-end shadow-2xl">
              {/* Backglow Reveal */}
              <div className="absolute inset-0 bg-radial-gradient from-brand-gold/20 to-black opacity-80 -z-10" />
              
              {/* The Actual Door Panel */}
              <motion.div 
                style={{ 
                  rotateY: doorRotation,
                  z: doorZ,
                  transformOrigin: "left"
                }}
                className="w-full h-full bg-linear-to-br from-[#1A1917] via-brand-accent to-[#121110] border border-brand-gold/20 shadow-2xl flex items-center justify-end preserve-3d"
              >
                {/* Surface Sheen */}
                <motion.div 
                  style={{ opacity: sheenOpacity, x: sheenX }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-brand-gold/10 to-transparent pointer-events-none" 
                />

                {/* Door Handle - More detailed handle */}
                <div className="relative mr-[40px] group">
                   <div className="w-[3px] h-[180px] bg-brand-gold shadow-[0_0_30px_rgba(197,160,89,0.5)] border-r border-white/5" />
                   <div className="absolute top-0 -left-1 w-1 h-1 bg-brand-gold/40 border-full" />
                   <div className="absolute bottom-0 -left-1 w-1 h-1 bg-brand-gold/40 border-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Section */}
      <section className="py-[120px] px-[60px] border-b border-brand-line overflow-hidden">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-[100px] items-start">
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold uppercase -tracking-wider mb-12"
            >
              Legacy
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl text-brand-sub leading-relaxed font-light font-sans max-w-xl"
            >
              From historical restorations to ultra-modern masterworks, Portal Doors combines ancient techniques with modern precision engineering. Every door is a unique commission.
            </motion.p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <motion.img 
               initial={{ opacity: 0, scale: 1.1 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
               src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1974" 
               className="w-full grayscale border border-brand-line transition-all duration-700 hover:grayscale-0" 
               referrerPolicy="no-referrer" 
             />
             <motion.img 
               initial={{ opacity: 0, scale: 1.1 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
               src="https://images.unsplash.com/photo-1582234372722-50d7ccc30e5a?q=80&w=1974" 
               className="w-full grayscale border border-brand-line self-end transition-all duration-700 hover:grayscale-0" 
               referrerPolicy="no-referrer" 
             />
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
