/**
 * Design System Constants
 * Synchronized with styles/tokens.css
 */

export const COLORS = {
    gold: "var(--color-gold)",
    saddle: "var(--color-saddle)",
    coffee: "var(--color-coffee)",
    walnut: "var(--color-walnut)",
} as const;

export const MOTION = {
    // Spring configurations matching --spring-* tokens
    spring: {
        stiff: 300,
        damp: 30,
        mass: 1,
    },
    // Durations matching --dur-* tokens
    durations: {
        fast: 0.1,
        base: 0.2,
        slow: 0.3,
        extraSlow: 0.5,
    },
    // Easings matching --ease-* tokens
    easing: [0.4, 0, 0.2, 1], // Standard easing
} as const;
