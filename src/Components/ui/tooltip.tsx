import { useState, createContext, useContext, cloneElement, ReactNode } from "react";

// Define the shape of the context
interface TooltipContextType {
    open: boolean;
    setOpen: (value: boolean) => void;
    delayDuration: number;
}

// Create context with default values
const TooltipContext = createContext<TooltipContextType>({
    open: false,
    setOpen: () => {},
    delayDuration: 0,
});

export function TooltipProvider({ children, delayDuration = 0 }: { children: ReactNode; delayDuration?: number }) {
    return (
        <>{children}</>
    );
}

export function Tooltip({ children, delayDuration = 0 }: { children: ReactNode; delayDuration?: number }) {
    const [open, setOpen] = useState(false);

    return (
        <TooltipContext.Provider value={{ open, setOpen, delayDuration }}>
            <div className="relative inline-block">
                {children}
            </div>
        </TooltipContext.Provider>
    );
}

export function TooltipTrigger({ children, asChild = false }: { children: ReactNode; asChild?: boolean }) {
    const { setOpen, delayDuration } = useContext(TooltipContext);
    let timeout: NodeJS.Timeout;

    const handleMouseEnter = () => {
        timeout = setTimeout(() => setOpen(true), delayDuration);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeout);
        setOpen(false);
    };

    if (asChild && children && typeof children === "object") {
        return cloneElement(children as any, {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        });
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="cursor-help"
        >
            {children}
        </div>
    );
}

export function TooltipContent({ children, className = "" }: { children: ReactNode; className?: string }) {
    const { open } = useContext(TooltipContext);

    if (!open) return null;

    return (
        <div
            className={`absolute z-50 w-72 p-4 bg-white rounded-lg shadow-lg text-gray-800 text-sm left-1/2 -translate-x-1/2 top-full mt-2 border animate-fade-in ${className}`}
        >
            {children}
        </div>
    );
}
