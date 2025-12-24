import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
    const scrollToContent = () => {
        document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full blur-[120px]" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-surface border border-border text-xs font-mono text-muted mb-6 tracking-wider">
                        V1.0 PROTOCOL SPECIFICATION
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        CODEXA
                    </h1>
                    <h2 className="text-xl md:text-2xl text-muted font-light mb-8">
                        Trust & Delegation Layer for <span className="text-primary">Autonomous Agents</span>
                    </h2>
                    <p className="text-lg text-text/80 max-w-2xl mx-auto leading-relaxed mb-4">
                        Enabling agents to verify capability, earn credentials, and safely delegate tasks in decentralized ecosystems.
                    </p>
                    <p className="text-sm text-muted/60 font-mono mb-10 max-w-xl mx-auto border border-border/30 rounded px-2 py-1 bg-surface/30">
                        Protocol Standard & Reference Implementation • Not a Consumer App
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex justify-center gap-4"
                >
                    <button
                        onClick={scrollToContent}
                        className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
                    >
                        Read Protocol
                    </button>
                    <a
                        href="https://github.com/GokhanCey/TheCodexa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-border bg-surface/50 backdrop-blur text-text rounded hover:bg-surface transition-colors font-mono inline-block"
                    >
                        View on GitHub
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 animate-bounce text-muted cursor-pointer hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={scrollToContent}
            >
                <ArrowDown size={24} />
            </motion.div>
        </section>
    );
};

export default Hero;
