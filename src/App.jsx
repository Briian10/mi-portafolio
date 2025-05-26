import { useState, useEffect } from "react";
import { Menu, ChevronDown, ChevronUp, Code, User, BookOpen, Github, Linkedin, Mail, ExternalLink, Star, GitBranch, Eye } from "lucide-react";

function SkillBar({ skill, level, delay = 0 }) {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300 + delay * 150);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1 text-sm text-[#8B949E]">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-[#30363D] rounded-full h-3">
        <div
          className="bg-[#58A6FF] h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: animate ? `${level}%` : "0%" }}
        ></div>
      </div>
    </div>
  );
}

function TimelineItem({ position, company, period, description, isLast = false }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-[#58A6FF] rounded-full"></div>
        {!isLast && <div className="w-0.5 bg-[#30363D] h-full"></div>}
      </div>
      <div className="pb-6">
        <h3 className="text-[#58A6FF] font-semibold text-lg">{position}</h3>
        <div className="flex items-center gap-2 text-sm text-[#8B949E] mb-2">
          <span>{company}</span>
          <span>•</span>
          <span>{period}</span>
        </div>
        <p className="text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = [
    "./public/porto.jpg",
    "./public/Web.png",
    "./public/lib.png"
  ];

  return (
    <div className="mb-6">
      <div className="rounded-lg overflow-hidden mb-3 h-48 bg-[#21262D]">
        <img 
          src={photos[activePhoto]} 
          alt="Galería personal" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center gap-2">
        {photos.map((_, index) => (
          <button 
            key={index}
            onClick={() => setActivePhoto(index)}
            className={`w-2 h-2 rounded-full ${activePhoto === index ? 'bg-[#58A6FF]' : 'bg-[#30363D]'}`}
          />
        ))}
      </div>
    </div>
  );
}

// Nueva función de tarjeta de proyecto con animaciones y más detalles
function ProjectCard({ title, description, image, tags, demoUrl, repoUrl }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div 
      className="bg-[#161B22] rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-1 transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen con overlay al pasar el cursor */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-[#161B22] to-transparent opacity-80 transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-50'}`}
        ></div>
        
        {/* Stats flotantes estilo GitHub */}
        <div className="absolute top-3 right-3 flex gap-3 bg-[#0D1117] bg-opacity-70 rounded-full px-3 py-1 text-xs text-[#8B949E]">
          <div className="flex items-center gap-1">
            <Star size={12} />
            <span>24</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch size={12} />
            <span>8</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>156</span>
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#58A6FF] mb-2 group flex items-center gap-2">
          {title}
          <ExternalLink size={16} className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </h3>
        
        <p className="text-sm sm:text-base text-[#8B949E] mb-4">
          {description}
        </p>
        
        {/* Tags de tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-[#21262D] text-[#58A6FF]"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-3">
          <a
            href={demoUrl}
            className="flex-1 text-center border border-[#58A6FF] text-[#58A6FF] py-2 rounded hover:bg-[#21262D] transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink size={16} />
            Demo
          </a>
          
          <a
            href={repoUrl}
            className="flex-1 text-center bg-[#21262D] text-[#C9D1D9] border border-[#30363D] py-2 rounded hover:bg-[#30363D] transition-colors flex items-center justify-center gap-2"
          >
            <Github size={16} />
            Repo
          </a>
        </div>
        
        {/* Botón para ver más detalles */}
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-3 text-center text-[#8B949E] text-sm hover:text-[#C9D1D9] transition-colors flex items-center justify-center gap-1"
        >
          {showDetails ? (
            <>Menos detalles <ChevronUp size={16} /></>
          ) : (
            <>Más detalles <ChevronDown size={16} /></>
          )}
        </button>
        
        {/* Detalles adicionales que aparecen al hacer clic */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-[#30363D] text-sm text-[#8B949E] animate-fadeIn">
            <h4 className="font-semibold mb-2 text-[#C9D1D9]">Características principales:</h4>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Diseño responsive para todas las pantallas</li>
              <li>Implementación completa de autenticación</li>
              <li>Optimizado para rendimiento y SEO</li>
            </ul>
            <div className="flex justify-between items-center">
              <span>Última actualización: 2 semanas</span>
              <span className="px-2 py-1 bg-[#238636] text-xs rounded-full">Activo</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Nuevo componente de filtrado de proyectos
function ProjectFilters({ activeFilter, setActiveFilter }) {
  const filters = ["Todos", "Frontend", "Backend", "Wordpress"];
  
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter 
              ? 'bg-[#58A6FF] text-white' 
              : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D]'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState("bio");
  const [showMore, setShowMore] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [activeProjectFilter, setActiveProjectFilter] = useState("Todos");
  const [visibleProjects, setVisibleProjects] = useState(3);
  
  // Datos de los proyectos
  const projects = [
    {
      id: 1,
      title: "Portafolio Personal",
      description: "Un sitio web para mostrar mis proyectos y experiencia como desarrollador frontend.",
      image: "./public/perfil.png",
      tags: ["React", "Tailwind CSS", "JavaScript"],
      demoUrl: "#",
      repoUrl: "#",
      category: "Frontend"
    },
    {
      id: 2,
      title: "App de Tareas",
      description: "Aplicación CRUD para gestionar tareas. Permite crear, editar y eliminar tareas.",
      image: "./public/spring.png",
      tags: ["React", "Firebase", "CSS"],
      demoUrl: "#",
      repoUrl: "#",
      category: ""
    },
    {
      id: 3,
      title: "Clon de GitHub",
      description: "Proyecto inspirado en GitHub para practicar diseño UI. Contiene perfiles de usuario y repos.",
      image: "./public/profile.png",
      tags: ["HTML", "CSS", "JavaScript"],
      demoUrl: "#",
      repoUrl: "#",
      category: "Frontend"
    },
    {
      id: 4,
      title: "API de Notas",
      description: "Backend para aplicación de notas con autenticación y gestión de usuarios.",
      image: "./public/back4app.png",
      tags: ["Node.js", "Express", "MongoDB"],
      demoUrl: "#",
      repoUrl: "#",
      category: "Backend"
    },
    {
      id: 5,
      title: "Dashboard Admin",
      description: "Panel de administración con gráficos y estadísticas en tiempo real.",
      image: "./public/Panel.png",
      tags: ["React", "Chart.js", "Material UI"],
      demoUrl: "#",
      repoUrl: "#",
      category: "Frontend"
    },
    {
      id: 6,
      title: "E-commerce Wordpress",
      description: "Tienda en línea completa con carrito de compras y pasarela de pagos.",
      image: "./public/ecomer.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "#",
      repoUrl: "#",
      category: "Wordpress"
    }
  ];
  
  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = activeProjectFilter === "Todos" 
    ? projects 
    : projects.filter(project => project.category === activeProjectFilter);

  // Para manejar la transición suave entre pestañas
  const handleTabChange = (newTab) => {
    if (newTab === tab) return;
    
    setFadeIn(false);
    setTimeout(() => {
      setTab(newTab);
      setFadeIn(true);
    }, 300);
  };
  
  // Cargar más proyectos
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <main className="min-h-screen bg-[#0D1117] text-[#C9D1D9] font-mono">
    {/* Header / Navbar section: MEJORADO */}
<header className="relative h-screen bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] overflow-hidden">
  {/* Background decorativo animado */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-20 w-72 h-72 bg-[#58A6FF] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
    <div className="absolute top-40 right-20 w-72 h-72 bg-[#238636] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
    
    {/* Partículas flotantes */}
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#58A6FF] rounded-full animate-ping delay-300"></div>
    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#238636] rounded-full animate-ping delay-700"></div>
    <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#58A6FF] rounded-full animate-ping delay-1000"></div>
    <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-[#8B5CF6] rounded-full animate-ping delay-1500"></div>
  </div>

  {/* Navbar con efecto glassmorphism */}
  <div className="fixed top-0 left-0 right-0 z-20 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#30363D]/50">
    <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-[#58A6FF] text-xl font-bold flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-[#58A6FF] to-[#1F6FEB] rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">P</span>
        </div>
        Mi Portafolio
      </div>

      {/* Menú escritorio con efectos hover mejorados */}
      <ul className="hidden sm:flex gap-8 text-[#8B949E] text-sm sm:text-base">
        <li>
          <a 
            href="#sobre-mi" 
            className="relative px-3 py-2 rounded-lg hover:text-[#58A6FF] transition-all duration-300 hover:bg-[#21262D]/50 group"
          >
            Sobre mí
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#58A6FF] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a 
            href="#proyectos" 
            className="relative px-3 py-2 rounded-lg hover:text-[#58A6FF] transition-all duration-300 hover:bg-[#21262D]/50 group"
          >
            Proyectos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#58A6FF] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a 
            href="#contacto" 
            className="relative px-3 py-2 rounded-lg hover:text-[#58A6FF] transition-all duration-300 hover:bg-[#21262D]/50 group"
          >
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#58A6FF] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
      </ul>

      {/* Botón menú móvil mejorado */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden text-[#58A6FF] p-2 rounded-lg hover:bg-[#21262D]/50 transition-all duration-300"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6" />
      </button>
    </nav>

    {/* Menú desplegable móvil mejorado */}
    <ul
      className={`sm:hidden ${
        menuOpen ? "flex opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-4"
      } flex-col gap-3 text-sm text-[#8B949E] px-4 pb-4 border-t border-[#30363D]/50 bg-[#161B22]/90 backdrop-blur-sm transition-all duration-300`}
    >
      <li>
        <a 
          href="#sobre-mi" 
          className="block px-3 py-2 rounded-lg hover:text-[#58A6FF] hover:bg-[#21262D]/50 transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Sobre mí
        </a>
      </li>
      <li>
        <a 
          href="#proyectos" 
          className="block px-3 py-2 rounded-lg hover:text-[#58A6FF] hover:bg-[#21262D]/50 transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Proyectos
        </a>
      </li>
      <li>
        <a 
          href="#contacto" 
          className="block px-3 py-2 rounded-lg hover:text-[#58A6FF] hover:bg-[#21262D]/50 transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Contacto
        </a>
      </li>
    </ul>
  </div>

  {/* Hero Content mejorado */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 pt-20">
    {/* Contenido principal con animaciones */}
    <div className="max-w-4xl mx-auto">
      {/* Saludo animado */}
      <div className="mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
        <span className="inline-block px-4 py-2 bg-[#21262D]/50 border border-[#30363D]/50 rounded-full text-[#58A6FF] text-sm font-medium backdrop-blur-sm">
          ¡Hola! 👋 Bienvenido a mi portafolio
        </span>
      </div>

      {/* Título principal con gradiente */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
        <span className="block mb-2">Soy</span>
        <span className="bg-gradient-to-r from-[#58A6FF] via-[#1F6FEB] to-[#8B5CF6] bg-clip-text text-transparent">
          Brayan Gutierrez
        </span>
      </h1>

      {/* Subtítulo con efecto typewriter */}
      <div className="mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
        <p className="text-lg sm:text-xl md:text-2xl text-[#8B949E] font-light max-w-3xl mx-auto leading-relaxed">
          Desarrollador Frontend apasionado por crear 
          <span className="text-[#58A6FF] font-medium"> experiencias web increíbles</span>
        </p>
        <p className="text-base sm:text-lg text-[#8B949E] mt-4 max-w-2xl mx-auto">
          Especializado en React, JavaScript y diseño de interfaces modernas
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
        <a 
          href="#proyectos"
          className="px-8 py-4 bg-gradient-to-r from-[#1F6FEB] to-[#58A6FF] text-white font-medium rounded-xl hover:from-[#58A6FF] hover:to-[#1F6FEB] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#58A6FF]/25"
        >
          Ver mis proyectos
        </a>
        <a 
          href="#contacto"
          className="px-8 py-4 bg-transparent border-2 border-[#58A6FF] text-[#58A6FF] font-medium rounded-xl hover:bg-[#58A6FF] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
        >
          Contactar
        </a>
      </div>

      {/* Enlaces sociales mejorados */}
      <div className="flex justify-center gap-6 mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]">
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-3 bg-[#21262D]/50 border border-[#30363D]/50 rounded-full hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm group"
        >
          <Linkedin size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-3 bg-[#21262D]/50 border border-[#30363D]/50 rounded-full hover:bg-[#333] hover:border-[#333] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm group"
        >
          <Github size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </a>
        <a 
          href="mailto:tucorreo@example.com" 
          className="p-3 bg-[#21262D]/50 border border-[#30363D]/50 rounded-full hover:bg-[#EA4335] hover:border-[#EA4335] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm group"
        >
          <Mail size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </a>
      </div>

      {/* Scroll indicator animado */}
      <div className="animate-bounce opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]">
        <div className="flex flex-col items-center gap-2">
        </div>
      </div>
    </div>
  </div>

  {/* Waves decoration en la parte inferior */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      className="relative block w-full h-16 fill-[#0D1117]"
    >
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
      opacity=".25"
    ></path>
    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
      opacity=".5"
    ></path>
    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
    ></path>
    </svg>
  </div>
</header>

<style jsx>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
      {/* About Section: mismo ancho que proyectos */}
<section id="sobre-mi" className="max-w-6xl mx-auto mb-16 px-4 md:px-6 mt-20">
  <h2 className="text-xl sm:text-2xl text-[#58A6FF] mb-8 border-b border-[#30363D] pb-2 font-semibold">
    Sobre mí
  </h2>

  <div className="bg-[#161B22] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
    {/* Tabs */}
    <div className="flex flex-wrap gap-4 sm:gap-8 mb-6 border-b border-[#30363D] text-[#8B949E] font-semibold">
      <button
        onClick={() => handleTabChange("bio")}
        className={`flex items-center gap-2 pb-2 border-b-4 ${
          tab === "bio" ? "border-[#58A6FF] text-[#58A6FF]" : "border-transparent"
        } transition-colors`}
      >
        <User size={18} />
        Biografía
      </button>
      <button
        onClick={() => handleTabChange("skills")}
        className={`flex items-center gap-2 pb-2 border-b-4 ${
          tab === "skills" ? "border-[#58A6FF] text-[#58A6FF]" : "border-transparent"
        } transition-colors`}
      >
        <Code size={18} />
        Habilidades
      </button>
      <button
        onClick={() => handleTabChange("experience")}
        className={`flex items-center gap-2 pb-2 border-b-4 ${
          tab === "experience" ? "border-[#58A6FF] text-[#58A6FF]" : "border-transparent"
        } transition-colors`}
      >
        <BookOpen size={18} />
        Experiencia
      </button>
    </div>

    {/* Content */}
    <div className={`text-[#8B949E] transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {tab === "bio" && (
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="rounded-full w-28 sm:w-32 h-28 sm:h-32 overflow-hidden border-4 border-[#30363D] shadow-lg">
                <img 
                  src="./public/luna.png" 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-3 mb-4">
                <a href="#" className="rounded-full bg-[#21262D] p-2 hover:bg-[#30363D] transition-colors">
                  <Github size={16} />
                </a>
                <a href="#" className="rounded-full bg-[#21262D] p-2 hover:bg-[#30363D] transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="rounded-full bg-[#21262D] p-2 hover:bg-[#30363D] transition-colors">
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>

          <PhotoGallery />

          <div className="text-center">
            <p className="text-base sm:text-lg leading-relaxed mb-4">
              Soy un desarrollador con experiencia en React, JavaScript y diseño de interfaces...
            </p>
            {showMore && (
              <p className="text-base sm:text-lg leading-relaxed mb-4">
                Tengo pasión por aprender nuevas tecnologías...
              </p>
            )}
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-2 text-[#58A6FF] hover:text-[#1F6FEB] font-semibold focus:outline-none flex items-center justify-center gap-1 mx-auto"
              aria-expanded={showMore}
            >
              {showMore ? (
                <>
                  Leer menos <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Leer más <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {tab === "skills" && (
        <div className="text-left max-w-md mx-auto w-full space-y-4">
          <SkillBar skill="React" level={90} delay={0} />
          <SkillBar skill="JavaScript" level={85} delay={1} />
          <SkillBar skill="CSS / Tailwind" level={80} delay={2} />
          <SkillBar skill="TypeScript" level={70} delay={3} />
          <SkillBar skill="Node.js" level={60} delay={4} />
        </div>
      )}

      {tab === "experience" && (
        <div className="text-left max-w-md mx-auto w-full space-y-4">
          <TimelineItem 
            position="Desarrollador Frontend"
            company="Empresa X"
            period="Ene 2022 - Actualidad"
            description="Desarrollo de aplicaciones web con React..."
          />
          <TimelineItem 
            position="Practicante en Empresa Y"
            company="Empresa Y"
            period="Jun 2021 - Dic 2021"
            description="Apoyo en desarrollo frontend..."
            isLast={true}
          />
        </div>
      )}
    </div>
  </div>
</section>


{/* Projects Section IMPROVED */}
<section id="proyectos" className="max-w-6xl mx-auto mb-16 px-4 md:px-0">
  <h2 className="text-xl sm:text-2xl text-[#58A6FF] mb-6 border-b border-[#30363D] pb-2 flex items-center gap-2">
    <Code size={24} className="text-[#58A6FF]" />
    Proyectos
    <span className="ml-2 text-sm font-normal text-[#8B949E] bg-[#21262D] px-2 py-1 rounded-full">
      {filteredProjects.length}
    </span>
  </h2>
  
  {/* Filtros añadidos */}
  <ProjectFilters 
    activeFilter={activeProjectFilter} 
    setActiveFilter={setActiveProjectFilter}
  />
  
  {/* Grid mejorado de proyectos */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredProjects.slice(0, visibleProjects).map(project => (
      <ProjectCard 
        key={project.id}
        title={project.title}
        description={project.description}
        image={project.image}
        tags={project.tags}
        demoUrl={project.demoUrl}
        repoUrl={project.repoUrl}
      />
    ))}
  </div>
  
  {/* Botón "Ver más proyectos" */}
  {visibleProjects < filteredProjects.length && (
    <div className="text-center mt-8">
      <button 
        onClick={loadMoreProjects}
        className="px-6 py-3 bg-[#21262D] text-[#C9D1D9] border border-[#30363D] rounded hover:bg-[#30363D] transition-colors"
      >
        Ver más proyectos
      </button>
    </div>
  )}
</section>

{/* Contact Section: IMPROVED */}
<section id="contacto" className="max-w-6xl mx-auto px-4 md:px-0 mb-16">
  <h2 className="text-xl sm:text-2xl text-[#58A6FF] mb-8 border-b border-[#30363D] pb-2 font-semibold">
    Contacto
  </h2>
  
  <div className="bg-gradient-to-r from-[#161B22] to-[#21262D] rounded-2xl shadow-lg overflow-hidden">
    <div className="flex flex-col md:flex-row">
      {/* Lado izquierdo con ilustración */}
      <div className="md:w-1/2 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-full h-full top-0 left-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-[#58A6FF]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-[#238636]"></div>
          <div className="absolute top-2/3 left-1/3 w-12 h-12 rounded-full bg-[#58A6FF]"></div>
        </div>
        
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-[#58A6FF] mb-4">Get in Touch</h3>
          <p className="text-[#8B949E] mb-6">
            ¿Te interesa trabajar conmigo o tienes alguna pregunta? ¡Escríbeme a través del formulario y te responderé lo antes posible!
          </p>
          
          <div className="hidden md:flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#30363D] p-3 rounded-full">
                <Mail size={20} className="text-[#58A6FF]" />
              </div>
              <span className="text-[#C9D1D9]">brayangutierrez2671@egmail.com</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#30363D] p-3 rounded-full">
                <Github size={20} className="text-[#58A6FF]" />
              </div>
              <span className="text-[#C9D1D9]">github.com/briian10</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#30363D] p-3 rounded-full">
                <Linkedin size={20} className="text-[#58A6FF]" />
              </div>
              <span className="text-[#C9D1D9]">linkedin.com/in/brayan</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lado derecho con formulario */}
      <div className="md:w-1/2 bg-[#0D1117] p-8 rounded-l-3xl shadow-inner">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                placeholder="Nombre" 
                className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[#30363D] text-[#C9D1D9] focus:outline-none focus:border-[#58A6FF] focus:ring-1 focus:ring-[#58A6FF] transition-colors"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Apellido" 
                className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[#30363D] text-[#C9D1D9] focus:outline-none focus:border-[#58A6FF] focus:ring-1 focus:ring-[#58A6FF] transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[#30363D] text-[#C9D1D9] focus:outline-none focus:border-[#58A6FF] focus:ring-1 focus:ring-[#58A6FF] transition-colors"
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder="Teléfono" 
                className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[#30363D] text-[#C9D1D9] focus:outline-none focus:border-[#58A6FF] focus:ring-1 focus:ring-[#58A6FF] transition-colors"
              />
            </div>
          </div>
          
          <div>
            <textarea 
              placeholder="Mensaje" 
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[#30363D] text-[#C9D1D9] focus:outline-none focus:border-[#58A6FF] focus:ring-1 focus:ring-[#58A6FF] transition-colors resize-none"
            ></textarea>
          </div>
          
          <div className="text-right">
            <button 
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#1F6FEB] to-[#58A6FF] text-white font-medium rounded-lg hover:from-[#58A6FF] hover:to-[#1F6FEB] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

      {/* Footer: codigo original mantenido */}
      <footer className="mt-16 border-t border-[#30363D] pt-6 text-center text-sm text-[#8B949E]">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-[#58A6FF]">
            GitHub
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-[#58A6FF]">
            LinkedIn
          </a>
          <a href="mailto:brayangutierrez2671@example.com" className="hover:text-[#58A6FF]">
            Email
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Brayan Gutierrez - Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}