import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Code, 
  Palette, 
  Zap, 
  Atom, 
  Rocket, 
  Wind, 
  Hash, 
  Triangle, 
  Github, 
  Mail,
  MessageCircle,
  Linkedin,
  Music,
  Search,
  Smartphone,
  Monitor,
  Globe,
  Briefcase,
  Clock,
  Award,
  Target,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Play,
  Download,
  Eye,
  Send,
  X,
  MapPin,
  Phone,
  FileText,
  Calendar,
  Heart,
  Lightbulb
} from 'lucide-react';
import img1 from './assets/yp.png';
import img2 from './assets/yeep.png';
import img3 from './assets/yeeeep.png';

const App = () => {
  const canvasRef = useRef();
  const heroRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Enhanced Three.js setup with more interactive cyan net background
  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create enhanced cyan net-like background with more depth
    const netGroup = new THREE.Group();
    
    // Create horizontal lines with more detail
    const horizontalLines = 20;
    const verticalLines = 20;
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0.4,
      linewidth: 2
    });
    
    // Horizontal grid lines with wave effect
    for (let i = 0; i < horizontalLines; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const y = (i - horizontalLines / 2) * 1.8;
      
      for (let j = 0; j <= 120; j++) {
        const x = (j - 60) * 0.4;
        const z = Math.sin(x * 0.3 + y * 0.2) * Math.cos(y * 0.15) * 3;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      netGroup.add(line);
    }
    
    // Vertical grid lines with wave effect
    for (let i = 0; i < verticalLines; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const x = (i - verticalLines / 2) * 1.8;
      
      for (let j = 0; j <= 120; j++) {
        const y = (j - 60) * 0.4;
        const z = Math.sin(x * 0.2 + y * 0.3) * Math.cos(x * 0.15) * 3;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      netGroup.add(line);
    }
    
    scene.add(netGroup);
    
    // Add enhanced floating cyan particles with glow effect
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i + 2] = (Math.random() - 0.5) * 50;
      particleSizes[i / 3] = Math.random() * 0.2 + 0.05;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Add glowing orbs
    const orbGroup = new THREE.Group();
    const orbGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6
    });
    
    for (let i = 0; i < 8; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      orb.userData = {
        originalPosition: orb.position.clone(),
        speed: Math.random() * 0.02 + 0.01,
        radius: Math.random() * 5 + 3
      };
      orbGroup.add(orb);
    }
    
    scene.add(orbGroup);
    
    camera.position.z = 20;
    
    // Enhanced mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop with enhanced effects
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Animate net with more complex movement
      netGroup.rotation.x = elapsedTime * 0.03 + Math.sin(elapsedTime * 0.1) * 0.05;
      netGroup.rotation.y = elapsedTime * 0.02 + Math.cos(elapsedTime * 0.1) * 0.05;
      
      // Animate particles
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      
      // Animate orbs
      orbGroup.children.forEach((orb, i) => {
        const time = elapsedTime * orb.userData.speed;
        orb.position.x = orb.userData.originalPosition.x + Math.sin(time) * orb.userData.radius;
        orb.position.y = orb.userData.originalPosition.y + Math.cos(time * 0.8) * orb.userData.radius;
        orb.position.z = orb.userData.originalPosition.z + Math.sin(time * 1.2) * orb.userData.radius;
        
        // Pulsing effect
        const scale = 1 + Math.sin(elapsedTime * 2 + i) * 0.2;
        orb.scale.set(scale, scale, scale);
      });
      
      // Enhanced camera movement
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.3;
      
      if (heroRef.current) {
        heroRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
      
      // Update current section
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const techStacks = [
    { name: 'HTML5', icon: Code, color: 'from-cyan-400 to-cyan-500', level: 95 },
    { name: 'CSS3', icon: Palette, color: 'from-cyan-500 to-cyan-600', level: 90 },
    { name: 'JavaScript', icon: Zap, color: 'from-cyan-300 to-cyan-400', level: 92 },
    { name: 'React.js', icon: Atom, color: 'from-cyan-400 to-cyan-500', level: 93 },
    { name: 'Next.js', icon: Rocket, color: 'from-cyan-500 to-cyan-600', level: 88 },
    { name: 'Tailwind CSS', icon: Wind, color: 'from-cyan-300 to-cyan-400', level: 91 },
    { name: 'Bootstrap', icon: Hash, color: 'from-cyan-400 to-cyan-500', level: 85 },
    { name: 'Vite', icon: Triangle, color: 'from-cyan-500 to-cyan-600', level: 87 },
    { name: 'GitHub', icon: Github, color: 'from-cyan-300 to-cyan-400', level: 90 },
    { name: 'Vercel', icon: Triangle, color: 'from-cyan-400 to-cyan-500', level: 89 }
  ];
  
  const projects = [
    {
      title: 'Web Craft Pro',
      description: 'Professional web development showcase with modern design',
      url: 'http://web-craft-pro.vercel.app',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      status: 'Live',
      image: img2,
      featured: true
    },
    {
      title: 'Tech Haven',
      description: 'Technology-focused platform with cutting-edge features',
      url: 'http://tech-haven-vcu4.vercel.app',
      tech: ['React', 'JavaScript', 'CSS3', 'Vite'],
      status: 'Live',
      image: img3
    },
    {
      title: 'Fashion Store',
      description: 'E-commerce clothing platform with sleek UI/UX',
      url: 'http://clothing-seven-tau.vercel.app',
      tech: ['React', 'Next.js', 'Bootstrap', 'GitHub'],
      status: 'Live',
      image: img1
    }
  ];
  
  const handleHireMe = () => {
    // Enhanced cyan confetti effect
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'fixed w-3 h-3 rounded-full pointer-events-none z-50';
      confetti.style.backgroundColor = `rgba(0, ${200 + Math.random() * 55}, 255, ${0.7 + Math.random() * 0.3})`;
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.animation = `fall ${1.5 + Math.random() * 2}s linear forwards`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
    setShowModal(true);
  };
  
  const handleSubmitToEmail = (formData) => {
    setIsSubmitting(true);
    
    // Format email subject and body
    const subject = encodeURIComponent('New Contact Form Submission from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Project Type: ${formData.projectType}\n` +
      `Budget: ${formData.budget}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Sent from portfolio website`
    );
    
    // Create mailto link
    const mailtoLink = `mailto:cokorie158@gmail.com?subject=${subject}&body=${body}`;
    
    // Simulate network delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Open email client after a short delay
      setTimeout(() => {
        window.location.href = mailtoLink;
        setSubmitSuccess(false);
        setShowModal(false);
      }, 1500);
    }, 1000);
  };
  
  const scrollToNextSection = () => {
    const sections = document.querySelectorAll('section');
    const heroSection = sections[0];
    const skillsSection = sections[1];
    
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      />
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
        {['Hero', 'Skills', 'Projects', 'Journey', 'Testimonials', 'Process', 'Contact', 'Footer'].map((section, index) => (
          <div
            key={section}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSection === index ? 'bg-cyan-400 scale-150 shadow-lg shadow-cyan-400/50' : 'bg-gray-600 hover:bg-cyan-300'
            }`}
            onClick={() => document.querySelectorAll('section')[index]?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="sr-only">{section}</div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff; }
          50% { text-shadow: 0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 90px #00ffff; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(5deg); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.3); }
          50% { border-color: #40e0d0; box-shadow: 0 0 30px rgba(0,255,255,0.5); }
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes tech-card-3d {
          0% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
          50% { transform: perspective(1000px) rotateY(15deg) rotateX(5deg); }
          100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes process-3d {
          0% { transform: perspective(1000px) rotateY(0deg) translateZ(0); }
          50% { transform: perspective(1000px) rotateY(10deg) translateZ(20px); }
          100% { transform: perspective(1000px) rotateY(0deg) translateZ(0); }
        }
        @keyframes modal-appear {
          from { transform: scale(0.9) rotateX(10deg); opacity: 0; }
          to { transform: scale(1) rotateX(0deg); opacity: 1; }
        }
        @keyframes branch-grow {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes hero-text-3d {
          0% { transform: translateZ(0px) rotateX(0deg); }
          50% { transform: translateZ(30px) rotateX(5deg); }
          100% { transform: translateZ(0px) rotateX(0deg); }
        }
        @keyframes modal-card-3d {
          0% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
          50% { transform: perspective(1000px) rotateY(5deg) rotateX(2deg); }
          100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
        }
        @keyframes contact-link-3d {
          0% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0); }
          50% { transform: perspective(1000px) rotateY(10deg) rotateX(5deg) translateZ(20px); }
          100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0); }
        }
        @keyframes modal-particle-float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes input-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.3); }
          50% { box-shadow: 0 0 20px rgba(0,255,255,0.6); }
        }
        @keyframes cube-rotate {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes success-pulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-glow { animation: glow 3s ease-in-out infinite alternate; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-border { animation: pulse-border 2s ease-in-out infinite; }
        .animate-gentle-bounce { animation: gentle-bounce 2s ease-in-out infinite; }
        .animate-tech-card-3d { animation: tech-card-3d 8s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-process-3d { animation: process-3d 10s ease-in-out infinite; }
        .animate-modal-appear { animation: modal-appear 0.5s ease-out forwards; }
        .animate-branch-grow { animation: branch-grow 1s ease-out forwards; }
        .animate-hero-text-3d { animation: hero-text-3d 8s ease-in-out infinite; }
        .animate-modal-card-3d { animation: modal-card-3d 10s ease-in-out infinite; }
        .animate-contact-link-3d { animation: contact-link-3d 6s ease-in-out infinite; }
        .animate-modal-particle-float { animation: modal-particle-float 8s linear infinite; }
        .animate-input-glow { animation: input-glow 2s ease-in-out infinite; }
        .animate-cube-rotate { animation: cube-rotate 20s linear infinite; }
        .animate-success-pulse { animation: success-pulse 0.6s ease-out forwards; }
      `}</style>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className={`text-center transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative mb-8">
            <h1 className="text-7xl md:text-10xl font-black mb-8 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent animate-glow animate-hero-text-3d">
              GODMAN
            </h1>
            <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-20 h-20 md:w-28 md:h-28 rounded-full bg-cyan-400/20 blur-xl animate-pulse"></div>
          </div>
          <h2 className={`text-2xl md:text-3xl mb-6 text-cyan-200 font-light transition-all duration-2000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Frontend Developer & React Specialist
          </h2>
          <p className={`text-lg md:text-xl font-bold text-cyan-300 mb-12 animate-pulse transition-all duration-2000 delay-1000 flex items-center justify-center gap-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Rocket className="w-6 h-6" />
            I built this website in 24 hours, would you hire me?
          </p>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
            <button 
              onClick={scrollToNextSection}
              className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center animate-pulse-border cursor-pointer hover:border-cyan-300 transition-colors"
            >
              <div className="w-1 h-4 bg-cyan-400 rounded-full mt-3 animate-bounce"></div>
            </button>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            My Tech Arsenal
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {techStacks.map((tech, index) => (
              <TechCard3D key={tech.name} tech={tech} index={index} mousePosition={mousePosition} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="relative z-10 py-32 px-4 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} mousePosition={mousePosition} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Journey Timeline - Tree-like structure */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            My Journey
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-cyan-600 hidden md:block"></div>
            
            {[
              { year: '2025', title: 'Frontend Developer', company: 'Personal Projects', desc: 'Building innovative web solutions with React and Next.js', icon: Rocket, side: 'right' },
              { year: '2024', title: 'React Specialist', company: 'Freelance Projects', desc: 'Developed multiple client websites with modern frameworks', icon: Atom, side: 'left' },
              { year: '2023', title: 'Web Developer', company: 'Portfolio Building', desc: 'Mastered responsive design and modern CSS frameworks', icon: Monitor, side: 'right' },
              { year: '2022', title: 'Learning Journey', company: 'Self-Taught', desc: 'Started with HTML, CSS, and JavaScript fundamentals', icon: Code, side: 'left' }
            ].map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Client Testimonials */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            What Clients Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Startup Founder', text: 'Chinonso delivered beyond expectations. The website is fast, beautiful, and exactly what we needed.', icon: Users },
              { name: 'Mike Chen', role: 'E-commerce Manager', text: 'Professional work with attention to detail. Our conversion rates increased by 40% after the redesign.', icon: Target },
              { name: 'Emma Wilson', role: 'Marketing Director', text: 'Incredible speed and quality. He transformed our vision into reality in record time.', icon: Star }
            ].map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} mousePosition={mousePosition} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Development Process */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            My Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your vision and requirements', icon: Search },
              { step: '02', title: 'Design', desc: 'Creating wireframes and interactive prototypes', icon: Palette },
              { step: '03', title: 'Development', desc: 'Building with modern React and responsive design', icon: Code },
              { step: '04', title: 'Deployment', desc: 'Testing, optimization, and live deployment', icon: Rocket }
            ].map((process, index) => (
              <ProcessCard key={process.step} process={process} index={index} mousePosition={mousePosition} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Me */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Why Choose Me?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Lightning Fast', desc: 'I deliver projects quickly without compromising quality', icon: Zap, metric: '24hrs' },
              { title: 'Modern Stack', desc: 'Using the latest technologies for optimal performance', icon: Rocket, metric: '100%' },
              { title: 'Responsive Design', desc: 'Perfect on all devices and screen sizes', icon: Smartphone, metric: 'All Devices' },
              { title: 'SEO Optimized', desc: 'Built for search engines and fast loading', icon: Search, metric: '95+ Score' },
              { title: 'Clean Code', desc: 'Maintainable and scalable code architecture', icon: Code, metric: 'Enterprise' },
              { title: '24/7 Support', desc: 'Always available for updates and maintenance', icon: Clock, metric: 'Always' }
            ].map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} mousePosition={mousePosition} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          
          <div className="bg-gray-900/60 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12">
            <p className="text-xl text-cyan-200 mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your ideas to life with cutting-edge technology and design.
            </p>
            
            <button
              onClick={handleHireMe}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50 flex items-center gap-2 mx-auto"
            >
              <Briefcase className="w-5 h-5" />
              Start Your Project
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="relative z-10 py-16 px-4 bg-gradient-to-t from-gray-900/80 to-transparent border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">GODMAN</h3>
              <p className="text-gray-400 mb-4">Frontend Developer & React Specialist creating exceptional digital experiences.</p>
              <div className="flex space-x-4">
                <a href="https://github.com/chinonso-okorie" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/chinonso-okorie" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://tiktok.com/@thegodman86" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Music className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-cyan-300 mb-4">Navigation</h4>
              <ul className="space-y-2">
                {['Home', 'Skills', 'Projects', 'Journey', 'Testimonials', 'Process', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-cyan-300 mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">React Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">Website Optimization</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-cyan-300 mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-2 text-cyan-400" />
                  <span>cokorie158@gmail.com</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-2 text-cyan-400" />
                  <span>+234 703 494 1078</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                  <span>Lagos, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-cyan-500/20 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Chinonso Okorie. All rights reserved. Made with <Heart className="inline w-4 h-4 text-cyan-400" /> and React.</p>
          </div>
        </div>
      </footer>
      
      {/* Floating Hire Button */}
      <button
        onClick={handleHireMe}
        className={`fixed bottom-8 right-8 z-30 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold py-4 px-8 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} delay-1500 animate-pulse-border flex items-center gap-2`}
      >
        <Briefcase className="w-5 h-5" />
        Hire Me Now!
      </button>
      
      {/* Contact Modal */}
      {showModal && <ContactModal onClose={() => setShowModal(false)} isSubmitting={isSubmitting} submitSuccess={submitSuccess} onSubmit={handleSubmitToEmail} />}
    </div>
  );
};

// Enhanced 3D Tech Card Component with mouse interaction
const TechCard3D = ({ tech, index, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();
  const IconComponent = tech.icon;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        } else {
          setTimeout(() => setIsVisible(false), index * 50);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);
  
  // Calculate mouse position relative to card
  const calculateRotation = () => {
    if (!cardRef.current || !mousePosition) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;
    
    // Normalize values
    const rotateY = (deltaX / window.innerWidth) * 30;
    const rotateX = -(deltaY / window.innerHeight) * 30;
    
    return { x: rotateX, y: rotateY };
  };
  
  const rotation = calculateRotation();
  
  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="relative h-48 transform transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-cyan-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 flex flex-col items-center justify-center transform-gpu" style={{ backfaceVisibility: 'hidden' }}>
          <div className="mb-4">
            <div className={`p-4 rounded-full bg-gradient-to-br ${tech.color} transition-all duration-500`}>
              <IconComponent className="w-10 h-10 text-black" />
            </div>
          </div>
          
          <h3 className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent mb-2`}>
            {tech.name}
          </h3>
          
          {/* Skill Level Indicator */}
          <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: isVisible ? `${tech.level}%` : '0%' }}
            ></div>
          </div>
          <div className="text-xs text-cyan-400 font-medium mt-1">{tech.level}%</div>
        </div>
        
        {/* Top Face */}
        <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-cyan-500/30 to-transparent rounded-t-2xl transform-gpu" style={{ transform: 'rotateX(90deg) translateZ(24px)', backfaceVisibility: 'hidden' }}></div>
        
        {/* Right Face */}
        <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-cyan-500/30 to-transparent rounded-r-2xl transform-gpu" style={{ transform: 'rotateY(90deg) translateZ(24px)', backfaceVisibility: 'hidden' }}></div>
        
        {/* Bottom Face */}
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-cyan-500/30 to-transparent rounded-b-2xl transform-gpu" style={{ transform: 'rotateX(-90deg) translateZ(24px)', backfaceVisibility: 'hidden' }}></div>
        
        {/* Left Face */}
        <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-cyan-500/30 to-transparent rounded-l-2xl transform-gpu" style={{ transform: 'rotateY(-90deg) translateZ(24px)', backfaceVisibility: 'hidden' }}></div>
        
        {/* Back Face */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 flex flex-col items-center justify-center transform-gpu" style={{ transform: 'rotateY(180deg) translateZ(24px)', backfaceVisibility: 'hidden' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{tech.level}%</div>
            <div className="text-cyan-300 text-sm">Proficiency Level</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        } else {
          setTimeout(() => setIsVisible(false), index * 100);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);
  
  // Calculate mouse position relative to card
  const calculateRotation = () => {
    if (!cardRef.current || !mousePosition) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;
    
    // Normalize values
    const rotateY = (deltaX / window.innerWidth) * 15;
    const rotateX = -(deltaY / window.innerHeight) * 15;
    
    return { x: rotateX, y: rotateY };
  };
  
  const rotation = calculateRotation();
  
  return (
    <div
      ref={cardRef}
      className={`bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl overflow-hidden transform transition-all duration-1000 hover:scale-105 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 ${
        isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-16 rotate-3'
      } ${project.featured ? 'ring-2 ring-cyan-500/50' : ''}`}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Image Container */}
      <div className="h-48 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 flex items-center justify-center border-b border-cyan-500/10 relative overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-cyan-400/60">
            <Monitor className="w-16 h-16 mb-2" />
            <span className="text-sm">Add project image here</span>
          </div>
        )}
        
        {project.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-cyan-300">{project.title}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-400 mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Live
          </a>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 font-bold py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced TimelineItem with tree-like structure
const TimelineItem = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef();
  const IconComponent = item.icon;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 300);
        } else {
          setTimeout(() => setIsVisible(false), index * 150);
        }
      },
      { threshold: 0.5 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [index]);
  
  // Position based on side
  const isLeft = item.side === 'left';
  
  return (
    <div
      ref={itemRef}
      className={`relative mb-16 md:mb-0 ${isLeft ? 'md:text-left md:mr-auto md:w-5/12' : 'md:text-right md:ml-auto md:w-5/12'} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } transition-all duration-1000`}
    >
      {/* Branch line */}
      <div 
        className={`absolute top-1/2 w-1/2 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 hidden md:block ${
          isLeft ? 'right-0' : 'left-0'
        } animate-branch-grow`}
        style={{ 
          transformOrigin: isLeft ? 'right center' : 'left center',
          animationDelay: `${index * 0.3}s`
        }}
      ></div>
      
      <div className="md:hidden flex items-center mb-4">
        <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full border-4 border-black mr-4"></div>
        <div className="text-cyan-400 font-bold">{item.year}</div>
      </div>
      
      <div className="bg-gray-900/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 transform transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
        <div className="hidden md:flex items-center gap-3 mb-3">
          <IconComponent className="w-6 h-6 text-cyan-400" />
          <div className="text-cyan-400 font-bold text-lg">{item.year}</div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <div className="text-cyan-300 font-semibold mb-2">{item.company}</div>
        <p className="text-gray-400 text-sm">{item.desc}</p>
      </div>
      
      <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full border-4 border-black animate-pulse" style={{ [isLeft ? 'right' : 'left']: '-12px' }}></div>
    </div>
  );
};

const TestimonialCard = ({ testimonial, index, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();
  const IconComponent = testimonial.icon;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        } else {
          setTimeout(() => setIsVisible(false), index * 100);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);
  
  // Calculate mouse position relative to card
  const calculateRotation = () => {
    if (!cardRef.current || !mousePosition) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;
    
    // Normalize values
    const rotateY = (deltaX / window.innerWidth) * 10;
    const rotateX = -(deltaY / window.innerHeight) * 10;
    
    return { x: rotateX, y: rotateY };
  };
  
  const rotation = calculateRotation();
  
  return (
    <div
      ref={cardRef}
      className={`bg-gray-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 transform transition-all duration-1000 hover:scale-105 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <IconComponent className="w-12 h-12 text-cyan-400" />
        <div className="text-6xl text-cyan-400">❝</div>
      </div>
      <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
      <div className="border-t border-cyan-500/20 pt-4">
        <h4 className="text-cyan-300 font-bold">{testimonial.name}</h4>
        <p className="text-gray-400 text-sm">{testimonial.role}</p>
      </div>
    </div>
  );
};

const ProcessCard = ({ process, index, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();
  const IconComponent = process.icon;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        } else {
          setTimeout(() => setIsVisible(false), index * 75);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);
  
  // Calculate mouse position relative to card
  const calculateRotation = () => {
    if (!cardRef.current || !mousePosition) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;
    
    // Normalize values
    const rotateY = (deltaX / window.innerWidth) * 15;
    const rotateX = -(deltaY / window.innerHeight) * 15;
    
    return { x: rotateX, y: rotateY };
  };
  
  const rotation = calculateRotation();
  
  return (
    <div
      ref={cardRef}
      className={`relative bg-gray-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 text-center transform transition-all duration-1000 hover:scale-105 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        perspective: '1000px',
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="text-cyan-400 font-black text-3xl mb-4">{process.step}</div>
      <div className="flex justify-center mb-4">
        <IconComponent className="w-12 h-12 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold text-cyan-300 mb-3">{process.title}</h3>
      <p className="text-gray-400 text-sm">{process.desc}</p>
    </div>
  );
};

const FeatureCard = ({ feature, index, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();
  const IconComponent = feature.icon;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        } else {
          setTimeout(() => setIsVisible(false), index * 50);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);
  
  // Calculate mouse position relative to card
  const calculateRotation = () => {
    if (!cardRef.current || !mousePosition) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;
    
    // Normalize values
    const rotateY = (deltaX / window.innerWidth) * 10;
    const rotateX = -(deltaY / window.innerHeight) * 10;
    
    return { x: rotateX, y: rotateY };
  };
  
  const rotation = calculateRotation();
  
  return (
    <div
      ref={cardRef}
      className={`bg-gray-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 transform transition-all duration-1000 hover:scale-105 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <IconComponent className="w-8 h-8 text-cyan-400" />
        <div className="text-cyan-400 font-bold text-lg">{feature.metric}</div>
      </div>
      <h3 className="text-xl font-bold text-cyan-300 mb-3">{feature.title}</h3>
      <p className="text-gray-400 text-sm">{feature.desc}</p>
    </div>
  );
};

// Enhanced Contact Modal with 3D animations and email submission
const ContactModal = ({ onClose, isSubmitting, submitSuccess, onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: 'Web Development',
    budget: 'Not Sure'
  });
  const [modalMousePosition, setModalMousePosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef();
  const cubeRef = useRef();
  
  useEffect(() => {
    setIsVisible(true);
    
    // Create floating particles in modal
    const createParticles = () => {
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = 'fixed w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-40 animate-modal-particle-float';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.bottom = '0px';
          particle.style.animationDelay = `${Math.random() * 2}s`;
          particle.style.opacity = Math.random() * 0.5 + 0.3;
          
          if (modalRef.current) {
            modalRef.current.appendChild(particle);
            setTimeout(() => particle.remove(), 8000);
          }
        }, i * 150);
      }
    };
    
    createParticles();
    
    // Create 3D rotating cube
    const createCube = () => {
      const cube = document.createElement('div');
      cube.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none z-30 opacity-20';
      cube.style.transformStyle = 'preserve-3d';
      cube.style.animation = 'animate-cube-rotate 20s linear infinite';
      
      // Create cube faces
      const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
      faces.forEach(face => {
        const faceDiv = document.createElement('div');
        faceDiv.className = `absolute w-24 h-24 bg-cyan-500/20 border border-cyan-400/30`;
        faceDiv.style.transform = `rotateY(${face === 'front' ? 0 : face === 'back' ? 180 : face === 'right' ? 90 : face === 'left' ? -90 : 0}deg) translateZ(12px)`;
        if (face === 'top') faceDiv.style.transform = 'rotateX(90deg) translateZ(12px)';
        if (face === 'bottom') faceDiv.style.transform = 'rotateX(-90deg) translateZ(12px)';
        cube.appendChild(faceDiv);
      });
      
      if (modalRef.current) {
        modalRef.current.appendChild(cube);
        cubeRef.current = cube;
      }
    };
    
    createCube();
    
    // Modal mouse tracking
    const handleModalMouseMove = (e) => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setModalMousePosition({ x, y });
      }
    };
    
    if (modalRef.current) {
      modalRef.current.addEventListener('mousemove', handleModalMouseMove);
    }
    
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('mousemove', handleModalMouseMove);
      }
    };
  }, []);
  
  const contactLinks = [
    {
      label: 'Email',
      value: 'cokorie158@gmail.com',
      href: 'mailto:cokorie158@gmail.com',
      icon: Mail,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      label: 'WhatsApp',
      value: '+234 703 494 1078',
      href: 'https://wa.me/2347034941078',
      icon: MessageCircle,
      color: 'from-cyan-400 to-cyan-500'
    },
    {
      label: 'LinkedIn',
      value: 'Chinonso Okorie',
      href: 'https://linkedin.com/in/chinonso-okorie',
      icon: Linkedin,
      color: 'from-cyan-500 to-cyan-700'
    },
    {
      label: 'TikTok',
      value: '@thegodman86',
      href: 'https://tiktok.com/@thegodman86',
      icon: Music,
      color: 'from-cyan-300 to-cyan-500'
    },
    {
      label: 'GitHub',
      value: 'github.com/chinonso',
      href: 'https://github.com/chinonso-okorie',
      icon: Github,
      color: 'from-cyan-600 to-cyan-800'
    }
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // Calculate 3D rotation for modal based on mouse position
  const calculateModalRotation = () => {
    if (!modalRef.current || !modalMousePosition) return { x: 0, y: 0 };
    
    const rect = modalRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = modalMousePosition.x - centerX;
    const deltaY = modalMousePosition.y - centerY;
    
    const rotateY = (deltaX / rect.width) * 10;
    const rotateX = -(deltaY / rect.height) * 10;
    
    return { x: rotateX, y: rotateY };
  };
  
  const modalRotation = calculateModalRotation();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className={`relative bg-gradient-to-br from-gray-900/95 to-cyan-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 max-w-2xl w-full transform transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100 animate-modal-appear' : 'opacity-0 scale-95'
        }`}
        style={{
          transform: `rotateX(${modalRotation.x}deg) rotateY(${modalRotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 3D Card edges */}
        <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/20 pointer-events-none animate-pulse-border"></div>
        <div className="absolute inset-4 rounded-2xl border border-cyan-500/10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
              <Rocket className="w-8 h-8 text-cyan-400" />
              Let's Connect!
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl transform hover:rotate-90 transition-transform duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-success-pulse">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-cyan-300 mb-4">Message Sent!</h3>
              <p className="text-gray-400 mb-6">Opening your email client to send the message...</p>
              <div className="w-16 h-1 bg-cyan-500 rounded-full mx-auto animate-pulse"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {contactLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-3 bg-gradient-to-r ${link.color} rounded-xl text-white hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 animate-contact-link-3d`}
                      style={{
                        transformStyle: 'preserve-3d',
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <IconComponent className="w-5 h-5" />
                        <div className="text-xs font-bold">{link.label}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
              
              <div className="border-t border-cyan-500/20 pt-6">
                <h3 className="text-lg font-bold text-cyan-300 mb-4">Send me a message</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 animate-input-glow text-sm"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 animate-input-glow text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 animate-input-glow text-sm"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="React Development">React Development</option>
                        <option value="Website Optimization">Website Optimization</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 animate-input-glow text-sm"
                      >
                        <option value="Not Sure">Not Sure</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none animate-input-glow text-sm"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-2 disabled:opacity-70 transform hover:rotate-1 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-t-2 border-black rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send to Email
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;