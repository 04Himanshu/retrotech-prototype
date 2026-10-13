import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDUSTRIES_DATA, type IndustryItem } from '../data/retrotechData';
import {
  ArrowUpRight,
  Building2,
  Factory,
  Film,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Layers,
  X,
  Activity,
  Cpu,
  Server,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface IndustriesSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

interface BlueprintMetric {
  label: string;
  value: string;
  sub: string;
}

interface ArchitectureNode {
  title: string;
  role: string;
  tech: string;
}

interface EnrichedDomain extends IndustryItem {
  specLine: string;
  colorBg: string;
  accentColor: string;
  categoryTag: 'Commerce' | 'Real Estate' | 'Manufacturing' | 'Healthcare' | 'Media' | 'Fintech';
  metrics: string;
  capabilities: string[];
  blueprintSummary: string;
  telemetryMetrics: BlueprintMetric[];
  architectureNodes: ArchitectureNode[];
  complianceBadge: string;
}

const DOMAINS: EnrichedDomain[] = [
  {
    ...INDUSTRIES_DATA[0],
    specLine: 'CONCEPT • HEADLESS COMMERCE • SHOPIFY PLUS • MULTIVENDOR • AUTOMATION',
    colorBg: '#0F1420',
    accentColor: '#3B82F6',
    categoryTag: 'Commerce',
    metrics: '+148% Checkout Velocity',
    capabilities: ['Next.js Commerce', 'Algolia AI Search', 'Stripe Orchestration', 'SAP Sync'],
    blueprintSummary:
      'High-velocity enterprise headless commerce ecosystem built for premier retail brands and multi-vendor networks. Incorporates global edge rendering, sub-second vector search, multi-currency Stripe orchestration, and automated ERP delta synchronization.',
    telemetryMetrics: [
      { label: 'Checkout Velocity', value: '+148%', sub: 'Sub-900ms one-click checkout' },
      { label: 'Time-to-First-Byte', value: '42ms', sub: 'Global Cloudflare Edge SSR' },
      { label: 'Catalogue Capacity', value: '3.2M SKUs', sub: 'Real-time delta synchronization' },
      { label: 'Availability SLA', value: '99.995%', sub: 'Zero-downtime flash sale clustering' },
    ],
    architectureNodes: [
      { title: 'Edge Ingress', role: 'Global DNS & Edge CDN', tech: 'Cloudflare Workers' },
      { title: 'Storefront Tier', role: 'Headless Web Application', tech: 'Next.js 15 App Router' },
      { title: 'Discovery Engine', role: 'Neural AI Search & Vector Index', tech: 'Algolia Vector Search' },
      { title: 'Transaction Core', role: 'Payment & Cart Orchestrator', tech: 'Stripe Billing & Customs' },
      { title: 'Back-Office ERP', role: 'Inventory & Order Ledger', tech: 'SAP S/4HANA / Shopify Plus' },
    ],
    complianceBadge: 'PCI-DSS LEVEL 1 & SOC2 COMPLIANT',
  },
  {
    ...INDUSTRIES_DATA[1],
    specLine: '3D ARCHITECTURE • BIM MODELING • CRM • VIRTUAL TOURS • DIGITAL TWINS',
    colorBg: '#1B1510',
    accentColor: '#F59E0B',
    categoryTag: 'Real Estate',
    metrics: '3.4x Lead Engagement',
    capabilities: ['WebGL Masterplans', 'Matterport API', 'Broker Lead Scoring', 'Inventory Sync'],
    blueprintSummary:
      'Immersive digital architectural showcases featuring interactive WebGL masterplans, Matterport 3D digital twins, predictive broker lead scoring, and automated unit inventory reservations for premier property developers.',
    telemetryMetrics: [
      { label: 'Buyer Engagement', value: '3.4x', sub: 'Extended virtual walkthrough sessions' },
      { label: 'Rendering Latency', value: '60 FPS', sub: 'Hardware-accelerated WebGL pipeline' },
      { label: 'Asset Volume', value: '$320M+', sub: 'Active inventory value tracked' },
      { label: 'Lead Velocity', value: '2.1x', sub: 'Automated CRM broker dispatch' },
    ],
    architectureNodes: [
      { title: 'Viewport Layer', role: '3D Spatial Visualizer', tech: 'Three.js / WebGL 2.0' },
      { title: 'Twin Pipeline', role: 'Point-Cloud & BIM Streamer', tech: 'Matterport SDK & USDZ' },
      { title: 'Lead Engine', role: 'Algorithmic Intent Scoring', tech: 'Python AI Lead Predictor' },
      { title: 'Broker Gateway', role: 'Real-Time Inventory Lock', tech: 'PostgreSQL Realtime Sync' },
    ],
    complianceBadge: 'ENTERPRISE MLS & GDPR COMPLIANT',
  },
  {
    ...INDUSTRIES_DATA[2],
    specLine: 'IOT TELEMETRY • ERPNEXT • PREDICTIVE AI • SUPPLY CHAIN • DIGITAL TWIN',
    colorBg: '#0F1A15',
    accentColor: '#10B981',
    categoryTag: 'Manufacturing',
    metrics: '42% Downtime Reduction',
    capabilities: ['MQTT Telemetry', 'ERPNext Integration', 'Predictive Maintenance', 'MES Dashboard'],
    blueprintSummary:
      'Enterprise operations suite monitoring shop-floor telemetry, predictive machinery maintenance, and automated supply procurement across industrial manufacturing hubs with unified ERPNext integration.',
    telemetryMetrics: [
      { label: 'Downtime Reduction', value: '42%', sub: 'Predictive machinery pre-alerts' },
      { label: 'Telemetry Stream', value: '18k msg/s', sub: 'Low-latency MQTT broker sync' },
      { label: 'Anomaly Precision', value: '99.8%', sub: 'Edge ML vibration classification' },
      { label: 'PLC Sync Latency', value: '<8ms', sub: 'Industrial Modbus / OPC-UA' },
    ],
    architectureNodes: [
      { title: 'Edge Gateways', role: 'Factory Floor Ingestion', tech: 'OPC-UA / MQTT Mosquitto' },
      { title: 'Time-Series Core', role: 'High-Throughput Metric Vault', tech: 'InfluxDB & TimescaleDB' },
      { title: 'Predictive AI', role: 'Anomaly Detection Models', tech: 'PyTorch Edge Inference' },
      { title: 'Enterprise MES', role: 'Resource & Work-Order Ops', tech: 'ERPNext Manufacturing Hub' },
    ],
    complianceBadge: 'ISO 27001 & ISA-95 INDUSTRIAL GRADE',
  },
  {
    ...INDUSTRIES_DATA[3],
    specLine: 'HIPAA COMPLIANCE • WEBRTC VIDEO • EHR INTEGRATION • TELEHEALTH SUITE',
    colorBg: '#0E1A1E',
    accentColor: '#06B6D4',
    categoryTag: 'Healthcare',
    metrics: '250k+ Consultations',
    capabilities: ['WebRTC Encrypted Calls', 'HL7/FHIR Protocol', 'Biometric Auth', 'E-Prescription'],
    blueprintSummary:
      'Secure, HIPAA-compliant patient consultation portal integrating encrypted WebRTC video, digitized EHR access, prescription delivery, biometric authentication, and automated clinical availability scheduling.',
    telemetryMetrics: [
      { label: 'Consultations', value: '250k+', sub: 'Zero dropped session fidelity' },
      { label: 'Security Standard', value: '100%', sub: 'HIPAA & HITECH certified' },
      { label: 'Encryption Grade', value: 'AES-256', sub: 'End-to-end media and EHR data' },
      { label: 'Onboarding Speed', value: '1.2s', sub: 'FIDO2 Biometric authentication' },
    ],
    architectureNodes: [
      { title: 'Patient / MD Client', role: 'Cross-Platform React App', tech: 'WebRTC Peer Engine' },
      { title: 'TURN/STUN Mesh', role: 'Low-Latency Media Relays', tech: 'LiveKit Global Cluster' },
      { title: 'Interoperability', role: 'Clinical Protocol Gateway', tech: 'HL7 v2 & FHIR R4 Bridge' },
      { title: 'EHR Security Vault', role: 'Zero-Knowledge Encrypted DB', tech: 'PostgreSQL Row-Level Security' },
    ],
    complianceBadge: 'HIPAA CERTIFIED & SOC2 TYPE II',
  },
  {
    ...INDUSTRIES_DATA[4],
    specLine: 'HIGH CONCURRENCY • VIDEO CDN • SUBSCRIPTION • CREATOR CMS • WEBGL',
    colorBg: '#171224',
    accentColor: '#8B5CF6',
    categoryTag: 'Media',
    metrics: '1.8M Concurrency',
    capabilities: ['HLS Video Streaming', 'Stripe Billing Rails', 'Edge CDN Caching', 'Interactive Chat'],
    blueprintSummary:
      'Scalable content management, video distribution network, and creator subscription monetisation platform designed for high-concurrency live audiences and interactive streaming broadcasts.',
    telemetryMetrics: [
      { label: 'Peak Concurrency', value: '1.8M', sub: 'Simultaneous viewer sessions' },
      { label: 'Broadcast Latency', value: '<1.4s', sub: 'Low-Latency HLS (LL-HLS)' },
      { label: 'Paywall Throughput', value: '12k txn/m', sub: 'Stripe Global Tokenized Rails' },
      { label: 'Edge Availability', value: '99.999%', sub: 'Multi-CDN failover architecture' },
    ],
    architectureNodes: [
      { title: 'Ingest Tier', role: 'SRT / RTMP Transcoding Grid', tech: 'FFmpeg Edge Transcoders' },
      { title: 'Distribution CDN', role: 'Multi-Region Caching Mesh', tech: 'Fastly & AWS CloudFront' },
      { title: 'Real-Time Chat', role: 'High-Concurrency PubSub', tech: 'Redis Streams & WebSockets' },
      { title: 'Monetization Hub', role: 'Subscription & Digital Rights', tech: 'Widevine DRM & Stripe' },
    ],
    complianceBadge: 'HOLLYWOOD DRM & ISO 27001',
  },
  {
    ...INDUSTRIES_DATA[5],
    specLine: 'BANK-GRADE SECURITY • WEALTH SUITE • KYC AUDIT • SOC2 • ZERO-TRUST',
    colorBg: '#121424',
    accentColor: '#6366F1',
    categoryTag: 'Fintech',
    metrics: '$1.4B+ Assets Managed',
    capabilities: ['SOC2 Type II Vault', 'Real-Time Ledger', 'Automated KYC/AML', 'Zero-Trust Cloud'],
    blueprintSummary:
      'Bank-grade client onboarding, wealth reporting dashboards, secure document vaults, distributed ledger orchestration, and stringent regulatory compliance tailored for fintech and investment advisories.',
    telemetryMetrics: [
      { label: 'Assets Managed', value: '$1.4B+', sub: 'Audited custodial tracking' },
      { label: 'Security Breaches', value: '0.00', sub: 'Zero-trust micro-segmented cloud' },
      { label: 'Trade Execution', value: '8ms', sub: 'Ultra-low latency settlement' },
      { label: 'KYC Verification', value: '98.4%', sub: 'Automated biometric audit pass' },
    ],
    architectureNodes: [
      { title: 'Security Perimeter', role: 'Identity & Zero-Trust Auth', tech: 'Okta & Cloudflare Access' },
      { title: 'Transaction Gateway', role: 'High-Speed Ledger Engine', tech: 'Go Microservices Cluster' },
      { title: 'Cryptographic Vault', role: 'HSM Key Management', tech: 'AWS CloudHSM & Vault' },
      { title: 'Compliance Engine', role: 'Real-Time AML / KYC Screening', tech: 'Chainalysis & ComplyAdvantage' },
    ],
    complianceBadge: 'SOC2 TYPE II & PCI-DSS CERTIFIED',
  },
];

// Lightweight High-Performance Cipher Text Scrambler Hook
const useTextScramble = (text: string, isTriggered: boolean) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isTriggered) return;

    let iteration = 0;
    const chars = '!<>-_\\/[]{}—=+*^?#';
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '•') return char;
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 3;
      if (iteration >= text.length) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [text, isTriggered]);

  return isTriggered ? displayText : text;
};


// =========================================================================
// 1. SEAMLESS SPATIAL BLUEPRINT MODAL (Theatrical Curtain & Morphing Origin)
// =========================================================================
const LusionBlueprintModal: React.FC<{
  domain: EnrichedDomain | null;
  onClose: () => void;
  onOpenConsultation?: () => void;
}> = ({ domain, onClose, onOpenConsultation }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {domain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* 1. Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0D13]/85 backdrop-blur-2xl"
          />

          {/* 2. THEATRICAL CURTAIN REVEALS & DIGITAL WIPE */}
          {/* Layer 1: Dark Onyx Curtain Blade */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0E1017] origin-top pointer-events-none z-[60]"
          />

          {/* Layer 2: Brand Indigo Curtain Blade with Glowing Accent Edge */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#353788] origin-top pointer-events-none z-[61]"
            style={{
              borderBottom: `3px solid ${domain.accentColor}`,
              boxShadow: `0 12px 36px ${domain.accentColor}55`,
            }}
          />

          {/* Layer 3: Split Theatrical Iris / Mask Curtains (Left & Right Parting) */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-1/2 h-full bg-[#111319] origin-left pointer-events-none z-[62] border-r border-white/10"
          />
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-1/2 h-full bg-[#111319] origin-right pointer-events-none z-[62] border-l border-white/10"
          />

          {/* 3. SPATIAL MORPHING CONTAINER (Continuous Spatial Awareness via shared layoutId) */}
          <motion.div
            layoutId={`blueprint-card-${domain.id}`}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-[#111319] border border-white/10 rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)] z-10 my-auto text-white"
            style={{
              boxShadow: `0 32px 80px rgba(0,0,0,0.8), 0 0 80px ${domain.accentColor}25`,
            }}
          >
            {/* Top Bar Navigation */}
            <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: domain.accentColor }}
                />
                <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-white/70">
                  ARCHITECTURE BLUEPRINT &bull; {domain.categoryTag}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
                  {domain.complianceBadge}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-10 space-y-10 max-h-[75vh] overflow-y-auto">
              {/* Header Showcase Stage with Morphed Elements */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <motion.span
                    layoutId={`blueprint-metric-${domain.id}`}
                    className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20 inline-block"
                    style={{ backgroundColor: `${domain.accentColor}33`, color: domain.accentColor }}
                  >
                    {domain.metrics}
                  </motion.span>

                  <motion.h3
                    layoutId={`blueprint-title-${domain.id}`}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
                  >
                    {domain.name}
                  </motion.h3>

                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {domain.blueprintSummary}
                  </p>
                </div>

                {/* Morphed Image Stage */}
                <motion.div
                  layoutId={`blueprint-image-wrap-${domain.id}`}
                  className="lg:col-span-5 relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
                >
                  <motion.img
                    layoutId={`blueprint-image-${domain.id}`}
                    src={domain.image}
                    alt={domain.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                    <span>SPEC: {domain.specLine.slice(0, 32)}...</span>
                    <Sparkles className="w-3.5 h-3.5 text-white/60" />
                  </div>
                </motion.div>
              </div>

              {/* Production Telemetry Benchmarks */}
              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" style={{ color: domain.accentColor }} />
                  <span>Production SLA &amp; Telemetry Benchmarks</span>
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {domain.telemetryMetrics.map((met, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="text-2xl font-mono font-extrabold text-white mb-1">
                        {met.value}
                      </div>
                      <div className="text-xs font-semibold text-white/90">
                        {met.label}
                      </div>
                      <div className="text-[11px] text-white/40 mt-1 leading-snug">
                        {met.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Architecture Topology */}
              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-2">
                  <Server className="w-3.5 h-3.5" style={{ color: domain.accentColor }} />
                  <span>Distributed Pipeline Topology</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {domain.architectureNodes.map((node, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-white/40">NODE 0{i + 1}</span>
                          <Cpu className="w-3 h-3 text-white/30" />
                        </div>
                        <div className="text-xs font-bold text-white leading-snug">
                          {node.title}
                        </div>
                        <div className="text-[10px] text-white/50 mt-1">
                          {node.role}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-white/80 truncate">
                        {node.tech}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-white/50 font-mono">Stack:</span>
                  {domain.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/80"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onClose();
                      if (onOpenConsultation) {
                        onOpenConsultation();
                      } else {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#8A8DF8] text-[#111319] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Initiate Architecture Discovery</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ========================// =========================================================================
// 2. ACTIVE FULL CARD STAGE (Single Prominent Showcase - No Bundling)
// =========================================================================
const ActiveFullCard: React.FC<{
  domain: EnrichedDomain;
  originalIndex: number;
  onSelect: () => void;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}> = ({ domain, originalIndex, onSelect, onCursorChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerStageRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrambledSpec = useTextScramble(domain.specLine, isHovered);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerStageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    innerStageRef.current.style.transform = `perspective(1000px) rotateX(${-yPct * 6}deg) rotateY(${xPct * 6}deg)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '0.35';
      glareRef.current.style.background = `radial-gradient(circle 350px at ${(xPct + 0.5) * 100}% ${(yPct + 0.5) * 100}%, rgba(255, 255, 255, 0.45), transparent 75%)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (innerStageRef.current) {
      innerStageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
    onCursorChange?.('default');
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4" />;
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'Factory': return <Factory className="w-4 h-4" />;
      case 'Stethoscope': return <Stethoscope className="w-4 h-4" />;
      case 'Film': return <Film className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onCursorChange?.('hover', 'BLUEPRINT');
      }}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer select-none shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
    >
      <div
        ref={innerStageRef}
        style={{
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-[#0F1420] transform-gpu"
      >
        {/* Full-Bleed Artwork Image */}
        <img
          src={domain.image}
          alt={domain.name}
          className="absolute inset-0 w-full h-full object-cover transform-gpu scale-105 transition-transform duration-700 ease-out"
          loading="eager"
        />

        {/* Ambient Gradient Color Wash */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            background: `radial-gradient(circle at 75% 25%, ${domain.accentColor}, transparent 70%)`,
          }}
        />

        {/* Film Noir Scrim Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 pointer-events-none" />

        {/* Dynamic Specular Light Glare */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-200 rounded-2xl md:rounded-3xl opacity-0"
        />

        {/* Full Card Content Stage */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white z-20"
        >
          {/* Top Bar: Metric Pill & Category Tag */}
          <div className="flex items-center justify-between gap-3">
            <div className="bg-white/95 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#171717] shadow-lg flex items-center gap-2 border border-black/5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: domain.accentColor }}
              />
              <span className="tracking-tight">{domain.metrics}</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border border-white/20 text-white shadow-sm"
                style={{ backgroundColor: `${domain.accentColor}66` }}
              >
                {domain.categoryTag}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-sm">
                {getIcon(domain.iconName)}
              </div>
            </div>
          </div>

          {/* Bottom Section: Poster Typography (Stripe "Annual letter 2025" style) */}
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="text-[11px] font-mono font-semibold tracking-widest text-white/70 uppercase truncate">
              {scrambledSpec}
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/60 block mb-1">
                VERTICAL 0{originalIndex + 1} &bull; ARCHITECTURE
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08] drop-shadow-sm">
                {domain.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl line-clamp-2 md:line-clamp-3">
              {domain.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
              <div className="flex flex-wrap items-center gap-2">
                {domain.capabilities.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                  }}
                  className="px-4 py-2 rounded-full bg-white hover:bg-[#F3F4F6] text-[#171717] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>View Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#353788]" />
                </button>

                <div
                  className="w-7 h-5 rounded-sm transform -skew-x-[18deg] shadow-md flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: domain.accentColor }}
                  title="Enterprise Architecture Standard"
                >
                  <div className="w-2.5 h-2 bg-white/90 rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2B. QUEUED CARD SLIVER (Right Side Lineup Waiting to Enter Stage)
// =========================================================================
const QueuedCardSliver: React.FC<{
  domain: EnrichedDomain;
  originalIndex: number;
  onClick: () => void;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}> = ({ domain, originalIndex, onClick, onCursorChange }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShoppingCart': return <ShoppingCart className="w-3.5 h-3.5" />;
      case 'Building2': return <Building2 className="w-3.5 h-3.5" />;
      case 'Factory': return <Factory className="w-3.5 h-3.5" />;
      case 'Stethoscope': return <Stethoscope className="w-3.5 h-3.5" />;
      case 'Film': return <Film className="w-3.5 h-3.5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-3.5 h-3.5" />;
      default: return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onCursorChange?.('hover', 'NEXT')}
      onMouseLeave={() => onCursorChange?.('default')}
      className="group relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer select-none border border-white/15 hover:border-white/40 bg-[#0F1420] shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <img
        src={domain.image}
        alt={domain.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-110 group-hover:scale-105"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />

      {/* Sliver Content */}
      <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between items-center z-10 pointer-events-none">
        {/* Top: Original Domain Number */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-[11px] font-mono font-bold shadow-sm group-hover:border-white/50 transition-colors">
          0{originalIndex + 1}
        </div>

        {/* Vertical Title & Category */}
        <div
          className="flex items-center gap-2 select-none py-4"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/70">
            {domain.categoryTag}
          </span>
          <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white truncate max-h-[220px]">
            {domain.name}
          </span>
        </div>

        {/* Bottom: Icon disc with accent glow */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white border border-white/20 shadow-sm transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${domain.accentColor}99` }}
        >
          {getIcon(domain.iconName)}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. MAIN SPECIALIZED DOMAINS SECTION (Right-to-Left Rotating Queue)
// =========================================================================
export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onCursorChange,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBlueprint, setActiveBlueprint] = useState<EnrichedDomain | null>(null);
  const [queue, setQueue] = useState<EnrichedDomain[]>(() => [...DOMAINS]);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState<boolean>(false);

  const categories = [
    'All',
    'Commerce',
    'Real Estate',
    'Manufacturing',
    'Healthcare',
    'Media',
    'Fintech',
  ];

  // Rotate Right-to-Left: Front card slides out and joins the end of the queue
  const handleNext = () => {
    setQueue((prev) => {
      if (prev.length <= 1) return prev;
      return [...prev.slice(1), prev[0]];
    });
  };

  // Reverse rotation: Last card from right queue steps up to the front
  const handlePrev = () => {
    setQueue((prev) => {
      if (prev.length <= 1) return prev;
      return [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)];
    });
  };

  // Click any card in the right queue to promote it to the full stage
  const handleSelectFromQueue = (selectedId: string) => {
    setQueue((prev) => {
      const targetIdx = prev.findIndex((d) => d.id === selectedId);
      if (targetIdx <= 0) return prev;
      return [...prev.slice(targetIdx), ...prev.slice(0, targetIdx)];
    });
  };

  // Filter selection: bring chosen category directly to the active stage
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setQueue([...DOMAINS]);
    } else {
      const target = DOMAINS.find((d) => d.categoryTag === cat);
      if (target) {
        const others = DOMAINS.filter((d) => d.id !== target.id);
        setQueue([target, ...others]);
      }
    }
  };

  // Automatic one-by-one right-to-left card scrolling with 4.5s delay
  useEffect(() => {
    if (isAutoPlayPaused || activeBlueprint !== null || queue.length <= 1) {
      return;
    }

    const AUTO_PLAY_DELAY = 1800;
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(timer);
  }, [isAutoPlayPaused, activeBlueprint, queue.length]);

  const activeCard = queue[0];
  const queuedCards = queue.slice(1);
  const originalActiveIndex = DOMAINS.findIndex((d) => d.id === activeCard.id);
  const displayIndex = originalActiveIndex >= 0 ? originalActiveIndex + 1 : 1;
  const progressPercent = Math.round((displayIndex / DOMAINS.length) * 100);

  return (
    <section
      id="industries"
      className="py-12 sm:py-16 md:py-20 bg-[#FAFAF8] border-b border-[#E8E8E8] relative overflow-hidden"
    >
      {/* Crisp Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full border-x border-[#E8E8E8]/40 flex justify-between">
          <div className="w-[1px] h-full bg-[#E8E8E8]/30 hidden md:block" />
          <div className="w-[1px] h-full bg-[#E8E8E8]/30 hidden lg:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
                04 &bull; Specialized Domains
              </span>
              <div className="w-10 h-[1px] bg-[#353788]/60" />
              <span className="text-[10px] tracking-widest uppercase text-[#737373] font-mono flex items-center gap-1.5">
                <span>Enterprise Architectures</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.05]">
              Industries We <br />
              <span className="font-serif italic font-normal text-[#353788]">
                Power &amp; Transform
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-4 max-w-md">
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed md:text-right">
              Every vertical demands specialized security standards, transactional velocity, and distinct workflow logic. Hover or click any card to inspect production architecture blueprints.
            </p>

            {/* Stripe-Style Carousel Navigation Bar */}
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#E8E8E8] shadow-sm">
              {/* Slide index counter */}
              <span className="font-mono text-xs font-bold text-[#171717] tracking-wider select-none">
                0{displayIndex} <span className="text-[#A3A3A3]">/</span> 0{DOMAINS.length}
              </span>

              {/* Dynamic progress bar */}
              <div className="w-20 sm:w-28 h-1 bg-[#E8E8E8] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#353788] rounded-full"
                  style={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Prev / Next circular buttons */}
              <div className="flex items-center gap-1.5 pl-1 border-l border-[#E8E8E8]">
                <button
                  onClick={handlePrev}
                  aria-label="Previous industry"
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E8E8E8] text-[#171717] hover:bg-[#171717] hover:text-white hover:border-[#171717] shadow-sm active:scale-95 cursor-pointer transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next industry"
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E8E8E8] text-[#171717] hover:bg-[#171717] hover:text-white hover:border-[#171717] shadow-sm active:scale-95 cursor-pointer transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters & Auto-Advance Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#E8E8E8]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'bg-white text-[#737373] border border-[#E8E8E8] hover:text-[#171717] hover:border-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-xs font-mono text-[#737373] hidden sm:flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isAutoPlayPaused ? 'bg-[#F59E0B]' : 'bg-[#10B981] animate-pulse'
              }`}
            />
            <span>
              {isAutoPlayPaused
                ? 'Queue Paused \u2022 Click any card'
                : 'Revolving Queue (1.8s) \u2022 Hover to Pause'}
            </span>
          </div>
        </div>

        {/* Stripe-Style Revolving Queue: Full Card on Left & Queue on Right */}
        <div className="relative mb-10">
          <div
            data-lenis-prevent
            onMouseEnter={() => setIsAutoPlayPaused(true)}
            onMouseLeave={() => setIsAutoPlayPaused(false)}
            onTouchStart={() => setIsAutoPlayPaused(true)}
            onTouchEnd={() => {
              const t = setTimeout(() => setIsAutoPlayPaused(false), 2000);
              return () => clearTimeout(t);
            }}
            className="flex items-stretch gap-2.5 sm:gap-3 md:gap-4 h-[510px] sm:h-[550px] md:h-[590px] w-full overflow-hidden py-2 px-1"
          >
            {/* 1. LEFT STAGE: Only ONE card takes place as full (Never bundles on left) */}
            <div className="w-full sm:w-[58%] md:w-[62%] lg:w-[66%] shrink-0 h-full">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, x: 50, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.9, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <ActiveFullCard
                    domain={activeCard}
                    originalIndex={DOMAINS.findIndex((d) => d.id === activeCard.id)}
                    onSelect={() => setActiveBlueprint(activeCard)}
                    onCursorChange={onCursorChange}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 2. RIGHT STAGE: Upcoming cards waiting in queue */}
            <div className="hidden sm:flex flex-1 items-stretch gap-2.5 sm:gap-3 md:gap-4 h-full overflow-hidden">
              <AnimatePresence initial={false}>
                {queuedCards.map((dom) => (
                  <motion.div
                    key={dom.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, x: 25 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -25 }}
                    transition={{ duration: 0.28, ease: [0.2, 0.9, 0.3, 1] }}
                    className="flex-1 min-w-[54px] sm:min-w-[68px] md:min-w-[80px] lg:min-w-[92px] h-full"
                  >
                    <QueuedCardSliver
                      domain={dom}
                      originalIndex={DOMAINS.findIndex((d) => d.id === dom.id)}
                      onClick={() => handleSelectFromQueue(dom.id)}
                      onCursorChange={onCursorChange}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Tailored Architecture Banner */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#171717] text-white border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#353788]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A8DF8] font-bold">
              Tailored Architecture Discovery
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Operating in a niche or unlisted industry?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              We architect custom, compliance-certified digital solutions tailored precisely to your unique market positioning and regulatory workflows.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenConsultation || (() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              })}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#8A8DF8] text-[#171717] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span>Schedule Architecture Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Seamless Architecture Blueprint Inspection Modal */}
      <LusionBlueprintModal
        domain={activeBlueprint}
        onClose={() => setActiveBlueprint(null)}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
};
