"use client";

import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const VIEWPORT = { once: true, amount: 0.2 } as const;

export type RevealKind = "item" | "fade" | "curtain" | "sun" | "lineX" | "lineY";

export function useMotion() {
    const reduce = !!useReducedMotion();

    return useMemo(() => {
        const tr = (duration: number, delay = 0) => ({
            duration: reduce ? 0.2 : duration,
            delay: reduce ? 0 : delay,
            ease: EASE,
        });

        const variants: Record<RevealKind, Variants> = {
            item: {
                hidden: { opacity: 0, y: reduce ? 0 : 28 },
                show: { opacity: 1, y: 0, transition: tr(1.3) },
            },
            fade: {
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: tr(1.6) },
            },
            
            curtain: {
                hidden: { clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
                show: { clipPath: "inset(0% 0% 0% 0%)", transition: tr(1.7) },
            },
            sun: {
                hidden: { opacity: 0, scale: reduce ? 1 : 0.6, rotate: reduce ? 0 : -45 },
                show: { opacity: 1, scale: 1, rotate: 0, transition: tr(1.4) },
            },
            lineX: {
                hidden: { scaleX: reduce ? 1 : 0 },
                show: { scaleX: 1, transition: tr(1.6, 0.2) },
            },
            lineY: {
                hidden: { scaleY: reduce ? 1 : 0 },
                show: { scaleY: 1, transition: tr(1.6, 0.5) },
            },
        };

        const stagger = (gap = 0.12, delay = 0): Variants => ({
            hidden: {},
            show: {
                transition: {
                    staggerChildren: reduce ? 0 : gap,
                    delayChildren: reduce ? 0 : delay,
                },
            },
        });

        return { reduce, variants, stagger };
    }, [reduce]);
}

export function Stagger({
    children,
    className,
    gap,
    delay,
}: {
    children: ReactNode;
    className?: string;
    gap?: number;
    delay?: number;
}) {
    const { stagger } = useMotion();
    return (
        <m.div
            className={className}
            variants={stagger(gap, delay)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
        >
            {children}
        </m.div>
    );
}

export function Reveal({
    children,
    className,
    kind = "item",
    standalone = false,
}: {
    children?: ReactNode;
    className?: string;
    kind?: RevealKind;
    standalone?: boolean;
}) {
    const { variants } = useMotion();
    const trigger = standalone
        ? ({ initial: "hidden", whileInView: "show", viewport: VIEWPORT } as const)
        : {};

    return (
        <m.div className={className} variants={variants[kind]} {...trigger}>
            {children}
        </m.div>
    );
}

/** Cortina de entrada + parallax no scroll, em um único componente */
export function CurtainImage({
    children,
    className = "absolute inset-0",
    range = 8,
}: {
    children: ReactNode;
    className?: string;
    range?: number; 
}) {
    const ref = useRef<HTMLDivElement>(null);   
    const { reduce, variants } = useMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        reduce ? ["0%", "0%"] : [`-${range}%`, `${range}%`]
    );

    return (
        
        <m.div
            ref={ref}
            className={className}
            variants={{ hidden: {}, show: {} }}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
        >
            {/* Camada 2: a cortina (clip-path) */}
            <m.div className="absolute inset-0 overflow-hidden" variants={variants.curtain}>
                {/* Camada 3: parallax contínuo */}
                <m.div
                    className="absolute inset-0"
                    style={{ y, scale: reduce ? 1 : 1.2, willChange: "transform" }}
                >
                    {children}
                </m.div>
            </m.div>
        </m.div>
    );
}