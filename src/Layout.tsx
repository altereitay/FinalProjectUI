import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Upload, History, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/Components/ui/ThemeProvider";

export default function Layout({ children, currentPageName }: { children: React.ReactNode; currentPageName: string }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* Mobile menu overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile header */}
            <header className="md:hidden sticky top-0 z-20 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="font-medium dark:text-white">SciSimplify</span>
                </div>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar navigation */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4 border-b dark:border-gray-700 flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-indigo-600" />
                    <h1 className="text-xl font-semibold dark:text-white">SciSimplify</h1>
                </div>

                <nav className="p-4 space-y-1">
                    <Link
                        to="/"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                            currentPageName === "Upload"
                                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300"
                                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <Upload size={18} />
                        <span>Upload Article</span>
                    </Link>

                    <Link
                        to="/library"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                            currentPageName === "Library"
                                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300"
                                : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <History size={18} />
                        <span>Article Library</span>
                    </Link>
                </nav>

                {/* Sidebar footer */}
                <div className="absolute bottom-0 left-0 right-0">
                    {/* Toggle Button above the separator */}
                    <div className="flex justify-center p-4">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5 text-yellow-400" />
                            ) : (
                                <Moon className="h-5 w-5 text-indigo-500" />
                            )}
                        </button>
                    </div>

                    {/* Separator and text */}
                    <div className="border-t dark:border-gray-700 px-4 py-2">
                        <p className="text-[10px] text-gray-400 text-center">
                            Making science accessible
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="md:pl-64 min-h-screen bg-white dark:bg-gray-950">
                <div className="max-w-4xl mx-auto p-4 md:p-8">{children}</div>
            </main>
        </div>
    );
}
