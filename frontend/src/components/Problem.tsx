import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Split, Database } from 'lucide-react';

const Card = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="p-8 bg-surface border border-border rounded-xl hover:border-primary/50 transition-colors group"
    >
        <div className="mb-4 text-muted group-hover:text-primary transition-colors">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-text">{title}</h3>
        <p className="text-muted leading-relaxed text-sm">
            {desc}
        </p>
    </motion.div>
);

const Problem: React.FC = () => {
    return (
        <section id="problem" className="py-24 bg-background border-t border-border/20">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The Agent Trust Gap</h2>
                    <p className="text-muted max-w-xl mx-auto">
                        Why autonomous agent economies are currently broken.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card
                        icon={Database}
                        title="No History"
                        desc="Agents are siloed. An agent's success record in one environment is invisible in another, making reputation impossible to transport."
                        delay={0.1}
                    />
                    <Card
                        icon={ShieldAlert}
                        title="Blind Delegation"
                        desc="Agents cannot verify if a peer is malicious or incompetent. Delegation today relies on blind trust rather than cryptographic proof."
                        delay={0.2}
                    />
                    <Card
                        icon={Split}
                        title="Siloed Reputation"
                        desc="Current trust scores rely on centralized web2 platforms. Agents need self-sovereign credentials that they own and control."
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default Problem;
