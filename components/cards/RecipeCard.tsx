"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
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
          gradientColor="var(--spotlight-gold)"
        >
          <article className="flex flex-col h-full">
            <div className="relative h-60 overflow-hidden rounded-t-1">
              <Image
                src={`/${recipe.image}`}
                alt={name}
                fill
                className="object-cover object-top transition-transform duration-5 hover:scale-110"
                sizes="(max-width:768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-[background-color] duration-3" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-3">
                <div className="size-14 rounded-pill flex items-center justify-center bg-gold shadow-1">
                  <Icon name="play_arrow" filled className="text-coffee" />
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="space-y-2">
                <h3 className="fontWeight-black fs-500 text-white group-hover:text-gold transition-colors duration-3">
                  {name}
                </h3>
                <p className="fs-300 text-white/60 line-clamp-2 leading-tight">
                  {description}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-4 pt-4 border-t-1 border-white/5 fs-100 fontWeight-black text-white/50 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Icon name="schedule" size="xs" className="text-gold" />
                  {recipe.prepTime + recipe.cookTime} {labels.minutes}
                </span>
                <span className="flex items-center gap-1.5 border-l-1 border-white/10 pl-4">
                  <Icon name="groups" size="xs" className="text-gold" />
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
            <div className="relative aspect-square rounded-2 overflow-hidden border border-white/10">
              <Image
                src={`/${recipe.image}`}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-gold/10 text-gold fs-100 fontWeight-black uppercase tracking-widest mb-3">
                  <Icon name="local_fire_department" size="xs" filled />
                  {locale === "ar" ? "طبق مميز" : "Signature Dish"}
                </span>
                <h2 className="fs-800 fontWeight-black text-white">{name}</h2>
              </div>

              <p className="text-white/70 leading-relaxed italic">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-1 bg-white/5 border-1 border-white/10">
                  <span className="block fs-100 uppercase text-white/40 mb-1">{labels.prep_time}</span>
                  <span className="fs-500 fontWeight-black text-white">{recipe.prepTime} {labels.minutes}</span>
                </div>
                <div className="p-4 rounded-1 bg-white/5 border-1 border-white/10">
                  <span className="block fs-100 uppercase text-white/40 mb-1">{labels.cook_time}</span>
                  <span className="fs-500 fontWeight-black text-white">{recipe.cookTime} {labels.minutes}</span>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <button
            className="px-6 py-2 rounded-1 bg-gold text-coffee fontWeight-black fs-400 hover:opacity-90 transition-opacity duration-2 shadow-1"
            onClick={() => {
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
