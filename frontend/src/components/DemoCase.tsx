import React from 'react';
import { motion } from 'framer-motion';
import { Building2, UserCog, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';

const DemoCase: React.FC = () => {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Use Case: Compliance Cascade</h2>
                    <p className="text-muted">Autonomous delegation in action.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 overflow-x-auto p-4">

                    {/* DAO */}
                    <Step icon={Building2} label="DAO Protocol" sub="Taskmaster" color="text-white" />

                    <Arrow />

                    {/* Orchestrator */}
                    <Step icon={UserCog} label="Orchestrator Agent" sub="Project Manager" color="text-primary" />

                    <Arrow />

                    {/* Sub-Agent */}
                    <Step icon={UserCheck} label="Agent Beta" sub="Specialist (Gas Audit)" color="text-secondary" />

                    <div className="h-0.5 w-12 bg-border hidden md:block" />

                    {/* Outcome */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="bg-surface border border-primary/50 p-6 rounded-xl flex items-center gap-4"
                    >
                        <ShieldCheck className="text-primary" size={32} />
                        <div className="text-left">
                            <div className="text-sm font-bold text-primary">VERIFIED</div>
                            <div className="text-xs text-muted">Credential Issued</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const Step = ({ icon: Icon, label, sub, color }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center bg-surface border border-border p-6 rounded-xl w-48 text-center"
    >
        <Icon className={`${color} mb-3`} size={32} />
        <h4 className="font-semibold text-sm">{label}</h4>
        <span className="text-xs text-muted mt-1">{sub}</span>
    </motion.div>
);

const Arrow = () => (
    <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 'auto', opacity: 1 }}
        viewport={{ once: true }}
        className="hidden md:block text-muted/30"
    >
        <ArrowRight size={24} />
    </motion.div>
);

export default DemoCase;
