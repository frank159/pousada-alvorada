"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Title from "./Title";

type PhotoGalleryProps = {
    open: boolean;
    onClose: () => void;
    images: string[];
    title: string;
    startIndex?: number;
};

export default function PhotoGallery({ open, onClose, ...rest }: PhotoGalleryProps) {
    if (!open || typeof document === "undefined") return null;

    return createPortal(<GalleryDialog onClose={onClose} {...rest} />, document.body);
}

function GalleryDialog({
    onClose,
    images,
    title,
    startIndex = 0,
}: Omit<PhotoGalleryProps, "open">) {
    const total = images.length;

    const [index, setIndex] = useState(() =>
        Math.min(Math.max(startIndex, 0), Math.max(total - 1, 0))
    );
    const [visible, setVisible] = useState(false);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const startXRef = useRef(0);

    const isFirst = index === 0;
    const isLast = index === total - 1;

    const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
    const next = useCallback(
        () => setIndex((i) => Math.min(total - 1, i + 1)),
        [total]
    );

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus?.();
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                prev();
            } else if (e.key === "ArrowRight") {
                next();
            } else if (e.key === "Tab") {
                const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
                );
                if (!focusables?.length) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose, prev, next]);

    useEffect(() => {
        thumbRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    }, [index]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (total < 2) return;
        startXRef.current = e.clientX;
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging) return;
        let dx = e.clientX - startXRef.current;
        if ((isFirst && dx > 0) || (isLast && dx < 0)) dx *= 0.35;
        setDragX(dx);
    };

    const handlePointerEnd = () => {
        if (!dragging) return;
        const width = viewportRef.current?.offsetWidth ?? 300;
        const threshold = Math.min(80, width * 0.2);

        if (dragX < -threshold) next();
        else if (dragX > threshold) prev();

        setDragging(false);
        setDragX(0);
    };

    if (!total) return null;

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Fotos - ${title}`}
            className={`fixed inset-0 z-[100] flex flex-col overscroll-contain bg-[#1A0D0A] text-[#E1D5BF] transition-opacity duration-300 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
        >
            <header className="flex items-center justify-between gap-3 px-5 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
                {/* min-w-0 deixa o título encolher em vez de empurrar o X para fora;
                    o tamanho da fonte acompanha a largura da tela para nunca quebrar linha */}
                <div className="min-w-0 flex-1">
                    <Title
                        scriptFirstLetter={true}
                        firstLetterMargin="0.1em"
                        className="whitespace-nowrap leading-[1.1] [&>span]:text-[2em] text-[clamp(1rem,5.5vw,1.75rem)]"
                    >
                        {title}
                    </Title>
                </div>

                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar galeria"
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#E1D5BF]/60 transition-colors hover:bg-[#E1D5BF]/10"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M5 5l14 14M19 5L5 19" />
                    </svg>
                </button>
            </header>

            <div className="relative min-h-0 flex-1">
                <div
                    ref={viewportRef}
                    className="absolute inset-0 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerEnd}
                    onPointerCancel={handlePointerEnd}
                >
                    <div
                        className="flex h-full motion-reduce:transition-none"
                        style={{
                            transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
                            transition: dragging
                                ? "none"
                                : "transform 400ms cubic-bezier(0.22, 0.61, 0.36, 1)",
                        }}
                    >
                        {images.map((src, i) => (
                            <div
                                key={src}
                                className="h-full w-full shrink-0 md:px-20 md:py-4"
                                aria-hidden={i !== index}
                            >
                                <div className="relative h-full w-full">
                                    {Math.abs(i - index) <= 1 && (
                                        <Image
                                            src={src}
                                            alt={`${title} - foto ${i + 1} de ${total}`}
                                            fill
                                            sizes="100vw"
                                            priority={i === index}
                                            draggable={false}
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <span
                    aria-live="polite"
                    className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 bg-[#1A0D0A]/70 px-3 py-1 text-xs tabular-nums text-[#E1D5BF]/90"
                >
                    {index + 1} / {total}
                </span>

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prev}
                            disabled={isFirst}
                            aria-label="Foto anterior"
                            className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#E1D5BF]/60 bg-[#1A0D0A]/60 transition hover:bg-[#E1D5BF]/10 disabled:opacity-30 md:flex"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M15 5l-7 7 7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            disabled={isLast}
                            aria-label="Próxima foto"
                            className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#E1D5BF]/60 bg-[#1A0D0A]/60 transition hover:bg-[#E1D5BF]/10 disabled:opacity-30 md:flex"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {total > 1 && (
                <footer className="px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                    <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="mx-auto flex w-max gap-2">
                            {images.map((src, i) => (
                                <button
                                    key={src}
                                    ref={(el) => {
                                        thumbRefs.current[i] = el;
                                    }}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    aria-label={`Ir para foto ${i + 1}`}
                                    aria-current={i === index}
                                    className={`relative h-14 w-14 shrink-0 overflow-hidden border transition ${
                                        i === index
                                            ? "border-[#E1D5BF] opacity-100"
                                            : "border-transparent opacity-50 hover:opacity-80"
                                    }`}
                                >
                                    <Image
                                        src={src}
                                        alt=""
                                        fill
                                        sizes="56px"
                                        draggable={false}
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}