"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalContextProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within a ModalProvider");
    return context;
};

export function Modal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalContext.Provider>
    );
}

export function ModalTrigger({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { setOpen } = useModal();
    return (
        <div
            className={cn("cursor-pointer", className)}
            onClick={() => setOpen(true)}
        >
            {children}
        </div>
    );
}

export function ModalBody({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { open, setOpen } = useModal();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-ebony-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "relative z-50 w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-3xl border border-white/10 bg-ebony-darker shadow-2xl",
                            className
                        )}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                        >
                            <X className="size-5" />
                        </button>

                        <div className="p-8">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function ModalContent({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export function ModalFooter({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mt-8 flex justify-end gap-4", className)}>
            {children}
        </div>
    );
}
