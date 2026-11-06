"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";
import { EASE, useMotion } from "../lib/motion";

export default function HeroSection() {
  const { reduce, variants, stagger } = useMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  const bg: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 1.08 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: reduce ? 0.2 : 2.4, ease: EASE },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        ref={ref}
        className="relative w-full h-auto min-h-[110vh] md:h-screen md:min-h-[600px] flex items-center py-24 md:py-0 overflow-hidden"
      >
        {/* Camada 1: parallax (scroll). Camada 2: entrada (fade + zoom) */}
        <m.div
          className="absolute inset-x-0 -top-[15%] -bottom-[15%] z-0"
          style={{ y: bgY, willChange: "transform" }}
        >
          <m.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/imgs/heroSection.png')" }}
            variants={bg}
            initial="hidden"
            animate="show"
          />
        </m.div>

        <m.div
          className="relative z-10 w-full max-w-4xl px-6 md:pl-16 lg:pl-44 flex flex-col gap-6 md:gap-8"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <m.div
            className="flex flex-col gap-6 md:gap-8"
            variants={stagger(0.2, 0.35)}
            initial="hidden"
            animate="show"
          >
            <m.div variants={variants.item}>
              <Title
                scriptFirstLetter={true}
                firstLetterMargin="0.1em"
                className="text-[#E1D5BF] uppercase leading-[1.15] whitespace-pre-line text-[1.4rem] sm:text-3xl md:text-5xl [&>span]:text-[2.2em] [&>span]:leading-[0] [&>span]:-ml-[0.1em]"
              >
                {"Você,\nquem você ama\ne um refúgio romântico\ncercado por natureza"}
              </Title>
            </m.div>

            <m.div
              variants={stagger(0.16, 0.05)}
              className="relative pl-4 md:pl-6 py-1 flex flex-col gap-5 md:gap-6"
            >
              <m.span
                aria-hidden
                variants={variants.lineY}
                className="absolute left-0 top-0 h-full w-px bg-[#E1D5BF]/70 origin-top"
              />

              <m.div variants={variants.item}>
                <Text className="text-[#E1D5BF] text-sm sm:text-base leading-[1.4] max-w-[420px]">
                  Desligue-se da rotina e sinta a paz de um refúgio exclusivo na serra. A
                  Pousada Alvorada conta com cabanas privativas e elegantes, com a
                  atmosfera perfeita em meio à natureza.
                </Text>
              </m.div>

              <m.div
                variants={variants.item}
                className="flex flex-row flex-nowrap gap-2 sm:gap-4 w-full"
              >
                <Button className="whitespace-nowrap text-[13px] sm:text-base px-3 sm:px-6">
                  Fazer reserva
                </Button>
                <Button className="whitespace-nowrap text-[13px] sm:text-base px-3 sm:px-6">
                  Conhecer cabanas
                </Button>
              </m.div>
            </m.div>
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
}