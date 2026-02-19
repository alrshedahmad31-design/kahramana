"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
}

export function MagicCard({
    children,
    className,
    gradientSize = 250,
    gradientColor = "rgba(197, 160, 89, 0.15)", // Premium Gold tint
    gradientOpacity = 0.8,
    ...props
}: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    // Smooth out the movement
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const { left, top } = cardRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        },
        [mouseX, mouseY]
    );

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        // Move out of view
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    };

    const background = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${springX}px ${springY}px, ${gradientColor}, transparent 80%)`;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative flex size-full overflow-hidden rounded-xl border border-white/5 bg-ebony-darker text-white",
                className
            )}
            {...props}
        >
            {/* Spotlight Layer */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background,
                    opacity: isHovered ? gradientOpacity : 0,
                }}
            />

            {/* Content Layer */}
            <div className="relative z-10 w-full">{children}</div>

            {/* Subtle border shine effect */}
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/5 group-hover:border-gold-muted/20 transition-colors duration-500" />
        </div>
    );
}
