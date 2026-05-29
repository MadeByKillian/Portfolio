import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Mail, 
  Code2, 
  Database, 
  Network, 
  Cpu, 
  MapPin,
  Globe,
  Link as LinkIcon,
  X,
  Calendar,
  Layers,
  FileText,
  Search
} from 'lucide-react';

// --- Shared Types & Data ---
interface Project {
  title: string;
  description: string;
  technologies: string[];
  tag: string;
  semester: string;
  minYear: number;
}

interface Competence {
  id: string;
  label: string;
  description: string;
  levels: number[];
}

// Custom Brand Icons
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.63 7A1.78 1.78 0 0 0 17 5.25c-1.3-.4-2.58-.73-3.8-.93L13 5.4a12.8 12.8 0 0 0-2 0l-.2-.93c-1.22.2-2.5.53-3.8.93a1.78 1.78 0 0 0-1.63 1.75c0 2.25.1 4.5.4 6.75a1.78 1.78 0 0 0 1.63 1.5 14 14 0 0 0 4.6.75l.4-1.25a7.3 7.3 0 0 1-2.4-.75c.1-.1.2-.2.3-.3a12.2 12.2 0 0 0 8.2 0c.1.1.2.2.3.3a7.3 7.3 0 0 1-2.4.75l.4 1.25a14 14 0 0 0 4.6-.75 1.78 1.78 0 0 0 1.63-1.5c.3-2.25.4-4.5.4-6.75Z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>
);

// --- Main Component ---
export default function Portfolio() {
  // -- States --
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [activeSection, setActiveSection] = useState('accueil');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isBlobHovered, setIsBlobHovered] = useState(false);
  const [showDiscordPopup, setShowDiscordPopup] = useState(false);

  // -- Dynamic Data Calculation --
  const currentYear = new Date().getFullYear();

  // -- Projects Data --
  const allProjects: Project[] = [
    { title: "Annuaire Numérique", description: "SAÉ S1.01 — Gestion de contacts structurée.", technologies: ["Python", "C"], tag: "Développement", semester: "S1", minYear: 1 },
    { title: "Comparaison d'Algorithmes", description: "SAÉ S1.02 — Benchmark de tris et performance.", technologies: ["Python"], tag: "Algorithmique", semester: "S1", minYear: 1 },
    { title: "Installation Poste de Dév", description: "SAÉ S1.03 — Config environnement dual-boot.", technologies: ["Linux", "Bash", "Git"], tag: "Système", semester: "S1", minYear: 1 },
    { title: "BDD Processus de Vente", description: "SAÉ S1.04 — Modélisation MCD et script SQL.", technologies: ["SQL", "MySQL", "Looping"], tag: "BDD", semester: "S1", minYear: 1 },
    { title: "Application Gestion IUT", description: "SAÉ S2.01 — Desktop JavaFX, architecture MVC.", technologies: ["Java", "JavaFX"], tag: "Développement", semester: "S2", minYear: 1 },
    { title: "Exploration Graphes", description: "SAÉ S2.02 — Coloriage de carte via théorie des graphes.", technologies: ["Python", "NetworkX"], tag: "Algorithmique", semester: "S2", minYear: 1 },
    { title: "Déploiement Stack Web", description: "SAÉ S2.03 — Config serveur Apache-PHP-MySQL sur VM.", technologies: ["Apache", "PHP", "MySQL", "Linux"], tag: "Système", semester: "S2", minYear: 1 },
    { title: "Exploitation Qualité Air", description: "SAÉ S2.04 — Analyse statistique de données.", technologies: ["SQL", "Python", "Matplotlib"], tag: "BDD", semester: "S2", minYear: 1 }
  ];

  const visibleProjects = allProjects.filter(p => activeFilter === 'Tous' || p.tag === activeFilter);

  // -- Competences --
  const competences: Competence[] = [
    { id: 'C1', label: 'Réaliser', description: 'Concevoir, coder, tester et intégrer une solution informatique', levels: [35] },
    { id: 'C2', label: 'Optimiser', description: 'Proposer des applications optimisées selon des critères spécifiques', levels: [35] },
    { id: 'C3', label: 'Administrer', description: 'Installer, configurer et maintenir des infrastructures communicantes', levels: [30] },
    { id: 'C4', label: 'Gérer les données', description: 'Concevoir, gérer et exploiter les données de l\'entreprise', levels: [35] },
    { id: 'C5', label: 'Conduire un projet', description: 'Organiser et piloter un projet avec méthodes classiques ou agiles', levels: [25] },
    { id: 'C6', label: 'Travailler en équipe', description: 'Développer les aptitudes pour travailler efficacement en équipe', levels: [30] },
  ];

  const stars = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ id: i, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, delay: Math.random() * 5, size: Math.random() * 2 + 1 })), []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => { if (!isMobile) setMousePos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener('mousemove', handleMouseMove);

    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      :root { --violet: #7b2fff; --violet-light: #a855f7; --blue: #00d4ff; --blue-dark: #3b82f6; --bg-deep: #03040a; --text-primary: #ffffff; --text-secondary: #94a3b8; --glass-bg: rgba(255, 255, 255, 0.05); --glass-border: rgba(255, 255, 255, 0.1); }
      * { box-sizing: border-box; }
      body { background: linear-gradient(135deg, #03040a 0%, #050818 50%, #0a0f2e 100%); margin: 0; font-family: 'DM Sans', sans-serif; color: var(--text-primary); overflow-x: hidden; }
      h1, h2, h3, h4 { font-family: 'Syne', sans-serif; }
      .glass { background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-border); }
      .text-gradient { background: linear-gradient(to right, var(--violet), var(--blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .btn-glow { box-shadow: 0 0 20px rgba(123,47,255,0.4); transition: all 0.3s ease; }
      .btn-glow:hover { box-shadow: 0 0 30px rgba(123,47,255,0.6); transform: translateY(-2px); }
      .nav-link { position: relative; text-decoration: none; color: var(--text-secondary); transition: color 0.3s; cursor: pointer; border: none; background: none; padding: 0; }
      .nav-link.active { color: var(--text-primary); }
      .nav-link::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: linear-gradient(to right, var(--violet), var(--blue)); transition: width 0.3s; }
      .nav-link.active::after { width: 100%; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: var(--bg-deep); }
      ::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--violet); }
    `;
    document.head.appendChild(styleTag);
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); document.head.removeChild(styleTag); };
  }, [isMobile]);

  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
  const itemVariants: Variants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <AnimatePresence>
        {showDiscordPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
            onClick={() => setShowDiscordPopup(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass"
              style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', minWidth: '300px', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowDiscordPopup(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20}/></button>
              <DiscordIcon />
              <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Mon Discord</h3>
              <p className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>soyeskiki</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>Clique n'importe où pour fermer</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', background: 'linear-gradient(135deg, var(--violet), var(--blue))', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', filter: 'blur(80px)', opacity: 0.15 }} />
        <motion.div animate={{ scale: [1, 1.1, 1], x: [0, -40, 0], y: [0, 50, 0], rotate: [0, -15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px', background: 'linear-gradient(135deg, var(--blue-dark), var(--violet-light))', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', filter: 'blur(60px)', opacity: 0.1 }} />
        {stars.map(star => ( <motion.div key={star.id} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: star.delay, ease: "easeInOut" }} style={{ position: 'absolute', top: star.top, left: star.left, width: star.size, height: star.size, background: '#fff', borderRadius: '50%', boxShadow: '0 0 5px #fff' }} /> ))}
      </div>

      <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, height: '70px', display: 'flex', alignItems: 'center', padding: '0 5%', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--bg-deep)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', color: 'var(--violet)', boxShadow: '0 0 15px rgba(123,47,255,0.6)', border: '1px solid var(--violet)' }}>KG</div>
          <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Killian Gauchet</span>
        </div>
        <div style={{ display: isMobile ? 'none' : 'flex', gap: '30px' }}>
          {['Accueil', 'Projets', 'Liens', 'À propos', 'Compétences', 'Disponibilités', 'Contact'].map(link => ( <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className={`nav-link ${activeSection === link.toLowerCase() ? 'active' : ''}`} onClick={() => setActiveSection(link.toLowerCase())} > {link} </a> ))}
        </div>
        {isMobile && ( <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}> <div style={{ width: 30, height: 2, background: '#fff', marginBottom: 5 }} /> <div style={{ width: 30, height: 2, background: '#fff', marginBottom: 5 }} /> <div style={{ width: 30, height: 2, background: '#fff' }} /> </button> )}
      </nav>

      <main style={{ padding: '0 5%', paddingTop: '100px' }}>
        <section id="accueil" style={{ minHeight: '80vh', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: '40px', marginBottom: '100px' }}>
          <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ flex: 1.2 }}>
            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '10px' }}> Étudiant BUT Informatique — <span className="text-gradient" style={{ fontWeight: 700 }}>1ère année (S2)</span> </motion.p>
            <motion.h1 variants={itemVariants} style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 800, lineHeight: 1.1, margin: '20px 0' }}> Je construis des applications qui ont du <span className="text-gradient">sens.</span> </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', maxWidth: '600px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}> Passionné par le développement, je conçois des solutions web et logicielles modernes, propres et performantes pour répondre aux enjeux de demain. </motion.p>
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button onClick={() => document.getElementById('projets')?.scrollIntoView({behavior: 'smooth'})} className="btn-glow" style={{ padding: '16px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(to right, var(--violet), var(--blue))', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}> Voir mes projets </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} style={{ padding: '16px 32px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: '#fff', fontWeight: 600, fontSize: '1rem', backdropFilter: 'blur(10px)', cursor: 'pointer' }}> Me contacter </button>
            </motion.div>
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', marginTop: '60px' }}>
              <a href="https://github.com/MadeByKillian" target="_blank" rel="noopener noreferrer" className="nav-link"><GithubIcon /></a>
              <button onClick={() => setShowDiscordPopup(true)} className="nav-link" title="Discord: soyeskiki"><DiscordIcon /></button>
              <a href="mailto:Killian.gauchetpro@gmail.com" className="nav-link"><Mail /></a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }} style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }} >
            <div style={{ position: 'relative', width: isMobile ? '280px' : '400px', height: isMobile ? '280px' : '400px' }} onMouseEnter={() => setIsBlobHovered(true)} onMouseLeave={() => setIsBlobHovered(false)}>
              <motion.div
                animate={{
                  borderRadius: [ "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "50% 60% 30% 60% / 30% 40% 70% 50%", "40% 50% 60% 30% / 60% 40% 50% 40%", "60% 40% 30% 70% / 60% 30% 70% 40%" ],
                  x: (isMobile || !isBlobHovered) ? 0 : (mousePos.x - window.innerWidth / 2) * 0.1,
                  y: (isMobile || !isBlobHovered) ? 0 : (mousePos.y - window.innerHeight / 2) * 0.1,
                  scale: isBlobHovered ? 1.05 : 1
                }}
                transition={{ 
                  borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  x: { type: "spring", damping: 25, stiffness: 150 },
                  y: { type: "spring", damping: 25, stiffness: 150 },
                  scale: { duration: 0.3 }
                }}
                style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--violet), var(--blue), var(--violet-light))', boxShadow: '0 0 60px rgba(123,47,255,0.4)', cursor: 'help' }}
              />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', inset: -20, border: '1px dashed var(--violet)', borderRadius: '50%', opacity: 0.5, pointerEvents: 'none' }} />
            </div>
          </motion.div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '100px' }}>
          {[ { label: 'Projets réalisés', value: 8 }, { label: 'Semestres validés', value: 1 }, { label: 'Spécialité', value: 'Cybersecurité' } ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="glass" style={{ padding: '30px', borderRadius: '20px', textAlign: 'center' }} >
              <h3 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '10px 0 0', fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </section>

        <section id="projets" style={{ marginBottom: '150px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div> <h2 style={{ fontSize: '3rem', margin: 0 }}>Projets ✦</h2> <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Une sélection de mes travaux académiques et personnels.</p> </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}> {['Tous', 'Développement', 'Algorithmique', 'Système', 'BDD'].map(filter => ( <button key={filter} onClick={() => setActiveFilter(filter)} className="glass" style={{ padding: '8px 20px', borderRadius: '50px', border: '1px solid ' + (activeFilter === filter ? 'var(--violet)' : 'var(--glass-border)'), background: activeFilter === filter ? 'linear-gradient(to right, var(--violet), var(--blue))' : 'transparent', color: '#fff', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }} > {filter} </button> ))} </div>
          </div>
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }} >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <motion.div key={project.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -10 }} className="glass" style={{ padding: '30px', borderRadius: '24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                  <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '4px 12px', borderRadius: '50px', background: project.semester === 'S1' ? 'var(--violet)' : 'var(--blue)', fontSize: '0.8rem', fontWeight: 800 }}> {project.semester} </div>
                  <div> <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{project.title}</h3> <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '25px', fontSize: '0.95rem' }}>{project.description}</p> </div>
                  <div> <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}> {project.technologies.map(tech => ( <span key={tech} style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)' }}>{tech}</span> ))} </div> <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> <span style={{ fontSize: '0.8rem', color: 'var(--violet)', fontWeight: 700 }}>#{project.tag}</span> </div> </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* -- Links Section -- */}
        <section id="liens" style={{ marginBottom: '150px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Liens ✦</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
            <motion.a 
              href="https://killiangauchet.github.io/WebDoc-HeartBleed/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="glass"
              style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none', color: '#fff' }}
            >
              <div style={{ width: '60px', height: '60px', background: 'rgba(123,47,255,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet)' }}>
                <LinkIcon size={30} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>WebDoc - HeartBleed</h3>
                <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Projet d'école : Documentation interactive sur la faille OpenSSL.</p>
              </div>
            </motion.a>

            <motion.a 
              href="https://github.com/MadeByKillian" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="glass"
              style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none', color: '#fff' }}
            >
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <GithubIcon />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>GitHub</h3>
                <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Découvrez l'ensemble de mes dépôts et mon code source.</p>
              </div>
            </motion.a>
          </div>
        </section>

        <section id="à-propos" style={{ marginBottom: '150px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '80px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '3px' }}>Toulouse</motion.span>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="glass" style={{ width: isMobile ? '280px' : '350px', height: isMobile ? '200px' : '250px', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} >
              <img src={`${import.meta.env.BASE_URL}toulouse.png`} alt="Toulouse" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg-deep))', opacity: 0.6 }} />
            </motion.div>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#03040a', border: '3px solid var(--violet)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(123,47,255,0.3)', marginTop: '-60px', zIndex: 2 }} >
              <img src={`${import.meta.env.BASE_URL}pdp.jpg`} alt="Killian Gauchet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </div>
          <div style={{ flex: 1.5 }}>
            <span style={{ color: 'var(--violet)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>À propos</span>
            <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', margin: '20px 0' }}>Passionné par le code, la tech et les belles expériences.</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '30px' }}> 
              En 1ère année de BUT Informatique (S2), je découvre les fondamentaux du développement, de l'algorithmique et des bases de données. Chaque projet est une nouvelle opportunité d'apprendre et de construire quelque chose de concret. Mon parcours est guidé par l'envie de créer des outils performants qui apportent une réelle valeur ajoutée.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {[ { icon: <Code2 />, label: "Dév. Web" }, { icon: <Cpu />, label: "Algo" }, { icon: <Database />, label: "Données" }, { icon: <Network />, label: "Systèmes" } ].map((item, i) => ( <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}> <div style={{ color: 'var(--violet)' }}>{item.icon}</div> <span style={{ fontWeight: 500 }}>{item.label}</span> </div> ))}
            </div>
            
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a href={`${import.meta.env.BASE_URL}cv_killian_gauchet.pdf`} target="_blank" className="glass" style={{ padding: '12px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                <FileText size={18} color="var(--violet)" /> Mon CV
              </a>
              <a href={`${import.meta.env.BASE_URL}lettre_motivation_killian_gauchet.pdf`} target="_blank" className="glass" style={{ padding: '12px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                <FileText size={18} color="var(--blue)" /> Lettre de motivation
              </a>
            </div>
          </div>
        </section>

        <section id="compétences" style={{ marginBottom: '150px' }}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Compétences</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '60px' }}>
            {competences.map((comp) => (
              <div key={comp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}> <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{comp.id} · {comp.label}</span> <span className="text-gradient" style={{ fontWeight: 800 }}>35%</span> </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}> <motion.div initial={{ width: 0 }} whileInView={{ width: '35%' }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ height: '100%', background: 'linear-gradient(to right, var(--violet), var(--blue))' }} /> </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>{comp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="disponibilités" style={{ marginBottom: '150px' }}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Disponibilités & Opportunités</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '30px' }}>
            {/* Stage mandatory card */}
            <motion.div whileHover={{ y: -5 }} className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <Search size={32} color="var(--violet)" />
                <div style={{ background: 'rgba(123,47,255,0.2)', border: '1px solid var(--violet)', color: 'var(--violet)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800 }}>Recherche active</div>
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Stage obligatoire</h3>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>
                <p>• Durée : 10 à 12 semaines</p>
                <p>• Période : Dès le 13 avril 2025</p>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: 1.6 }}>Je recherche activement un stage pour ma 1ère année afin de mettre en pratique mes compétences en développement et cybersécurité.</p>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} style={{ background: 'transparent', border: '1px solid var(--violet)', color: 'var(--violet)', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Me contacter pour le stage →</button>
            </motion.div>

            {/* Alternance section */}
            <motion.div whileHover={{ y: -5 }} className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <Layers size={32} color="var(--blue)" />
                <div style={{ background: 'rgba(0,212,255,0.2)', border: '1px solid var(--blue)', color: 'var(--blue)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800 }}>Recherche active</div>
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Alternance BUT 2 & 3</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: 1.6 }}>Je recherche également un contrat d'alternance pour mes deux prochaines années afin de parfaire ma formation en milieu professionnel.</p>
              <a href={`${import.meta.env.BASE_URL}calendrier_alternance_2026-2027.pdf`} target="_blank" style={{ background: 'transparent', border: '1px solid var(--blue)', color: 'var(--blue)', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} /> Voir le calendrier prévisionnel
              </a>
            </motion.div>
          </div>
        </section>

        <section id="contact" style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Travaillons ensemble.</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>Je suis toujours ouvert à de nouveaux projets et opportunités.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}> <Mail color="var(--violet)" /> <span>Killian.gauchetpro@gmail.com</span> </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}> <MapPin color="var(--violet)" /> <span>France</span> </div>
                <div style={{ marginTop: '20px' }}> 
                  <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', fontWeight: 700, fontSize: '0.9rem' }}> 
                    🟢 Disponible en stage dès le 13 avril
                  </div> 
                </div>
              </div>
            </div>
            <div style={{ flex: 1.5 }}>
              <form className="glass" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}> <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Nom</label> <input type="text" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '14px', color: '#fff', outline: 'none' }} placeholder="Ton nom" /> </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}> <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label> <input type="email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '14px', color: '#fff', outline: 'none' }} placeholder="ton@email.com" /> </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}> <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label> <textarea rows={5} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '14px', color: '#fff', outline: 'none', resize: 'none' }} placeholder="Salut Killian..." /> </div>
                <button className="btn-glow" style={{ background: 'linear-gradient(to right, var(--violet), var(--blue))', border: 'none', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', marginTop: '10px', cursor: 'pointer' }}>Envoyer le message →</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="glass" style={{ padding: '60px 5% 40px', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div style={{ width: '50px', height: '50px', background: 'var(--bg-deep)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 800, color: 'var(--violet)', border: '1px solid var(--violet)', boxShadow: '0 0 15px rgba(123,47,255,0.4)' }}>KG</div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>© {currentYear} Killian Gauchet — BUT Informatique</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}> <a href="#accueil" className="nav-link">Accueil</a> <a href="#projets" className="nav-link">Projets</a> <a href="#liens" className="nav-link">Liens</a> <a href="#à-propos" className="nav-link">À propos</a> <a href="#contact" className="nav-link">Contact</a> </div>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)', margin: '40px 0' }}></div>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)' }}>Killian Gauchet © {currentYear}</p>
      </footer>
      <div style={{ display: 'none' }}><Globe /></div>
    </div>
  );
}
