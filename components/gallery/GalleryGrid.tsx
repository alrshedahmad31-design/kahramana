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
                        "group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ebony-darker shadow-inner",
                        item.className
                    )}
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={item.priority}
                    />

                    {/* Sophisticated Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Premium Info Tag */}
                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gold-primary/10 backdrop-blur-md border border-gold-primary/20 text-gold-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                            Kahramana Gallery
                        </span>
                        <h3 className="text-white font-black text-lg leading-tight lg:text-xl">
                            {item.alt}
                        </h3>
                    </div>

                    {/* Corner Glow Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -mr-16 -mt-16" />
                </motion.div>
            ))}
        </div>
    );
}
