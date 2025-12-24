import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const specs = [
    { feature: "Agent Identity", implementation: "Codexa DIDs map 1:1 to Amadeus Agent Addresses" },
    { feature: "WASM Runtime", implementation: "Verification logic executes within isolated Amadeus WASM environments" },
    { feature: "Swarm Coordination", implementation: "P2P Credential discovery via Amadeus Swarm DHT" },
    { feature: "State Proofs", implementation: "Credential hashes anchored to L1 State Roots for lightweight verification" },
];

const Integration: React.FC = () => {
    return (
        <section className="py-24 bg-black relative border-y border-border/30">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <Cpu className="text-secondary" size={32} />
                    <h2 className="text-3xl font-bold">Built for Amadeus</h2>
                </div>

                <p className="text-muted mb-12 text-lg">
                    Codexa is not a generic solution. It is a protocol primitive designed to leverage the specific capabilities of the Amadeus blockchain.
                </p>

                <div className="bg-surface/50 border border-border rounded-lg overflow-hidden">
                    {specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex flex-col md:flex-row p-6 ${i !== specs.length - 1 ? 'border-b border-border/50' : ''} hover:bg-white/5 transition-colors`}
                        >
                            <div className="w-full md:w-1/3 font-mono text-secondary text-sm uppercase tracking-wide mb-2 md:mb-0">
                                {spec.feature}
                            </div>
                            <div className="w-full md:w-2/3 text-text/80 font-light">
                                {spec.implementation}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Integration;
