import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Text, PresentationControls, RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, LayoutTemplate, PenTool } from 'lucide-react';
import * as THREE from 'three';

function Keycap({ position, color, label, subLabel, labelColor = "black" }: { position: [number, number, number], color: string, label: string, subLabel?: string, labelColor?: string }) {
  return (
    <group position={position}>
      {/* Key Base */}
      <RoundedBox args={[0.9, 0.9, 0.5]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </RoundedBox>
      
      {/* Main Label */}
      <Text
        position={[0, subLabel ? 0.1 : 0, 0.26]}
        fontSize={0.4}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Sub Label (for Command key) */}
      {subLabel && (
        <Text
          position={[0, -0.25, 0.26]}
          fontSize={0.12}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
        >
          {subLabel}
        </Text>
      )}
    </group>
  );
}

function Cable() {
  const path = useMemo(() => {
    const points = [];
    // Start from the back of the device
    points.push(new THREE.Vector3(0.5, 0.8, -0.2));
    // Curve up and out
    points.push(new THREE.Vector3(0.5, 1.5, -0.5));
    points.push(new THREE.Vector3(1.5, 2.0, -1.0));
    points.push(new THREE.Vector3(3.0, 2.5, -1.5));
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[path, 64, 0.08, 8, false]} />
      <meshStandardMaterial color="#333" roughness={0.6} />
    </mesh>
  );
}

function MacroPad() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.rotation.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.x = 0.4 + Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} rotation={[0.4, -0.4, 0]}>
        {/* Main Case Body */}
        <RoundedBox args={[3.6, 1.4, 0.4]} radius={0.2} smoothness={8}>
          <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.6} />
        </RoundedBox>

        {/* Inner Bed (Black part) */}
        <RoundedBox args={[3.2, 1.0, 0.1]} radius={0.1} smoothness={4} position={[0, 0, 0.2]}>
          <meshStandardMaterial color="#111" roughness={0.8} />
        </RoundedBox>

        {/* Keys Group */}
        <group position={[0, 0, 0.25]}>
          {/* Key 1: Command (Orange) */}
          <Keycap position={[-1.05, 0, 0]} color="#ff4500" label="⌘" subLabel="Command" labelColor="white" />
          
          {/* Key 2: C (White) */}
          <Keycap position={[0, 0, 0]} color="#f5f5f5" label="C" labelColor="#333" />
          
          {/* Key 3: V (White) */}
          <Keycap position={[1.05, 0, 0]} color="#f5f5f5" label="V" labelColor="#333" />
        </group>

        {/* Cable */}
        <Cable />
      </group>
    </Float>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white z-0" />
        
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pt-12 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>AI-Powered Resume Builder</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Craft Your Career <br />
                <span className="text-indigo-600">Story in 3D</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Build professional, ATS-friendly resumes in minutes with our AI assistant. 
                Choose from stunning templates and stand out from the crowd.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/templates"
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  Create My Resume
                  <ArrowRight size={20} />
                </Link>
                <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">
                  View Examples
                </button>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>ATS-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>AI Writing Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>PDF Download</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
            <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
              <ambientLight intensity={0.7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Environment preset="studio" />
              
              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <MacroPad />
              </PresentationControls>
              
              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to get hired</h2>
            <p className="text-slate-600">Our platform provides all the tools necessary to create a compelling resume that gets past applicant tracking systems.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Writing Assistant",
                description: "Generate professional summaries and bullet points tailored to your job role.",
                icon: <Sparkles className="w-8 h-8 text-indigo-600" />
              },
              {
                title: "Professional Templates",
                description: "Choose from a variety of modern, clean, and professional designs.",
                icon: <LayoutTemplate className="w-8 h-8 text-indigo-600" />
              },
              {
                title: "Real-time Editing",
                description: "See your changes instantly as you type with our live preview editor.",
                icon: <PenTool className="w-8 h-8 text-indigo-600" />
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
