import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileBadge, Link, ShieldCheck } from 'lucide-react';

const steps = [
    { icon: CheckCircle, title: "Task Completion", desc: "Agent performs work" },
    { icon: ShieldCheck, title: "Verification", desc: "Validator attests result" },
    { icon: FileBadge, title: "Issuance", desc: "Verifiable Credential created" },
    { icon: Link, title: "Anchoring", desc: "State Proof on Amadeus L1" },
];

const ProtocolFlow: React.FC = () => {
    return (
        <section className="py-24 bg-surface/30 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-primary font-mono text-sm tracking-wider uppercase">Protocol Logic</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">The Verification Lifecycle</h2>
                </motion.div>

                <div className="relative">
                    {/* Connector Line */}
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-border hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative z-10"
                                >
                                    <div className="w-24 h-24 bg-background border border-border rounded-full flex items-center justify-center mb-6 mx-auto hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                        <Icon className="text-primary" size={32} />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                        <p className="text-sm text-muted">{step.desc}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProtocolFlow;
