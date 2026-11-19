"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ImageSlideshowProps = {
    images: string[];
    alt: string;
    sizes: string;
    /** Tempo entre trocas, em ms */
    interval?: number;
    /** Duração do fade, em ms */
    fadeDuration?: number;
    /** Imagem inicial (útil para dois exibidores não mostrarem a mesma foto) */
    startIndex?: number;
    /** Permite trocar ao clicar */
    interactive?: boolean;
    /** Mostra os indicadores (bolinhas) embaixo */
    showDots?: boolean;
    className?: string;
    imageClassName?: string;
};

export default function ImageSlideshow({
    images,
    alt,
    sizes,
    interval = 2000,
    fadeDuration = 700,
    startIndex = 0,
    interactive = true,
    showDots = false,
    className = "",
    imageClassName = "",
}: ImageSlideshowProps) {
    const total = images.length;
    const [index, setIndex] = useState(total ? startIndex % total : 0);
    const canSwitch = total > 1;

    const next = useCallback(() => {
        setIndex((i) => (i + 1) % total);
    }, [total]);

    // Depende de `index`: ao clicar, o timer é reiniciado
    useEffect(() => {
        if (!canSwitch) return;
        const id = setTimeout(next, interval);
        return () => clearTimeout(id);
    }, [index, canSwitch, interval, next]);

    if (!total) return null;

    const clickable = interactive && canSwitch;

    return (
        <div
            className={`absolute inset-0 overflow-hidden ${clickable ? "cursor-pointer" : ""} ${className}`}
            onClick={clickable ? next : undefined}
            onKeyDown={
                clickable
                    ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              next();
                          }
                      }
                    : undefined
            }
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            aria-label={clickable ? "Próxima foto" : undefined}
        >
            {images.map((src, i) => (
                <Image
                    key={src}
                    src={src}
                    alt={`${alt} ${i + 1}`}
                    fill
                    sizes={sizes}
                    aria-hidden={i !== index}
                    style={{ transitionDuration: `${fadeDuration}ms` }}
                    className={`object-cover transition-opacity ease-in-out ${
                        i === index ? "opacity-100" : "opacity-0"
                    } ${imageClassName}`}
                />
            ))}

            {showDots && canSwitch && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Ir para foto ${i + 1}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIndex(i);
                            }}
                            className={`h-1.5 rounded-full transition-all ${
                                i === index
                                    ? "w-6 bg-[#E1D5BF]"
                                    : "w-1.5 bg-[#E1D5BF]/40"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}