import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Upload, History, Menu, X } from "lucide-react";

export default function Layout({ children, currentPageName }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile menu overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile header */}
            <header className="md:hidden sticky top-0 z-20 border-b bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="font-medium">SciSimplify</span>
                </div>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1 rounded-md hover:bg-gray-100"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar navigation */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <div className="p-4 border-b flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-indigo-600" />
                    <h1 className="text-xl font-semibold">SciSimplify</h1>
                </div>

                <nav className="p-4 space-y-1">
                    <Link
                        to='/'
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                            currentPageName === "Upload"
                                ? "bg-indigo-50 text-indigo-700"
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <Upload size={18} />
                        <span>Upload Article</span>
                    </Link>

                    <Link
                        to='/library'
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                            currentPageName === "Library"
                                ? "bg-indigo-50 text-indigo-700"
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <History size={18} />
                        <span>Article Library</span>
                    </Link>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <p className="text-xs text-gray-500 text-center">
                        Making science accessible
                    </p>
                </div>
            </aside>

            {/* Main content */}
            <main className="md:pl-64 min-h-screen">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}