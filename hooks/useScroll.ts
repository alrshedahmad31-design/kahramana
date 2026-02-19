"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to track scroll position and return a boolean if the page is scrolled beyond a threshold.
 * @param threshold - The number of pixels to scroll before the 'scrolled' state becomes true.
 * @returns boolean - true if scroll position is greater than threshold.
 */
export function useScroll(threshold: number = 8) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > threshold);

        // Check initial scroll position
        fn();

        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, [threshold]);

    return scrolled;
}
