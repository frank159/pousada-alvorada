"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE, useMotion } from "../lib/motion";

// Cada raio começa perto da bolinha e termina na ponta externa,
// assim o pathLength 0 → 1 "nasce" no centro e vai para fora.
const RAYS = [
    "M19.793 26.6858 L19.793 39.6639",
    "M19.793 13.7576 L19.793 0.5",
    "M13.478 20.0552 L0.500193 19.9791",
    "M26.1174 20.1295 L39.0952 20.2056",
    "M14.9142 24.5196 L5.31872 33.2578",
    "M24.4724 15.8147 L34.2746 6.88822",
    "M15.5649 15.3862 L6.88305 5.73961",
    "M24.0261 24.7877 L32.7079 34.4343",
];

/** Linha + sol + linha, com animação de entrada ao aparecer na tela */
export default function SunRow({ className = "" }: { className?: string }) {
    const { reduce } = useMotion();

    const t = (duration: number, delay = 0) => ({
        duration: reduce ? 0.2 : duration,
        delay: reduce ? 0 : delay,
        ease: EASE,
    });

    // 1) Bolinha: de 0 a 100%
    const dot: Variants = {
        hidden: { scale: reduce ? 1 : 0 },
        show: { scale: 1, transition: t(0.6, 0.05) },
    };

    // 2) Raios: saem do centro até a posição final
    const ray: Variants = {
        hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
        show: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: t(1, 0.8 + i * 0.05),
                opacity: { duration: 0.05, delay: reduce ? 0 : 0.8 + i * 0.05 },
            },
        }),
    };

    // 3) Linhas: crescem a partir do sol em direção às bordas
    const line: Variants = {
        hidden: { scaleX: reduce ? 1 : 0 },
        show: { scaleX: 1, transition: t(1.0, 0.7) },
    };
    
    return (
        <LazyMotion features={domAnimation}>
            <m.div
                className={`flex items-center justify-center ${className}`}
                variants={{ hidden: {}, show: {} }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
            >
                <m.div
                    className="h-[1px] flex-1 bg-[#E1D5BF] origin-right"
                    variants={line}
                />

                <div className="px-4 flex-shrink-0 flex items-center justify-center relative z-10">
                    <svg
                        role="img"
                        aria-label="Ícone de Sol"
                        className="w-10 h-10 overflow-visible"
                        viewBox="0 0 40 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <m.circle
                            cx="19.7583"
                            cy="20.2219"
                            r="4.93892"
                            fill="#C08414"
                            style={{ transformBox: "fill-box", transformOrigin: "center" }}
                            variants={dot}
                        />

                        <g stroke="#C08414" strokeLinecap="round">
                            {RAYS.map((d, i) => (
                                <m.path key={d} d={d} custom={i} variants={ray} />
                            ))}
                        </g>
                    </svg>
                </div>

                <m.div
                    className="h-[1px] flex-1 bg-[#E1D5BF] origin-left"
                    variants={line}
                />
            </m.div>
        </LazyMotion>
    );
}