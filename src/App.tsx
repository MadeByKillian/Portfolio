import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Mail, 
  Code2, 
  Database, 
  Network, 
  Cpu, 
  GraduationCap, 
  Calendar, 
  Download,
  Layers,
  Briefcase,
  MapPin,
  Globe
} from 'lucide-react';

// --- Types & Interfaces ---
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

// Custom Brand Icons (since Lucide removed them)
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// --- Main Component ---
export default function Portfolio() {
  // -- States --
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [activeSection, setActiveSection] = useState('accueil');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // -- Dynamic Data Calculation --
  const currentYear = new Date().getFullYear();
  const yearIndex = Math.min(Math.max(currentYear - 2024, 0), 2);
  const yearData = {
    year: yearIndex + 1,
    age: 19 + yearIndex,
    label: ["1ère année", "2ème année", "3ème année"][yearIndex],
    semester: ["S1-S2", "S3-S4", "S5-S6"][yearIndex],
    stage: {
      available: yearIndex === 1,
      startWeek: "13 avril",
      duration: "10 à 12 semaines"
    },
    alternance: {
      type: yearIndex === 1 ? "vacances" : yearIndex === 2 ? "contrat" : null,
      weeksEntreprise: 27,
      weeksFormation: 16
    }
  };

  // -- Projects Data --
  const allProjects: Project[] = [
    // S1
    {
      title: "Annuaire Numérique",
      description: "SAÉ S1.01 — Compétence 1 : Réaliser. Gestion de contacts avec saisie, modification et consultation structurée.",
      technologies: ["Python", "C"],
      tag: "Développement",
      semester: "S1",
      minYear: 1
    },
    {
      title: "Comparaison d'Algorithmes",
      description: "SAÉ S1.02 — Compétence 2 : Optimiser. Benchmark de tris (bulles, fusion, rapide) et mesures de performance.",
      technologies: ["Python"],
      tag: "Algorithmique",
      semester: "S1",
      minYear: 1
    },
    {
      title: "Installation Poste de Dév",
      description: "SAÉ S1.03 — Compétence 3 : Administrer. Dual-boot Linux/Windows, config environnement et notice.",
      technologies: ["Linux", "Bash", "Git"],
      tag: "Système",
      semester: "S1",
      minYear: 1
    },
    {
      title: "BDD Processus de Vente",
      description: "SAÉ S1.04 — Compétence 4 : Gérer les données. Modélisation MCD et script SQL pour un processus de vente.",
      technologies: ["SQL", "MySQL", "Looping"],
      tag: "BDD",
      semester: "S1",
      minYear: 1
    },
    // S2
    {
      title: "Application Gestion IUT",
      description: "SAÉ S2.01 — Compétence 1 : Réaliser. Application desktop JavaFX avec architecture Modèle/Vue séparée.",
      technologies: ["Java", "JavaFX"],
      tag: "Développement",
      semester: "S2",
      minYear: 2
    },
    {
      title: "Exploration Graphes",
      description: "SAÉ S2.02 — Compétence 2 : Optimiser. Résolution du problème de coloriage de carte via théorie des graphes.",
      technologies: ["Python", "NetworkX"],
      tag: "Algorithmique",
      semester: "S2",
      minYear: 2
    },
    {
      title: "Déploiement Stack Web",
      description: "SAÉ S2.03 — Compétence 3 : Administrer. Config serveur Apache-PHP-MySQL sur VM Linux.",
      technologies: ["Apache", "PHP", "MySQL", "Linux"],
      tag: "Système",
      semester: "S2",
      minYear: 2
    },
    {
      title: "Exploitation Qualité Air",
      description: "SAÉ S2.04 — Compétence 4 : Gérer les données. Analyse statistique et visualisation de données environnementales.",
      technologies: ["SQL", "Python", "Matplotlib"],
      tag: "BDD",
      semester: "S2",
      minYear: 2
    }
  ];

  const visibleProjects = allProjects
    .filter(p => yearData.year >= p.minYear)
    .filter(p => activeFilter === 'Tous' || p.tag === activeFilter);

  // -- Competences --
  const competences: Competence[] = [
    { id: 'C1', label: 'Réaliser', description: 'Concevoir, coder, tester et intégrer une solution informatique', levels: [35, 65, 85] },
    { id: 'C2', label: 'Optimiser', description: 'Proposer des applications optimisées selon des critères spécifiques', levels: [35, 60, 80] },
    { id: 'C3', label: 'Administrer', description: 'Installer, configurer et maintenir des infrastructures communicantes', levels: [30, 55, 75] },
    { id: 'C4', label: 'Gérer les données', description: 'Concevoir, gérer et exploiter les données de l\'entreprise', levels: [35, 65, 85] },
    { id: 'C5', label: 'Conduire un projet', description: 'Organiser et piloter un projet avec méthodes classiques ou agiles', levels: [25, 55, 80] },
    { id: 'C6', label: 'Travailler en équipe', description: 'Développer les aptitudes pour travailler efficacement en équipe', levels: [30, 60, 85] },
  ];

  // -- Background Stars --
  const stars = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 2 + 1
    })), []
  );

  // -- Effects --
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic styles injection
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      
      :root {
        --violet: #7b2fff;
        --violet-light: #a855f7;
        --blue: #00d4ff;
        --blue-dark: #3b82f6;
        --bg-deep: #03040a;
        --text-primary: #ffffff;
        --text-secondary: #94a3b8;
        --glass-bg: rgba(255, 255, 255, 0.05);
        --glass-border: rgba(255, 255, 255, 0.1);
      }

      * {
        box-sizing: border-box;
      }

      body {
        background: linear-gradient(135deg, #03040a 0%, #050818 50%, #0a0f2e 100%);
        margin: 0;
        font-family: 'DM Sans', sans-serif;
        color: var(--text-primary);
        overflow-x: hidden;
      }

      h1, h2, h3, h4 {
        font-family: 'Syne', sans-serif;
      }

      .glass {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
      }

      .text-gradient {
        background: linear-gradient(to right, var(--violet), var(--blue));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .btn-glow {
        box-shadow: 0 0 20px rgba(123,47,255,0.4), 0 0 40px rgba(0,212,255,0.2);
        transition: all 0.3s ease;
      }
      .btn-glow:hover {
        box-shadow: 0 0 30px rgba(123,47,255,0.6), 0 0 50px rgba(0,212,255,0.4);
        transform: translateY(-2px);
      }

      .nav-link {
        position: relative;
        text-decoration: none;
        color: var(--text-secondary);
        transition: color 0.3s;
        cursor: pointer;
      }
      .nav-link.active {
        color: var(--text-primary);
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(to right, var(--violet), var(--blue));
        transition: width 0.3s;
      }
      .nav-link.active::after {
        width: 100%;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: var(--bg-deep);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--glass-border);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--violet);
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.head.removeChild(styleTag);
    };
  }, [isMobile]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* -- Background Elements -- */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
        {/* Animated Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, var(--violet), var(--blue))',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(80px)',
            opacity: 0.15
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 50, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, var(--blue-dark), var(--violet-light))',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            filter: 'blur(60px)',
            opacity: 0.1
          }}
        />

        {/* Scintillating Stars */}
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 5px #fff'
            }}
          />
        ))}
      </div>

      {/* -- Navigation -- */}
      <nav className="glass" style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--bg-deep)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '18px',
            color: 'var(--violet)',
            boxShadow: '0 0 15px rgba(123,47,255,0.6)',
            border: '1px solid var(--violet)'
          }}>KG</div>
          <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Killian Gauchet</span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: isMobile ? 'none' : 'flex', gap: '30px' }}>
          {['Accueil', 'Projets', 'À propos', 'Compétences', 'Contact'].map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={`nav-link ${activeSection === link.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveSection(link.toLowerCase())}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Burger for Mobile (Simplified) */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <div style={{ width: 30, height: 2, background: '#fff', marginBottom: 5 }} />
            <div style={{ width: 30, height: 2, background: '#fff', marginBottom: 5 }} />
            <div style={{ width: 30, height: 2, background: '#fff' }} />
          </button>
        )}
      </nav>

      <main style={{ padding: '0 5%', paddingTop: '100px' }}>
        
        {/* -- Hero Section -- */}
        <section id="accueil" style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: isMobile ? 'column-reverse' : 'row',
          alignItems: 'center',
          gap: '40px',
          marginBottom: '100px'
        }}>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ flex: 1.2 }}
          >
            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Étudiant BUT Informatique — <span className="text-gradient" style={{ fontWeight: 700 }}>{yearData.label}</span>
              {yearIndex === 1 && ` • Recherche de stage d'${yearData.stage.startWeek}`}
            </motion.p>
            <motion.h1 variants={itemVariants} style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 800, lineHeight: 1.1, margin: '20px 0' }}>
              Je construis des applications qui ont du <span className="text-gradient">sens.</span>
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', maxWidth: '600px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}>
              Passionné par le développement, je conçois des solutions web et logicielles modernes, propres et performantes pour répondre aux enjeux de demain.
            </motion.p>
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button className="btn-glow" style={{
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(to right, var(--violet), var(--blue))',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer'
              }}>
                Voir mes projets
              </button>
              <button style={{
                padding: '16px 32px',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}>
                Me contacter
              </button>
            </motion.div>
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', marginTop: '60px' }}>
              <span className="nav-link"><GithubIcon /></span>
              <span className="nav-link"><LinkedinIcon /></span>
              <span className="nav-link"><Mail /></span>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* Visual Blob with Fluid Motion */}
            <div style={{ position: 'relative', width: isMobile ? '280px' : '400px', height: isMobile ? '280px' : '400px' }}>
              <motion.div
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "50% 60% 30% 60% / 30% 40% 70% 50%",
                    "40% 50% 60% 30% / 60% 40% 50% 40%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, var(--violet), var(--blue), var(--violet-light))',
                  boxShadow: '0 0 60px rgba(123,47,255,0.4)'
                }}
              />
              {/* Spinning Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  inset: -20,
                  border: '1px dashed var(--violet)',
                  borderRadius: '50%',
                  opacity: 0.5
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* -- Stats Banner -- */}
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '100px' }}>
          {[
            { label: 'Projets réalisés', value: [4, 8, '12+'][yearIndex] },
            { label: 'Semestres validés', value: [1, 3, 5][yearIndex] },
            { label: 'Spécialité', value: 'Parcours A' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass" 
              style={{ padding: '30px', borderRadius: '20px', textAlign: 'center' }}
            >
              <h3 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '10px 0 0', fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </section>

        {/* -- Projects Section -- */}
        <section id="projets" style={{ marginBottom: '150px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '3rem', margin: 0 }}>Projets ✦</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Une sélection de mes travaux académiques et personnels.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Tous', 'Développement', 'Algorithmique', 'Système', 'BDD'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="glass"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '50px',
                    border: '1px solid ' + (activeFilter === filter ? 'var(--violet)' : 'var(--glass-border)'),
                    background: activeFilter === filter ? 'linear-gradient(to right, var(--violet), var(--blue))' : 'transparent',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', 
              gap: '30px' 
            }}
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="glass"
                  style={{
                    padding: '30px',
                    borderRadius: '24px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '4px 12px', borderRadius: '50px', background: project.semester === 'S1' ? 'var(--violet)' : 'var(--blue)', fontSize: '0.8rem', fontWeight: 800 }}>
                    {project.semester}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{project.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '25px', fontSize: '0.95rem' }}>{project.description}</p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {project.technologies.map(tech => (
                        <span key={tech} style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)' }}>{tech}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--violet)', fontWeight: 700 }}>#{project.tag}</span>
                      <GithubIcon />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* -- About Section -- */}
        <section id="à-propos" style={{ marginBottom: '150px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '100px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: isMobile ? '200px' : '300px',
                height: isMobile ? '200px' : '300px',
                borderRadius: '50%',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(var(--bg-deep), var(--bg-deep)), linear-gradient(to right, var(--violet), var(--blue))',
                backgroundClip: 'padding-box, border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '4rem' : '6rem',
                fontWeight: 800,
                color: '#fff',
                boxShadow: '0 0 50px rgba(123,47,255,0.3)'
              }}
            >
              KG
            </motion.div>
            <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'var(--blue)', filter: 'blur(60px)', opacity: 0.3 }}></div>
          </div>
          
          <div style={{ flex: 1.5 }}>
            <span style={{ color: 'var(--violet)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>À propos</span>
            <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', margin: '20px 0' }}>Passionné par le code, la tech et les belles expériences.</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '30px' }}>
              {yearIndex === 0 && "En 1ère année de BUT Informatique, je découvre les fondamentaux du développement, de l'algorithmique et des bases de données. Chaque projet est une nouvelle opportunité d'apprendre et de construire quelque chose de concret."}
              {yearIndex === 1 && "En 2ème année de BUT Informatique, je monte en compétence sur le développement d'applications, les systèmes et la gestion de données. Je recherche activement un stage pour mettre en pratique mes acquis en situation professionnelle."}
              {yearIndex === 2 && "En 3ème année de BUT Informatique, j'alterne entre l'entreprise et la formation pour dÃ©velopper une expertise technique solide. Je suis capable de travailler en autonomie sur des projets complexes."}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {[
                { icon: <Code2 />, label: "Dév. Web" },
                { icon: <Cpu />, label: "Algo" },
                { icon: <Database />, label: "Données" },
                { icon: <Network />, label: "Systèmes" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ color: 'var(--violet)' }}>{item.icon}</div>
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- Skills Section -- */}
        <section id="compétences" style={{ marginBottom: '150px' }}>
          <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Compétences</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '60px' }}>
            {competences.map((comp) => (
              <div key={comp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{comp.id} · {comp.label}</span>
                  <span className="text-gradient" style={{ fontWeight: 800 }}>{comp.levels[yearIndex]}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${comp.levels[yearIndex]}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ height: '100%', background: 'linear-gradient(to right, var(--violet), var(--blue))' }}
                  />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>{comp.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Technologies & Outils</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
              {[
                "Python", "C", "HTML", "CSS", "SQL", "Bash", "Git", "Linux",
                ...(yearIndex >= 1 ? ["Java", "JavaFX", "PHP", "MySQL", "JavaScript", "React"] : []),
                ...(yearIndex >= 2 ? ["TypeScript", "Node.js", "Docker", "APIs REST"] : [])
              ].map(tech => (
                <div key={tech} className="glass" style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: 600 }}>{tech}</div>
              ))}
            </div>
          </div>
        </section>

        {/* -- Availability Section -- */}
        <section id="disponibilités" style={{ marginBottom: '150px' }}>
          {yearIndex === 0 ? (
            <div className="glass" style={{ padding: '60px', borderRadius: '32px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <GraduationCap size={48} style={{ color: 'var(--text-secondary)', marginBottom: '20px' }} />
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Actuellement en 1ère année de BUT Informatique. Les opportunités de stage et d'alternance seront disponibles dès la 2ème année.</p>
              <div style={{ marginTop: '20px', color: 'var(--text-secondary)', fontWeight: 700 }}>En formation</div>
            </div>
          ) : yearIndex === 1 ? (
            <>
              <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Disponibilités & Opportunités</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '30px' }}>
                <div className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Calendar size={32} color="var(--blue)" />
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ background: '#22c55e', color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800 }}
                    >
                      Disponible
                    </motion.div>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Stage obligatoire</h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Durée : 10 à 12 sem.</span>
                    <span style={{ color: 'var(--text-secondary)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Dès le 13 avril</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Je recherche un stage de 10 à 12 semaines pour mettre en œuvre mes compétences en développement au sein d'une équipe professionnelle.</p>
                  <button style={{ background: 'transparent', border: '1px solid var(--violet)', color: 'var(--violet)', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Me contacter pour le stage →</button>
                </div>

                <div className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Layers size={32} color="var(--violet)" />
                    <div style={{ background: '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800 }}>Sous conditions</div>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Alternance envisageable</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Ouvert à une opportunité en alternance durant les périodes de vacances scolaires pour approfondir mon expérience.</p>
                  <button style={{ background: 'transparent', border: '1px solid var(--violet)', color: 'var(--violet)', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>En discuter →</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>Disponibilités & Opportunités</h2>
              <div className="glass" style={{ padding: '60px', borderRadius: '32px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                <Briefcase size={48} color="var(--blue)" style={{ marginBottom: '20px' }} />
                <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Contrat d'alternance — 3ème année</h3>
                <div style={{ display: 'inline-block', background: 'var(--blue)', color: '#fff', padding: '6px 20px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '30px' }}>En alternance</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>Ma 3ème année se déroule en alternance. Voici mon planning indicatif de présence :</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '400px', margin: '0 auto 40px' }}>
                  <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>27 sem.</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Entreprise</div>
                  </div>
                  <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>16 sem.</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Formation</div>
                  </div>
                </div>
                <button style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: '#fff', padding: '14px 28px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <Download size={20} /> Télécharger le planning
                </button>
              </div>
            </>
          )}
        </section>

        {/* -- Contact Section -- */}
        <section id="contact" style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Travaillons ensemble.</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>Je suis toujours ouvert à de nouveaux projets et opportunités.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <Mail color="var(--violet)" />
                  <span>killian.gauchet@email.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <MapPin color="var(--violet)" />
                  <span>France</span>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: yearIndex === 1 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(123, 47, 255, 0.1)',
                    border: '1px solid ' + (yearIndex === 1 ? '#22c55e' : 'var(--violet)'),
                    color: yearIndex === 1 ? '#22c55e' : 'var(--violet)',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {yearIndex === 0 && "🎓 En formation"}
                    {yearIndex === 1 && "🟢 Disponible pour stage dès le 13 avril"}
                    {yearIndex === 2 && "🔵 En alternance"}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: 1.5 }}>
              <form className="glass" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Nom</label>
                    <input type="text" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '14px', color: '#fff', outline: 'none' }} placeholder="Ton nom" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
                    <input type="email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '14px', color: '#fff', outline: 'none' }} placeholder="ton@email.com" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
                  <textarea rows={5} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '14px', color: '#fff', outline: 'none', resize: 'none' }} placeholder="Salut Killian..." />
                </div>
                <button className="btn-glow" style={{
                  background: 'linear-gradient(to right, var(--violet), var(--blue))',
                  border: 'none',
                  color: '#fff',
                  padding: '16px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}>Envoyer le message →</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* -- Footer -- */}
      <footer className="glass" style={{ padding: '60px 5% 40px', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div style={{
          width: '50px',
          height: '50px',
          background: 'var(--bg-deep)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontWeight: 800,
          color: 'var(--violet)',
          border: '1px solid var(--violet)',
          boxShadow: '0 0 15px rgba(123,47,255,0.4)'
        }}>KG</div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>© {currentYear} Killian Gauchet — BUT Informatique</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <a href="#accueil" className="nav-link">Accueil</a>
          <a href="#projets" className="nav-link">Projets</a>
          <a href="#à-propos" className="nav-link">À propos</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)', margin: '40px 0' }}></div>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)' }}>Conçu avec React & Framer Motion</p>
      </footer>

      {/* Fallback for Globe Icon */}
      <div style={{ display: 'none' }}><Globe /></div>

    </div>
  );
}
