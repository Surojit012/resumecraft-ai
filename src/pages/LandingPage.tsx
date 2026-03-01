import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Text, PresentationControls, RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, LayoutTemplate, PenTool, Download } from 'lucide-react';
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
                Build a Job-Ready <br />
                <span className="text-indigo-600">Resume in 60 Seconds.</span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Our AI writes and formats your resume. Choose a premium template, bypass the ATS, and apply with confidence—no formatting stress required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/build"
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  Build My Resume Now
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/templates"
                  className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  View Templates
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>ATS-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>AI Handles Writing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Premium Templates</span>
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

      {/* Trust / Social Proof Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-slate-500 font-medium">
            <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-indigo-600" /> Designed for real job applications</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-indigo-600" /> ATS-friendly formatting</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-indigo-600" /> Recruiter-ready layouts</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-indigo-600" /> Built for speed</div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">Three steps to your next job</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 z-10 relative">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enter your experience</h3>
              <p className="text-slate-600">Provide your basic job history.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-[-50%] w-full h-[2px] bg-indigo-100 z-0" />
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 z-10 relative">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI writes and formats</h3>
              <p className="text-slate-600">Our AI generates targeted bullet points.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-[-50%] w-full h-[2px] bg-indigo-100 z-0" />
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 z-10 relative">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Download and apply</h3>
              <p className="text-slate-600">Get a clean PDF instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Focus on benefits, not formatting</h2>
            <p className="text-slate-600">Everything you need to secure interviews faster.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="mb-4"><Sparkles className="w-8 h-8 text-indigo-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Writes and Optimizes Your Resume for You</h3>
              <p className="text-slate-600">Skip the blank page. Our AI generates professional, targeted bullet points instantly.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="mb-4"><Download className="w-8 h-8 text-indigo-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Download a Clean, Recruiter-Ready PDF Instantly</h3>
              <p className="text-slate-600">Get a perfectly formatted PDF with one click. No weird margins or broken layouts.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="mb-4"><LayoutTemplate className="w-8 h-8 text-indigo-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Premium Templates That Stand Out</h3>
              <p className="text-slate-600">Use designs proven to catch a recruiter's eye and pass automated tracking systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Free Section */}
      <section className="py-24 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start building for free</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-12">
            Free for now. Premium templates included. No hidden friction.
          </p>
          <Link
            to="/build"
            className="inline-flex px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-xl items-center justify-center gap-2 text-lg"
          >
            Build My Resume Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
