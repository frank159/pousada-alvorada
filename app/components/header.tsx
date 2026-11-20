"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Cabanas", href: "#cabanas" },
    { name: "Cestas", href: "#cestas" },
    { name: "O que fazer", href: "#o-que-fazer" },
    { name: "Contato", href: "#contato" },
];

const mobileNavLinks = [
    { name: "Home", href: "#home" },
    { name: "Cabanas", href: "#cabanas" },
    { name: "O que fazer", href: "#o-que-fazer" },
    { name: "Cestas", href: "#cestas" },
    { name: "Contato", href: "#contato" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const [headerHeight, setHeaderHeight] = useState(64);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;

        const update = () => setHeaderHeight(el.getBoundingClientRect().height);
        update();

        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        const targetId = href.replace("#", "");

        if (targetId === "home") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            closeMenu();
            return;
        }

        const elem = document.getElementById(targetId);

        if (elem) {
            const headerOffset = headerRef.current?.offsetHeight ?? 64;
            const elementPosition = elem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }

        closeMenu();
    };

    const menuVariants = {
        closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
        },
        open: {
            height: `calc(100dvh - ${headerHeight}px)`,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    } satisfies Variants;

    const itemVariants = {
        closed: { y: -20, opacity: 0 },
        open: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    } satisfies Variants;

    return (
        <>
            <header
                ref={headerRef}
                className={`font-alata font-light fixed top-0 left-0 z-100 w-full border-b transition-all duration-300 ease-in-out ${isScrolled || isMenuOpen
                    ? "border-[#E1D5BF]/10  backdrop-blur-md"
                    : "border-transparent bg-transparent"
                    }`}
            >
                {/* Mobile: logo à esquerda e menu à direita.
            Desktop: logo | menu centralizado | espaço vazio (mantém o menu no centro real) */}
                <div
                    className={`flex items-center justify-between px-6 transition-[height] duration-300 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-10 ${isScrolled
                        ? "h-12 md:h-14 lg:h-16"
                        : "h-16 md:h-20 lg:h-24"
                        }`}
                >
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, "#home")}
                        className="flex items-center justify-self-start"
                    >
                        <Image
                            src="/imgs/logo.png"
                            alt="Alvorada"
                            width={160}
                            height={40}
                            priority
                            className={`h-auto object-contain transition-[width] duration-300 ${isScrolled
                                ? "w-28 md:w-32 lg:w-36"
                                : "w-32 md:w-36 lg:w-40"
                                }`}
                        />
                    </a>

                    <nav
                        aria-label="Principal"
                        className="hidden items-center gap-10 md:flex lg:gap-16 xl:gap-24"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="relative cursor-pointer text-sm uppercase tracking-wide text-white transition-colors duration-300 hover:text-[#C8911F] lg:text-base
                  after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#C8911F] after:transition-transform after:duration-300 hover:after:scale-x-100"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:block" aria-hidden="true" />

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative z-101 flex h-11 w-11 items-center justify-center text-[#E1D5BF] outline-none transition-colors hover:text-[#C8911F] focus-visible:text-[#C8911F] md:hidden"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        style={{ top: headerHeight }}
                        className="font-alata fixed left-0 z-90 w-full overflow-hidden backdrop-blur-xl md:hidden"
                    >
                        <nav aria-label="Menu mobile" className="flex h-full w-full flex-col items-center">
                            {mobileNavLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    variants={itemVariants}
                                    className="flex w-full flex-1 cursor-pointer items-center justify-center border-t border-[#E1D5BF]/15 first:border-t-0 text-center text-lg uppercase tracking-[0.2em] text-[#E1D5BF] transition-colors duration-300 hover:text-[#C8911F]"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}