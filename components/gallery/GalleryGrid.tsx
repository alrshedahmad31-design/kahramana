"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryItem {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className={cn(
                        "group relative overflow-hidden rounded-3 border-1 border-white/10 bg-muted shadow-1",
                        item.className
                    )}
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-10 hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={item.priority}
                    />

                    {/* Sophisticated Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-3" />

                    {/* Premium Info Tag */}
                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-[transform,opacity] duration-4">
                        <span className="inline-block px-4 py-1.5 rounded-pill bg-gold/10 backdrop-blur-md border-1 border-gold/20 text-gold fs-100 fontWeight-black uppercase tracking-widest mb-2">
                            Kahramana Gallery
                        </span>
                        <h3 className="text-white fontWeight-black fs-500 leading-tight lg:fs-600">
                            {item.alt}
                        </h3>
                    </div>

                    {/* Corner Glow Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-pill opacity-0 group-hover:opacity-100 transition-opacity duration-5 -mr-16 -mt-16" />
                </motion.div>
            ))}
        </div>
    );
}
