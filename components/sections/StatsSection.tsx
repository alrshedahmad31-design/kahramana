"use client";

import React, { useEffect, useState } from "react";
import { MagicCard } from "@/components/ui/MagicCard";
import Icon from "@/components/ui/Icon";
import NumberTicker from "@/components/ui/NumberTicker";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

interface CountUpProps {
    value: string;
    delay?: number;
}

function CountUp({ value, delay = 0 }: CountUpProps) {
    // Extract numeric part and suffix
    const numericMatch = value.match(/(\d+(\.\d+)?)/);
    const numericPart = numericMatch ? parseFloat(numericMatch[0]) : 0;
    const suffix = value.replace(/[\d\.]/g, '').replace('+', '');
    const prefix = value.startsWith('+') ? '+' : '';

    return (
        <span className="inline-flex items-baseline">
            {prefix && <span>{prefix}</span>}
            <NumberTicker value={numericPart} delay={delay} />
            {suffix && <span>{suffix}</span>}
        </span>
    );
}

interface StatItemProps {
    num: string;
    label: string;
    icon: string;
    index: number;
}

function StatItem({ num, label, icon, index }: StatItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
        >
            <MagicCard
                className="group flex flex-col items-center justify-center p-[var(--space-6)] text-center h-full min-h-[var(--space-14)] relative overflow-hidden"
                gradientSize={150}
            >
                <BorderBeam size={100} duration={12} delay={index * 2} />
                {/* Decorative Background Glow */}
                <div className="absolute -top-10 -right-10 w-[var(--space-10)] h-[var(--space-10)] bg-[var(--color-gold)]/5 blur-3xl rounded-pill group-hover:bg-[var(--color-gold)]/10 transition-colors duration-[var(--motion-slow)]" />

                {/* Icon Container with Glassmorphism */}
                <div className="relative mb-[var(--space-3)]">
                    <div className="w-[var(--space-9)] h-[var(--space-9)] rounded-[var(--radius-2)] bg-white/5 backdrop-blur-sm border-[var(--border-thin)] border-white/10 flex items-center justify-center text-[var(--color-gold)] shadow-[var(--shadow-2)] transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-[var(--motion-slow)]">
                        <Icon name={icon} size="xs" />
                    </div>
                    {/* Pulsing ring around icon */}
                    <div className="absolute inset-0 rounded-[var(--radius-2)] border-[var(--border-thin)] border-[var(--color-gold)]/20 animate-ping opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>

                <div className="space-y-[var(--space-2)] relative z-[var(--z-base)]">
                    <span className="section-title-gold text-[var(--fs-800)] md:text-[var(--fs-900)] font-black block tracking-tighter">
                        <CountUp value={num} delay={0.2 + (index * 0.1)} />
                    </span>
                    <span className="text-[var(--fs-100)] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-80 group-hover:opacity-100 group-hover:text-white transition-[opacity,color] duration-[var(--motion-slow)]">
                        {label}
                    </span>
                </div>
            </MagicCard>
        </motion.div>
    );
}

interface StatsSectionProps {
    t: {
        years_num: string;
        years_label: string;
        dishes_num: string;
        dishes_label: string;
        branches_num: string;
        branches_label: string;
        rating_num: string;
        rating_label: string;
    };
    className?: string;
}

export default function StatsSection({ t, className }: StatsSectionProps) {
    const stats = [
        { num: t.years_num, label: t.years_label, icon: "history" },
        { num: t.dishes_num, label: t.dishes_label, icon: "restaurant" },
        { num: t.branches_num, label: t.branches_label, icon: "location_on" },
        { num: t.rating_num, label: t.rating_label, icon: "stars" },
    ];

    return (
        <section className={cn("py-[var(--space-8)] px-[var(--container-pad)]", className)}>
            <div className="grid grid-cols-2 gap-[var(--space-4)] max-w-2xl mx-auto">
                {stats.map((stat, i) => (
                    <StatItem
                        key={i}
                        index={i}
                        num={stat.num}
                        label={stat.label}
                        icon={stat.icon}
                    />
                ))}
            </div>
        </section>
    );
}
