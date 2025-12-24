import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="py-12 border-t border-border bg-black text-center">
            <div className="flex justify-center gap-6 mb-8">
                <a href="https://github.com/GokhanCey/TheCodexa" target="_blank" rel="noopener noreferrer" className="p-3 bg-surface rounded-full hover:bg-surface/80 hover:text-primary transition-colors">
                    <Github size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-surface rounded-full hover:bg-surface/80 hover:text-secondary transition-colors">
                    <Twitter size={20} />
                </a>
            </div>
            <p className="text-muted text-sm font-mono">
                CODEXA © 2025 • Agent Credentialing & Delegation Protocol
            </p>
        </footer>
    );
}

export default Footer;
