import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {   Mail ,
  Code, Briefcase, GraduationCap, Trophy, Palette, Zap, Atom, Rocket, Wind, Hash, Triangle, Github, Mail,
  MessageCircle, Linkedin, Music, Search, Smartphone, Monitor, Globe,
  Clock, Award, Target, Users, Star, CheckCircle, ArrowRight,
  ExternalLink, Play, Download, Eye, Send, X, MapPin, Phone, FileText,
  Calendar, Heart, Lightbulb, Sparkles, Layers, Fingerprint, Terminal
} from 'lucide-react';
import img1 from './assets/yp.png';
import img2 from './assets/yeep.png';
import img3 from './assets/yeeeep.png';

// Move the hook outside the component
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const App = () => {
  // State variables
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardRotations, setCardRotations] = useState({});
  const [cursorType, setCursorType] = useState('default');
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Journey data
  const journey = [
    {
      year: "2020",
      title: "Frontend Developer",
      company: "Tech Startup",
      desc: "Started my journey in web development, focusing on React and modern JavaScript frameworks.",
      icon: Code
    },
    {
      year: "2021",
      title: "Full Stack Developer",
      company: "Digital Agency",
      desc: "Expanded skills to backend development, working with Node.js and database management.",
      icon: Briefcase
    },
    {
      year: "2022",
      title: "Senior Developer",
      company: "Fortune 500",
      desc: "Led development teams and architected scalable solutions for enterprise applications.",
      icon: Trophy
    },
    {
      year: "2024",
      title: "Tech Lead",
      company: "Innovation Labs",
      desc: "Currently driving technical strategy and mentoring the next generation of developers.",
      icon: GraduationCap
    }
  ];

  // Create refs for each section
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [skillsRef, skillsVisible] = useIntersectionObserver();
  const [projectsRef, projectsVisible] = useIntersectionObserver();
  const [journeyRef, journeyVisible] = useIntersectionObserver();
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();
  const [processRef, processVisible] = useIntersectionObserver();
  const [featuresRef, featuresVisible] = useIntersectionObserver();
  const [contactRef, contactVisible] = useIntersectionObserver();
  
  // State for journey items visibility
  const [visibleItems, setVisibleItems] = useState(new Set());
  
  // Add this useEffect for staggered animations in journey section
  useEffect(() => {
    if (journeyVisible) {
      journey.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        }, index * 200);
      });
    } else {
      setVisibleItems(new Set());
    }
  }, [journeyVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  const canvasRef = useRef();
  
  // Three.js setup with enhanced 3D effects
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create enhanced cyan net background with 3D depth
    const netGroup = new THREE.Group();
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0.4,
      linewidth: 2
    });
    
    // Horizontal grid lines with 3D waves
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const y = (i - 10) * 1.8;
      
      for (let j = 0; j <= 120; j++) {
        const x = (j - 60) * 0.4;
        const z = Math.sin(x * 0.3 + y * 0.2) * Math.cos(y * 0.15) * 3 + Math.sin(j * 0.1) * 2;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      netGroup.add(line);
    }
    
    // Vertical grid lines with 3D waves
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const x = (i - 10) * 1.8;
      
      for (let j = 0; j <= 120; j++) {
        const y = (j - 60) * 0.4;
        const z = Math.sin(x * 0.2 + y * 0.3) * Math.cos(x * 0.15) * 3 + Math.sin(j * 0.1) * 2;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      netGroup.add(line);
    }
    
    scene.add(netGroup);
    
    // Add enhanced particles with 3D movement
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleVelocities = [];
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i + 2] = (Math.random() - 0.5) * 50;
      particleSizes[i / 3] = Math.random() * 0.3 + 0.1;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Add enhanced 3D geometric shapes
    const shapesGroup = new THREE.Group();
    
    // Add rotating cubes
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    
    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      cube.userData = {
        rotationSpeed: {
          x: Math.random() * 0.02 + 0.01,
          y: Math.random() * 0.02 + 0.01,
          z: Math.random() * 0.02 + 0.01
        }
      };
      shapesGroup.add(cube);
    }
    
    // Add rotating tetrahedrons
    const tetraGeometry = new THREE.TetrahedronGeometry(1.5, 0);
    const tetraMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
    
    for (let i = 0; i < 5; i++) {
      const tetra = new THREE.Mesh(tetraGeometry, tetraMaterial);
      tetra.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      tetra.userData = {
        rotationSpeed: {
          x: Math.random() * 0.02 + 0.01,
          y: Math.random() * 0.02 + 0.01,
          z: Math.random() * 0.02 + 0.01
        }
      };
      shapesGroup.add(tetra);
    }
    
    // Add rotating octahedrons
    const octaGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const octaMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.25,
      wireframe: true
    });
    
    for (let i = 0; i < 5; i++) {
      const octa = new THREE.Mesh(octaGeometry, octaMaterial);
      octa.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      octa.userData = {
        rotationSpeed: {
          x: Math.random() * 0.02 + 0.01,
          y: Math.random() * 0.02 + 0.01,
          z: Math.random() * 0.02 + 0.01
        }
      };
      shapesGroup.add(octa);
    }
    
    scene.add(shapesGroup);
    
    // Add 3D torus knots
    const torusGroup = new THREE.Group();
    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
    
    for (let i = 0; i < 3; i++) {
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      torus.userData = {
        rotationSpeed: {
          x: Math.random() * 0.01 + 0.005,
          y: Math.random() * 0.01 + 0.005,
          z: Math.random() * 0.01 + 0.005
        }
      };
      torusGroup.add(torus);
    }
    
    scene.add(torusGroup);
    
    // Add morphing shapes
    const morphGroup = new THREE.Group();
    const morphGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const morphMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    
    for (let i = 0; i < 4; i++) {
      const morph = new THREE.Mesh(morphGeometry, morphMaterial);
      morph.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35
      );
      morph.userData = {
        originalScale: morph.scale.clone(),
        morphSpeed: Math.random() * 0.02 + 0.01,
        morphPhase: Math.random() * Math.PI * 2
      };
      morphGroup.add(morph);
    }
    
    scene.add(morphGroup);
    
    // Add glowing orbs with enhanced 3D movement
    const orbGroup = new THREE.Group();
    const orbGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6
    });
    
    for (let i = 0; i < 10; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      orb.userData = {
        originalPosition: orb.position.clone(),
        speed: Math.random() * 0.02 + 0.01,
        radius: Math.random() * 5 + 3,
        phase: Math.random() * Math.PI * 2
      };
      orbGroup.add(orb);
    }
    
    scene.add(orbGroup);
    
    camera.position.z = 25;
    
    // Enhanced animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Enhanced net animation with 3D waves
      netGroup.rotation.x = elapsedTime * 0.03 + Math.sin(elapsedTime * 0.1) * 0.05;
      netGroup.rotation.y = elapsedTime * 0.02 + Math.cos(elapsedTime * 0.1) * 0.05;
      netGroup.position.z = Math.sin(elapsedTime * 0.5) * 2;
      
      // Enhanced particle animation with 3D movement
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleVelocities[i].x;
        positions[i3 + 1] += particleVelocities[i].y;
        positions[i3 + 2] += particleVelocities[i].z;
        
        // Boundary check
        if (Math.abs(positions[i3]) > 25) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > 25) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 25) particleVelocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      
      // Animate shapes
      shapesGroup.children.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
      });
      
      // Animate torus knots
      torusGroup.children.forEach((torus) => {
        torus.rotation.x += torus.userData.rotationSpeed.x;
        torus.rotation.y += torus.userData.rotationSpeed.y;
        torus.rotation.z += torus.userData.rotationSpeed.z;
      });
      
      // Animate morphing shapes
      morphGroup.children.forEach((morph) => {
        const time = elapsedTime * morph.userData.morphSpeed + morph.userData.morphPhase;
        const scale = 1 + Math.sin(time) * 0.5;
        morph.scale.set(scale, scale, scale);
        morph.rotation.x += 0.01;
        morph.rotation.y += 0.01;
      });
      
      // Enhanced orb animation with 3D movement
      orbGroup.children.forEach((orb, i) => {
        const time = elapsedTime * orb.userData.speed + orb.userData.phase;
        orb.position.x = orb.userData.originalPosition.x + Math.sin(time) * orb.userData.radius;
        orb.position.y = orb.userData.originalPosition.y + Math.cos(time * 0.8) * orb.userData.radius;
        orb.position.z = orb.userData.originalPosition.z + Math.sin(time * 1.2) * orb.userData.radius;
        
        const scale = 1 + Math.sin(elapsedTime * 2 + i) * 0.3;
        orb.scale.set(scale, scale, scale);
      });
      
      // Smooth camera movement without mouse control
      camera.position.x = Math.sin(elapsedTime * 0.1) * 3;
      camera.position.y = Math.cos(elapsedTime * 0.08) * 2;
      camera.position.z = 20 + Math.sin(elapsedTime * 0.05) * 5;
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
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js objects to prevent memory leaks
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  // Scroll tracking for current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const techStacks = [
    { name: 'HTML5', icon: Code, level: 95 },
    { name: 'CSS3', icon: Palette, level: 90 },
    { name: 'JavaScript', icon: Zap, level: 92 },
    { name: 'React.js', icon: Atom, level: 93 },
    { name: 'Next.js', icon: Rocket, level: 88 },
    { name: 'Tailwind CSS', icon: Wind, level: 91 },
    { name: 'Bootstrap', icon: Hash, level: 85 },
    { name: 'Vite', icon: Triangle, level: 87 },
    { name: 'GitHub', icon: Github, level: 90 },
    { name: 'Vercel', icon: Triangle, level: 89 }
  ];
  
  const projects = [
    {
      title: 'Web Craft Pro',
      description: 'Professional web development showcase',
      url: 'http://web-craft-pro.vercel.app',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      image: img2,
      featured: true
    },
    {
      title: 'Tech Haven',
      description: 'Technology-focused platform',
      url: 'http://tech-haven-vcu4.vercel.app',
      tech: ['React', 'JavaScript', 'CSS3', 'Vite'],
      image: img3
    },
    {
      title: 'Fashion Store',
      description: 'E-commerce clothing platform',
      url: 'http://clothing-seven-tau.vercel.app',
      tech: ['React', 'Next.js', 'Bootstrap', 'GitHub'],
      image: img1
    }
  ];
  
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Startup Founder', text: 'Delivered beyond expectations. Fast, beautiful, exactly what we needed.', icon: Users },
    { name: 'Mike Chen', role: 'E-commerce Manager', text: 'Conversion rates increased by 40% after the redesign.', icon: Target },
    { name: 'Emma Wilson', role: 'Marketing Director', text: 'Incredible speed and quality. Transformed our vision quickly.', icon: Star }
  ];
  
  const process = [
    { step: '01', title: 'Discovery', desc: 'Understanding your vision', icon: Search },
    { step: '02', title: 'Design', desc: 'Creating wireframes', icon: Palette },
    { step: '03', title: 'Development', desc: 'Building with React', icon: Code },
    { step: '04', title: 'Deployment', desc: 'Testing and launch', icon: Rocket }
  ];
  
  const features = [
    { title: 'Lightning Fast', desc: 'Quick delivery without compromise', icon: Zap, metric: '24hrs' },
    { title: 'Modern Stack', desc: 'Latest technologies', icon: Rocket, metric: '100%' },
    { title: 'Responsive Design', desc: 'Perfect on all devices', icon: Smartphone, metric: 'All Devices' },
    { title: 'SEO Optimized', desc: 'Built for search engines', icon: Search, metric: '95+ Score' },
    { title: 'Clean Code', desc: 'Maintainable architecture', icon: Code, metric: 'Enterprise' },
    { title: '24/7 Support', desc: 'Always available', icon: Clock, metric: 'Always' }
  ];
  
  const contactLinks = [
    { label: 'Email', value: 'cokorie158@gmail.com', href: 'mailto:cokorie158@gmail.com', icon: Mail },
    { label: 'WhatsApp', value: '+234 703 494 1078', href: 'https://wa.me/2347034941078', icon: MessageCircle },
    { label: 'LinkedIn', value: 'Chinonso Okorie', href: 'https://linkedin.com/in/chinonso-okorie', icon: Linkedin },
    { label: 'TikTok', value: '@thegodman86', href: 'https://tiktok.com/@thegodman86', icon: Music },
    { label: 'GitHub', value: 'github.com/chinonso', href: 'https://github.com/chinonso-okorie', icon: Github }
  ];
  
  const handleHireMe = () => {
    // Trigger glitch effect
    setTimeout(() => setGlitchEffect(false), 500);
    
    // Create confetti
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'fixed w-3 h-3 rounded-full pointer-events-none z-50';
      confetti.style.backgroundColor = `rgba(0, ${200 + Math.random() * 55}, 255, ${0.7 + Math.random() * 0.3})`;
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.animation = `fall ${1.5 + Math.random() * 2}s linear forwards`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
    setShowModal(true);
  };
  
  const handleSubmitToEmail = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Replace with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to send email');
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowModal(false);
        }, 1500);
      }, 1000);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      alert('Failed to send email. Please try again later.');
    }
  };
  
  const scrollToNextSection = () => {
    const sections = document.querySelectorAll('section');
    const skillsSection = sections[1];
    if (skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth' });
  };
  
  const smoothScrollToWithOffset = (elementId, offset = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };



  const ContactModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const contactLinks = [
    { label: 'Email', icon: Mail, href: 'mailto:cokorie158@gmail.com' },
    { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/1234567890' },
    { label: 'Call', icon: Phone, href: 'tel:+1234567890' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Fallback to mailto
      const subject = `New Project Inquiry from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.projectType || 'Not specified'}\nBudget: ${formData.budget || 'Not specified'}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:cokorie158@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_blank');
      setSubmitSuccess(true);
    }
    
    setIsSubmitting(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 animate-scaleIn">
        
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-400/5 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-300/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-6">
          {/* Compact Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                Let's Work Together
              </h2>
              <p className="text-gray-300 text-sm">
                Ready to bring your ideas to life? Let's create something amazing.
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-lg hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {submitSuccess ? (
            <div className="text-center py-8 animate-slideUp">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Message Sent! 🎉
              </h3>
              <p className="text-gray-300 text-sm max-w-sm mx-auto mb-4">
                Thank you! I'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSubmitSuccess(false);
                }}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Quick Contact Links - Compact */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {contactLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-lg transition-all duration-300 group transform hover:scale-105"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
              
              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-black/50 text-gray-400 font-medium">
                    Or send a message
                  </span>
                </div>
              </div>
              
              {/* Compact Contact Form */}
              <div className="space-y-4">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 text-sm"
                  />
                </div>
                
                {/* Project Type and Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 text-sm"
                  >
                    <option value="" className="bg-gray-800">Project Type</option>
                    <option value="Web Development" className="bg-gray-800">Web Development</option>
                    <option value="UI/UX Design" className="bg-gray-800">UI/UX Design</option>
                    <option value="React Development" className="bg-gray-800">React Development</option>
                    <option value="E-commerce" className="bg-gray-800">E-commerce</option>
                    <option value="Mobile App" className="bg-gray-800">Mobile App</option>
                    <option value="Other" className="bg-gray-800">Other</option>
                  </select>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 text-sm"
                  >
                    <option value="" className="bg-gray-800">Budget Range</option>
                    <option value="Under $1,000" className="bg-gray-800">Under $1,000</option>
                    <option value="$1,000 - $2,500" className="bg-gray-800">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000" className="bg-gray-800">$2,500 - $5,000</option>
                    <option value="$5,000+" className="bg-gray-800">$5,000+</option>
                    <option value="Let's discuss" className="bg-gray-800">Let's discuss</option>
                  </select>
                </div>
                
                {/* Message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project vision and requirements..."
                  rows="3"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 resize-none text-sm"
                ></textarea>
                
                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {/* Footer Note */}
                <p className="text-center text-xs text-gray-400">
                  🔒 Your information is secure and private
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};



  
  
  return (
    <div className={`min-h-screen bg-black text-white font-sans relative overflow-x-hidden ${glitchEffect ? 'glitch-effect' : ''}`}>
      {/* Custom Cursor */}
      <div 
        className={`fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50 transition-transform duration-100 ${
          cursorType === 'hover' ? 'scale-150 bg-cyan-400/20' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x - 14,
          top: mousePosition.y - 14,
        }}
      />
      
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 z-10 animate-float-slow">
        <Sparkles className="w-8 h-8 text-cyan-400 opacity-30" />
      </div>
      <div className="fixed top-40 right-20 z-10 animate-float-medium">
        <Layers className="w-10 h-10 text-cyan-400 opacity-30" />
      </div>
      <div className="fixed bottom-40 left-20 z-10 animate-float-fast">
        <Fingerprint className="w-12 h-12 text-cyan-400 opacity-30" />
      </div>
      <div className="fixed bottom-20 right-10 z-10 animate-float-slow">
        <Terminal className="w-9 h-9 text-cyan-400 opacity-30" />
      </div>
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
        {['Hero', 'Skills', 'Projects', 'Journey', 'Testimonials', 'Process', 'Contact', 'Footer'].map((section, index) => (
          <div
            key={section}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSection === index 
                ? 'bg-cyan-400 scale-150 shadow-lg shadow-cyan-400/50 animate-pulse' 
                : 'bg-gray-600 hover:bg-cyan-300'
            }`}
            onClick={() => document.querySelectorAll('section')[index]?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fall { to { transform: translateY(100vh) rotate(360deg); } }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff; }
          50% { text-shadow: 0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 90px #00ffff; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.3); }
          50% { border-color: #40e0d0; box-shadow: 0 0 30px rgba(0,255,255,0.5); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100px) rotateY(-30deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100px) rotateY(30deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(50px) rotateX(30deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8) rotateY(45deg); }
          to { opacity: 1; transform: scale(1) rotateY(0deg); }
        }
        @keyframes flip-in {
          from { opacity: 0; transform: perspective(1000px) rotateY(90deg); }
          to { opacity: 1; transform: perspective(1000px) rotateY(0deg); }
        }
        @keyframes flip-from-side {
          0% { opacity: 0; transform: perspective(1200px) rotateY(-70deg) translateX(-50px); }
          50% { opacity: 0.7; transform: perspective(1200px) rotateY(20deg) translateX(10px); }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) translateX(0); }
        }
        @keyframes float-3d {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          25% { transform: translateY(-10px) rotateX(5deg) rotateY(5deg); }
          50% { transform: translateY(-20px) rotateX(0deg) rotateY(10deg); }
          75% { transform: translateY(-10px) rotateX(-5deg) rotateY(5deg); }
        }
        @keyframes rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          33% { transform: rotateX(10deg) rotateY(120deg) rotateZ(5deg); }
          66% { transform: rotateX(-5deg) rotateY(240deg) rotateZ(-5deg); }
          100% { transform: rotateX(0deg) rotateY(360deg) rotateZ(0deg); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(-5px, -5px); }
          60% { transform: translate(5px, 5px); }
          80% { transform: translate(5px, -5px); }
          100% { transform: translate(0); }
        }
        @keyframes neon-pulse {
          0% { box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff, 0 0 35px #00ffff; }
          50% { box-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff, 0 0 12px #00ffff, 0 0 18px #00ffff; }
          100% { box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff, 0 0 35px #00ffff; }
        }
        .animate-glow { animation: glow 3s ease-in-out infinite alternate; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-pulse-border { animation: pulse-border 2s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-flip-in { animation: flip-in 0.8s ease-out forwards; }
        .animate-flip-from-side { animation: flip-from-side 0.8s ease-out forwards; }
        .animate-float-3d { animation: float-3d 8s ease-in-out infinite; }
        .animate-rotate-3d { animation: rotate-3d 12s linear infinite; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-1000 { perspective: 1000px; }
        .perspective-1200 { perspective: 1200px; }
        .transform-3d { transform: translateZ(0); }
        .card-3d { transition: transform 0.3s ease-out; }
        .neon-border { animation: neon-pulse 2s ease-in-out infinite; }
        .glitch-effect { animation: glitch 0.3s infinite; }
      `}</style>
      
      {/* Hero Section */}
      <section ref={heroRef} id='Home' className="relative min-h-screen flex items-center justify-center px-4">
        <div className={`text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
            Nonso
          </h1>
          
          <h2 className={`text-xl md:text-2xl mb-8 text-cyan-200 font-light transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Full Stack Developer & UI/UX Designer
          </h2>
          
          <p className={`text-lg text-cyan-300 mb-12 transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Building the future of web experiences
          </p>
          
          <div className={`transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button 
              onClick={scrollToNextSection}
              className="group inline-flex items-center gap-2 px-8 py-4 font-semibold text-cyan-400 rounded-full border border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
            >
              Explore My Work
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Section */}
      <section ref={skillsRef} id='about' className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent transition-all duration-800 ${
            skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            My Tech Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {techStacks.map((tech, index) => (
              <div 
                key={tech.name} 
                className={`bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-700 hover:scale-105 hover:bg-gray-900/70 hover:border-cyan-500/40 ${
                  skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 border border-cyan-500/30">
                    <tech.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                
                <h3 className="text-sm font-semibold text-cyan-200 mb-3">
                  {tech.name}
                </h3>
                
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-1.5 rounded-full transition-all duration-1500 ease-out"
                    style={{ 
                      width: skillsVisible ? `${tech.level}%` : '0%',
                      transitionDelay: `${index * 100 + 300}ms`
                    }}
                  ></div>
                </div>
                
                <div className="text-xs text-cyan-400 font-medium mt-2">
                  {tech.level}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section ref={projectsRef} id='projects' className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent ${
            projectsVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}>
            Personal Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={project.title} 
                className={`bg-gray-900/40 backdrop-blur-lg border border-cyan-500/20 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 card-3d ${
                  projectsVisible ? 'animate-flip-from-side' : 'opacity-0'
                } stagger-${(index % 3) + 1}`}
                data-card-id={`project-${index}`}
                style={{
                  transform: cardRotations[`project-${index}`] 
                    ? `rotateX(${cardRotations[`project-${index}`].x}deg) rotateY(${cardRotations[`project-${index}`].y}deg)` 
                    : 'none'
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black text-xs font-bold px-3 py-1 rounded-full">
                      FEATURED
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Journey Section */}
      <section ref={journeyRef} id='skills' className="py-20 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent transition-all duration-700 transform ${
            journeyVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            My Journey
          </h2>
          
          <div className="relative">
            {/* Animated Timeline line */}
            <div className={`absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 w-0.5 bg-gradient-to-b from-cyan-400 to-cyan-600 hidden sm:block transition-all duration-1000 ${
              journeyVisible ? 'h-full opacity-100' : 'h-0 opacity-0'
            }`} style={{transitionDelay: '0.5s'}}></div>
            
            {journey.map((item, index) => {
              const isVisible = visibleItems.has(index);
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={item.year}
                  className={`relative mb-8 transition-all duration-700 transform ${
                    isVisible 
                      ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
                      : `opacity-0 scale-95 ${isEven ? '-translate-x-12 translate-y-4' : 'translate-x-12 translate-y-4'}`
                  } ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left md:ml-auto'} md:w-1/2`}
                  style={{ 
                    transitionDelay: `${index * 150 + 500}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Mobile timeline dot */}
                  <div className="flex items-start sm:hidden mb-4">
                    <div className={`w-3 h-3 bg-cyan-500 rounded-full mt-2 mr-4 flex-shrink-0 transition-all duration-500 transform ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`} style={{transitionDelay: `${index * 150 + 700}ms`}}></div>
                    <div>
                      <div className={`text-cyan-400 font-semibold text-sm transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`} style={{transitionDelay: `${index * 150 + 800}ms`}}>
                        {item.year}
                      </div>
                    </div>
                  </div>
                  {/* Content card with enhanced animations */}
                  <div className={`bg-gray-900/30 backdrop-blur-sm rounded-xl shadow-md transition-all duration-500 p-6 ml-4 sm:ml-0 border border-cyan-500/20 transform group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/40 hover:bg-gray-900/50`}
                  style={{transitionDelay: `${index * 150 + 600}ms`}}>
                    
                    {/* Icon and year header */}
                    <div className={`flex items-center gap-3 mb-3 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`} style={{transitionDelay: `${index * 150 + 800}ms`}}>
                      <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="hidden sm:block text-cyan-400 font-semibold transition-colors duration-300 group-hover:text-cyan-300">
                        {item.year}
                      </div>
                    </div>
                    
                    {/* Title with stagger animation */}
                    <h3 className={`text-lg font-semibold text-white mb-1 transition-all duration-500 transform ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } group-hover:text-cyan-100`}
                    style={{transitionDelay: `${index * 150 + 900}ms`}}>
                      {item.title}
                    </h3>
                    
                    {/* Company with animation */}
                    <div className={`text-cyan-300 font-medium mb-3 text-sm transition-all duration-500 transform ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } group-hover:text-cyan-200`}
                    style={{transitionDelay: `${index * 150 + 1000}ms`}}>
                      {item.company}
                    </div>
                    
                    {/* Description with animation */}
                    <p className={`text-gray-400 text-sm leading-relaxed transition-all duration-500 transform ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } group-hover:text-gray-300`}
                    style={{transitionDelay: `${index * 150 + 1100}ms`}}>
                      {item.desc}
                    </p>
                    {/* Animated border on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {/* Desktop timeline dot with enhanced animation */}
                  <div 
                    className={`hidden sm:block absolute top-6 w-4 h-4 bg-cyan-500 rounded-full border-4 border-gray-900 shadow-md transition-all duration-500 transform ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    } hover:scale-125 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50`}
                    style={{ 
                      [isEven ? 'right' : 'left']: '-8px',
                      transform: `translateX(50%) ${isVisible ? 'scale(1)' : 'scale(0)'}`,
                      transitionDelay: `${index * 150 + 700}ms`
                    }}
                  >
                    {/* Pulse animation for timeline dots */}
                    <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20"></div>
                  </div>
                  {/* Connection line animation for desktop */}
                  <div className={`hidden md:block absolute top-8 w-8 h-0.5 bg-gradient-to-r ${
                    isEven ? 'from-cyan-500 to-transparent right-0' : 'from-transparent to-cyan-500 left-0'
                  } transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} style={{
                    transformOrigin: isEven ? 'right' : 'left',
                    transitionDelay: `${index * 150 + 800}ms`
                  }}></div>
                </div>
              );
            })}
            {/* Floating particles animation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-float transition-opacity duration-1000 ${
                    journeyVisible ? 'opacity-20' : 'opacity-0'
                  }`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(120deg); }
            66% { transform: translateY(5px) rotate(240deg); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </section>
      
      {/* Testimonials */}
      <section ref={testimonialsRef} className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent ${
            testimonialsVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}>
            What Clients Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name} 
                className={`bg-gray-900/40 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 card-3d ${
                  testimonialsVisible ? 'animate-flip-from-side' : 'opacity-0'
                } stagger-${(index % 3) + 1}`}
                data-card-id={`testimonial-${index}`}
                style={{
                  transform: cardRotations[`testimonial-${index}`] 
                    ? `rotateX(${cardRotations[`testimonial-${index}`].x}deg) rotateY(${cardRotations[`testimonial-${index}`].y}deg)` 
                    : 'none'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <testimonial.icon className="w-10 h-10 text-cyan-400" />
                  <div className="text-4xl text-cyan-400">❝</div>
                </div>
                <p className="text-gray-300 mb-6 italic text-sm leading-relaxed">{testimonial.text}</p>
                <div className="border-t border-cyan-500/20 pt-4">
                  <h4 className="text-cyan-300 font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process */}
      <section ref={processRef} className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent ${
            processVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}>
            My Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div 
                key={step.step} 
                className={`bg-gray-900/30 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 card-3d ${
                  processVisible ? 'animate-flip-from-side' : 'opacity-0'
                } stagger-${index + 1}`}
                data-card-id={`process-${index}`}
                style={{
                  transform: cardRotations[`process-${index}`] 
                    ? `rotateX(${cardRotations[`process-${index}`].x}deg) rotateY(${cardRotations[`process-${index}`].y}deg)` 
                    : 'none'
                }}
              >
                <div className="text-cyan-400 font-bold text-2xl mb-4">{step.step}</div>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 transition-transform duration-300 hover:rotate-6 hover:scale-110">
                    <step.icon className="w-8 h-8 text-black" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section ref={featuresRef} className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent ${
            featuresVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}>
            Why Choose Me?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`bg-gray-900/40 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 card-3d ${
                  featuresVisible ? 'animate-flip-from-side' : 'opacity-0'
                } stagger-${(index % 3) + 1}`}
                data-card-id={`feature-${index}`}
                style={{
                  transform: cardRotations[`feature-${index}`] 
                    ? `rotateX(${cardRotations[`feature-${index}`].x}deg) rotateY(${cardRotations[`feature-${index}`].y}deg)` 
                    : 'none'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 transition-transform duration-300 hover:rotate-6 hover:scale-110">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-cyan-400 font-semibold text-base">{feature.metric}</div>
                </div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section ref={contactRef} id='contact' className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent ${
            contactVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}>
            Let's Work Together
          </h2>
          
          <div className={`bg-gray-900/40 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 transition-all duration-500 card-3d ${
            contactVisible ? 'animate-flip-from-side' : 'opacity-0'
          }`}
            data-card-id="contact-section"
            style={{
              transform: cardRotations['contact-section'] 
                ? `rotateX(${cardRotations['contact-section'].x}deg) rotateY(${cardRotations['contact-section'].y}deg)` 
                : 'none'
            }}
          >
            <p className="text-lg text-cyan-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let's discuss how I can help bring your ideas to life with cutting-edge technology and design.
            </p>
            
            <button
              onClick={handleHireMe}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold py-3 px-6 rounded-full text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 flex items-center gap-2 mx-auto group"
            >
              <Briefcase className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
              Start Your Project
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-16 px-4 bg-gradient-to-t from-gray-900/60 to-transparent border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">GODMAN</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Passionate Frontend Developer specializing in React and modern web technologies.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold text-cyan-300 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => smoothScrollToWithOffset('Home')}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-all duration-300 hover:translate-x-1 cursor-pointer text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => smoothScrollToWithOffset('about')}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-all duration-300 hover:translate-x-1 cursor-pointer text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => smoothScrollToWithOffset('projects')}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-all duration-300 hover:translate-x-1 cursor-pointer text-left"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => smoothScrollToWithOffset('skills')}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-all duration-300 hover:translate-x-1 cursor-pointer text-left"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => smoothScrollToWithOffset('contact')}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-all duration-300 hover:translate-x-1 cursor-pointer text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-base font-semibold text-cyan-300 mb-4">Services</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400 text-sm">Web Development</span></li>
                <li><span className="text-gray-400 text-sm">React Applications</span></li>
                <li><span className="text-gray-400 text-sm">UI/UX Design</span></li>
                <li><span className="text-gray-400 text-sm">Website Optimization</span></li>
                <li><span className="text-gray-400 text-sm">Mobile-First Design</span></li>
                <li><span className="text-gray-400 text-sm">API Integration</span></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-base font-semibold text-cyan-300 mb-4">Contact</h4>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">cokorie158@gmail.com</p>
                <p className="text-gray-400 text-sm">+234 703 494 1078</p>
                <p className="text-gray-400 text-sm">Lagos, Nigeria</p>
              </div>
              <div className="mt-4 p-3 bg-gray-900/40 rounded-lg border border-cyan-500/20">
                <p className="text-xs text-cyan-200 mb-1">Available for freelance</p>
                <p className="text-xs text-gray-400">Currently accepting new projects</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-cyan-500/20 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2025 Chinonso Okorie. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              "Code is poetry written in logic. Every line tells a story, every function solves a problem."
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Hire Button */}
      <button
        onClick={handleHireMe}
        className={`fixed bottom-8 right-8 z-30 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} delay-1500 flex items-center gap-2 group`}
      >
        <Briefcase className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
        CONTACT ME
      </button>
      
      {/* Contact Modal */}
      {showModal && (
    <ContactModal />
      )}
    </div>
  );
};

export default App;










