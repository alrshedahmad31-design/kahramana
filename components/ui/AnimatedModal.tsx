"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
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
            {open ? (
                <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-[var(--space-4)]">
                    <motion.button
                        type="button"
                        aria-label="Close modal"
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className={cn(
                            "relative z-[calc(var(--z-modal)+1)] w-full max-w-2xl overflow-hidden rounded-[var(--radius-3xl)] border-[var(--border-thin)] border-white/10 bg-[var(--bg-primary)] shadow-[var(--shadow-3)]",
                            className
                        )}
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute right-[var(--space-4)] top-[var(--space-4)] z-[calc(var(--z-modal)+2)] inline-flex h-[var(--space-12)] w-[var(--space-12)] items-center justify-center rounded-pill bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                            aria-label="Close"
                        >
                            <Icon name="close" size="sm" />
                        </button>
                        {children}
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>
    );
}

export function ModalContent({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("p-[var(--space-6)]", className)}>{children}</div>;
}

export function ModalFooter({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mt-[var(--space-8)] flex justify-end gap-[var(--space-4)]", className)}>
            {children}
        </div>
    );
}
