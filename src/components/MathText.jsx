import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathText = ({ text, className = "" }) => {
    if (!text) return null;

    try {
        // 1. Process newlines into paragraphs or breaks
        const processText = (input) => {
            // Simple markdown: **bold**, *italic*
            // AND Math: $$...$$ (block), $...$ (inline)

            // Split by $$ for blocks first
            const parts = input.split(/(\$\$[\s\S]*?\$\$)/g);

            return parts.map((part, i) => {
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    // Block Math
                    const math = part.slice(2, -2);
                    try {
                        const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
                        return <div key={i} className="my-4 flex justify-center" dangerouslySetInnerHTML={{ __html: html }} />;
                    } catch (e) {
                        console.error("Katex Block Error:", e);
                        return <code key={i} className="text-red-400">{part}</code>;
                    }
                } else {
                    // Inline text + math processing
                    return <InlineText key={i} content={part} />;
                }
            });
        };

        return <div className={`text-slate-300 leading-relaxed ${className}`}>{processText(text)}</div>;
    } catch (err) {
        console.error("MathText Crash:", err);
        return <div className="text-slate-300">{text}</div>;
    }
};

const InlineText = ({ content }) => {
    try {
        // Split by $ for inline math
        const parts = content.split(/(\$[^$\n]+\$)/g);

        return (
            <span>
                {parts.map((part, i) => {
                    if (part.startsWith('$') && part.endsWith('$')) {
                        // Inline Math
                        const math = part.slice(1, -1);
                        try {
                            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
                            return <span key={i} className="mx-1" dangerouslySetInnerHTML={{ __html: html }} />;
                        } catch (e) {
                            console.error("Katex Inline Error:", e);
                            return <code key={i} className="text-red-400">{part}</code>;
                        }
                    } else {
                        // Start of handling markdown bold
                        return <MarkdownSpan key={i} text={part} />;
                    }
                })}
            </span>
        );
    } catch (e) {
        console.error("InlineText Crash:", e);
        return <span>{content}</span>;
    }
};

const MarkdownSpan = ({ text }) => {
    // Split by ** for bold
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{part.slice(2, -2)}</strong>;
                } else {
                    // Handle newlines
                    const lines = part.split('\n');
                    return lines.map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                            {line}
                            {lineIndex < lines.length - 1 && <br />}
                        </React.Fragment>
                    ));
                }
            })}
        </>
    )
}

export default MathText;
