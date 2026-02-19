"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Play, Clock, Users, Flame } from "lucide-react";
import { MagicCard } from "@/components/ui/MagicCard";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from "@/components/ui/AnimatedModal";

interface RecipeItem {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
}

export default function RecipeCard({ recipe, locale, labels, className }: {
  recipe: RecipeItem;
  locale: string;
  labels: { prep_time: string; cook_time: string; minutes: string; watch: string };
  className?: string;
}) {
  const name = locale === "ar" ? recipe.name.ar : recipe.name.en;
  const description = locale === "ar" ? recipe.description.ar : recipe.description.en;

  return (
    <Modal>
      <ModalTrigger className="h-full">
        <MagicCard
          className={cn("flex flex-col h-full", className)}
          gradientColor="rgba(197, 160, 89, 0.1)"
        >
          <article className="flex flex-col h-full">
            <div className="relative h-60 overflow-hidden rounded-t-xl">
              <Image
                src={`/${recipe.image}`}
                alt={name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width:768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-ebony-black/20 group-hover:bg-transparent transition-all duration-300" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="size-14 rounded-full flex items-center justify-center bg-gold-primary shadow-[0_0_20px_rgba(197,160,89,0.5)]">
                  <Play size={20} fill="var(--bg-primary)" className="ml-1 text-ebony-black" />
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-white group-hover:text-gold-primary transition-colors duration-300">
                  {name}
                </h3>
                <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/5 text-[11px] font-bold text-white/50 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gold-primary" />
                  {recipe.prepTime + recipe.cookTime} {labels.minutes}
                </span>
                <span className="flex items-center gap-1.5 border-l border-white/10 pl-4">
                  <Users size={14} className="text-gold-primary" />
                  {recipe.servings}
                </span>
              </div>
            </div>
          </article>
        </MagicCard>
      </ModalTrigger>

      <ModalBody>
        <ModalContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={`/${recipe.image}`}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-primary/10 text-gold-primary text-[10px] font-bold uppercase tracking-widest mb-3">
                  <Flame size={12} fill="currentColor" />
                  {locale === "ar" ? "طبق مميز" : "Signature Dish"}
                </span>
                <h2 className="text-3xl font-black text-white">{name}</h2>
              </div>

              <p className="text-white/70 leading-relaxed italic">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] uppercase text-white/40 mb-1">{labels.prep_time}</span>
                  <span className="text-lg font-bold text-white">{recipe.prepTime} {labels.minutes}</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] uppercase text-white/40 mb-1">{labels.cook_time}</span>
                  <span className="text-lg font-bold text-white">{recipe.cookTime} {labels.minutes}</span>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <button
            className="px-6 py-2 rounded-xl bg-gold-primary text-ebony-black font-bold text-sm hover:opacity-90 transition-opacity"
            onClick={() => {
              // Implementation for 'Order Now' or 'Add to Cart' would go here
              console.log("Ordering...", recipe.id);
            }}
          >
            {locale === "ar" ? "اطلب الآن" : "Order Now"}
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
