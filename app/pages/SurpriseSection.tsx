"use client";

import { useRef } from "react";
import Image from "next/image";
import {
    LazyMotion,
    domAnimation,
    m,
    useScroll,
    useTransform,
} from "framer-motion";
import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";
import { Reveal, Stagger, CurtainImage, useMotion } from "../lib/motion";

const title =
    "Aproveite nosso espaço para surpreender ainda mais quem você ama";

const paragraphs = [
    "Seja para comemorar um aniversário, um pedido especial ou apenas celebrar o amor, montamos cestas surpresa personalizadas com vinhos, iguarias locais e um delicado buquê de flores.",
    "Aproveite a beleza do nosso espaço para fazer um piquenique romântico e surpreenda seu amor.",
];

const titleClasses =
    "leading-[1.1] [&>span]:text-[2em] uppercase [&>span]:leading-[0] pb-3 md:pb-0";

export default function SurpriseSection() {
    const { reduce } = useMotion();
    const ref = useRef<HTMLElement>(null);

    // Parallax suave no fundo enquanto a seção cruza a tela
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(
        scrollYProgress,
        [0, 1],
        reduce ? ["0%", "0%"] : ["-6%", "6%"]
    );

    return (
        <LazyMotion features={domAnimation} strict>
            <section
                ref={ref}
                className="relative w-full overflow-hidden flex items-center lg:py-32 lg:min-h-[80vh]"
            >
                {/* Fundo: parallax (scroll) + fade de entrada */}
                <m.div
                    className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
                    style={{ y: bgY, willChange: "transform" }}
                >
                    <Reveal kind="fade" standalone className="absolute inset-0">
                        <Image
                            src="/imgs/surpresa01.png"
                            alt="Cenário de piquenique ao ar livre"
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </Reveal>
                </m.div>

                <div className="absolute inset-0 bg-[#1F0905] lg:bg-transparent" />

                {/* ===================== MOBILE ===================== */}
                <Stagger
                    className="relative z-10 w-full px-6 py-12 flex flex-col gap-6 lg:hidden"
                    gap={0.12}
                >
                    <Reveal>
                        <Title
                            scriptFirstLetter={true}
                            firstLetterMargin="0.1em"
                            className={`${titleClasses}`}
                        >
                            {title}
                        </Title>
                    </Reveal>

                    <div className="grid grid-cols-2 gap-4 items-start">
                        <div className="flex flex-col gap-6">
                            {paragraphs.map((p) => (
                                <Reveal key={p}>
                                    <Text className="text-sm">{p}</Text>
                                </Reveal>
                            ))}
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="relative w-full aspect-[7/10] overflow-hidden">
                                <CurtainImage>
                                    <Image
                                        src="/imgs/surpresa02.png"
                                        alt="Detalhes da cesta de piquenique com queijos, vinhos e frutas"
                                        fill
                                        sizes="50vw"
                                        className="object-cover"
                                    />
                                </CurtainImage>
                            </div>

                            <Reveal className="w-full whitespace-nowrap [&>button]:w-full [&>button]:whitespace-nowrap">
                                <Button>Encomendar cesta</Button>
                            </Reveal>
                        </div>
                    </div>
                </Stagger>

                {/* ===================== DESKTOP ===================== */}
                <div className="relative z-10 w-full max-w-7xl ml-65 px-6 md:px-12 hidden lg:block">
                    <div className="flex flex-row items-start gap-8 lg:gap-16">
                        {/* Imagem: caixa com fade + cortina com parallax por dentro */}
                        <Reveal
                            kind="fade"
                            standalone
                            className="relative w-full max-w-lg lg:max-w-none lg:w-[120%] lg:-ml-16 xl:-ml-32 aspect-[3/4] rounded-sm overflow-hidden shadow-2xl"
                        >
                            <CurtainImage>
                                <Image
                                    src="/imgs/surpresa02.png"
                                    alt="Detalhes da cesta de piquenique com queijos, vinhos e frutas"
                                    fill
                                    sizes="60vw"
                                    className="object-cover"
                                />
                            </CurtainImage>
                        </Reveal>

                        {/* Texto em cascata, começando um pouco depois da imagem */}
                        <Stagger
                            className="flex flex-col items-start text-left gap-6 text-[#E1D5BF] lg:pl-2"
                            gap={0.14}
                            delay={0.25}
                        >
                            <Reveal>
                                <Title
                                    scriptFirstLetter={true}
                                    firstLetterMargin="0.1em"
                                    className={`${titleClasses}`}
                                >
                                    {title}
                                </Title>
                            </Reveal>

                            <div className="flex flex-col gap-4 mt-2 pr-25">
                                {paragraphs.map((p) => (
                                    <Reveal key={p}>
                                        <Text className="text-[#E1D5BF]/90 text-base">{p}</Text>
                                    </Reveal>
                                ))}
                            </div>

                            <Reveal className="mt-4">
                                <Button>Encomendar cesta</Button>
                            </Reveal>
                        </Stagger>
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}