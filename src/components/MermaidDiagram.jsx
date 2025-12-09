import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter',
});

export default function MermaidDiagram({ code }) {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      mermaid.run({
        nodes: [ref.current],
        suppressErrors: true
      }).catch(err => console.error(err));
    }
  }, [code]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 overflow-x-auto flex justify-center"
    >
      <div className="mermaid" ref={ref}>
        {code}
      </div>
    </motion.div>
  );
}
