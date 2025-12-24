import Hero from './components/Hero';
import Problem from './components/Problem';
import CoreComponents from './components/CoreComponents';
import ProtocolFlow from './components/ProtocolFlow';
import Integration from './components/Integration';
import DemoCase from './components/DemoCase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30">
      <main className="w-full">
        <Hero />
        <Problem />
        <CoreComponents />
        <ProtocolFlow />
        <Integration />
        <DemoCase />
      </main>
      <Footer />
    </div>
  );
}

export default App;
