"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryItem {
    id: string | number;
    title: string;
    description?: string;
    image: string;
}

interface GalleryAnimationProps {
    items: GalleryItem[];
    className?: string;
    itemClassName?: string;
}

export function GalleryAnimation({
    items,
    className,
    itemClassName,
}: GalleryAnimationProps) {
    const [hoveredId, setHoveredId] = useState<string | number | null>(null);

    return (
        <div className={cn("flex w-full h-[500px] gap-2 overflow-hidden py-4", className)}>
            {items.map((item) => {
                const isHovered = hoveredId === item.id;

                return (
                    <motion.div
                        key={item.id}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={cn(
                            "relative h-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out",
                            // On desktop: expand from 1 to 4 flex units
                            // On mobile: we might want a different behavior (stack or smaller expansion)
                            "flex-[1] hover:flex-[4]",
                            itemClassName
                        )}
                        layout
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ebony-black/90 via-ebony-black/20 to-transparent" />

                        {/* Content Container */}
                        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end overflow-hidden whitespace-nowrap">
                            <motion.h3
                                className="text-xl font-bold text-gold-primary mb-1"
                                animate={{
                                    opacity: isHovered ? 1 : 0.7,
                                    y: isHovered ? 0 : 5,
                                }}
                            >
                                {item.title}
                            </motion.h3>

                            <AnimatePresence mode="wait">
                                {isHovered && item.description && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0, y: 10 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: 10 }}
                                        className="text-white/80 text-sm line-clamp-2"
                                    >
                                        {item.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Subtle glow border on hover */}
                        {isHovered && (
                            <motion.div
                                layoutId="gallery-glow"
                                className="absolute inset-0 ring-2 ring-gold-primary/30 rounded-2xl pointer-events-none"
                                initial={false}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
