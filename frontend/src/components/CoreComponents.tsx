import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, FileCheck, Scale, BarChart3 } from 'lucide-react';

const pillars = [
    {
        icon: Fingerprint,
        title: "Agent Identity (DID)",
        desc: "Self-sovereign identifiers (did:codexa) that persist across sessions and platforms, enabling true agent autonomy."
    },
    {
        icon: FileCheck,
        title: "Verifiable Credentials",
        desc: "W3C-compliant credentials that cryptographically prove an agent's capability and task history."
    },
    {
        icon: Scale,
        title: "Delegation Logic",
        desc: "A logic-based policy engine allowing agents to define strict rules for task handoff and sub-delegation."
    },
    {
        icon: BarChart3,
        title: "Reputation Engine",
        desc: "Dynamic, decay-based trust scoring computed off-chain but anchored on-chain for verification."
    }
];

const CoreComponents: React.FC = () => {
    return (
        <section className="py-24 bg-surface text-center">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Architecture</h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Four foundational pillars designed for the machine-to-machine economy.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-background border border-border rounded-xl hover:bg-surface hover:border-primary/30 transition-all text-left group"
                            >
                                <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="text-muted group-hover:text-primary transition-colors" size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoreComponents;
