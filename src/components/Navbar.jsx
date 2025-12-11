import { Link, useLocation } from 'react-router-dom';
import { BookOpen, FileQuestion, Home } from 'lucide-react';
import clsx from 'clsx';

function NavLink({ to, icon: Icon, label }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                isActive ? "bg-primary text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
        >
            <Icon size={18} />
            <span>{label}</span>
        </Link>
    );
}

export default function Navbar() {
    return (
        <nav className="border-b border-slate-800 bg-background/50 backdrop-blur sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    CV Master
                </Link>

                <div className="flex items-center gap-2">
                    <NavLink to="/" icon={Home} label="Units" />
                    <NavLink to="/pyq" icon={FileQuestion} label="PYQs" />
                    <NavLink to="/master-pyqs" icon={BookOpen} label="Master Bank" />
                </div>
            </div>
        </nav>
    );
}
