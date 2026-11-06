"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Variants } from "framer-motion";
import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";
import DividerWithSun from "../components/DividerWithSun";
import VideoPlayer from "../components/VideoPlayer";
import { EASE, Reveal, Stagger, useMotion } from "../lib/motion";

export default function TrailsAndBookingSection() {
    const { reduce, variants } = useMotion();

    // Zoom out lento no vídeo enquanto a cortina abre
    const zoom: Variants = {
        hidden: { scale: reduce ? 1 : 1.08 },
        show: {
            scale: 1,
            transition: { duration: reduce ? 0.2 : 2, ease: EASE },
        },
    };

    return (
        <LazyMotion features={domAnimation} strict>
            <section className="text-[#E1D5BF] pt-14 lg:pt-32">
                <div className="flex flex-col w-full">
                    <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col">
                        {/* Divisor (tem a própria animação) */}
                        <div className="mt-0 mb-30">
                            <DividerWithSun />
                        </div>

                        {/* --- SEÇÃO 1: TRILHAS E CACHOEIRA --- */}
                        <Stagger
                            className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8 w-full"
                            gap={0.14}
                        >
                            {/* Desktop */}
                            <Reveal className="hidden md:block">
                                <Title
                                    scriptFirstLetter={true}
                                    firstLetterMargin="0.1em"
                                    className="leading-[1.1] [&>span]:text-[2em] [&>span]:-ml-[0.2em]"
                                >
                                    Trilhas & Cachoeira no Entorno
                                </Title>
                            </Reveal>

                            {/* Mobile: cada linha do título entra em sequência */}
                            <div className="md:hidden w-full max-w-md">
                                <Title
                                    scriptFirstLetter={false}
                                    className="text-left leading-none"
                                >
                                    <m.span variants={variants.item} className="block ml-[16%]">
                                        <span className="font-script leading-[0.5] -mr-[0.05em] pr-1 text-[64px] align-baseline">T</span>
                                        rilhas &amp;
                                    </m.span>
                                    <m.span variants={variants.item} className="block">
                                        <span className="font-script leading-[0.5] -mr-[0.05em] pr-1 text-[64px] align-baseline">C</span>
                                        achoeira no
                                    </m.span>
                                    <m.span variants={variants.item} className="block ml-[38%]">
                                        Entorno
                                    </m.span>
                                </Title>
                            </div>

                            <Reveal>
                                <Text className="max-w-2xl text-left md:text-center text-[#E1D5BF]/90">
                                    A Pousada Alvorada está localizada próxima a trilhas ecológicas e a uma cachoeira na região. Os caminhos são sinalizados e permitem explorar a flora e a fauna da Mata Atlântica a poucos minutos de caminhada das cabanas
                                </Text>
                            </Reveal>

                            {/* Vídeo: cortina de cima para baixo + zoom out */}
                            <Reveal kind="curtain" className="relative w-full mt-4 overflow-hidden">
                                <m.div variants={zoom}>
                                    <VideoPlayer
                                        src="/vid/video.mp4"
                                        poster="/imgs/cachoeira.png"
                                    />
                                </m.div>
                            </Reveal>
                        </Stagger>

                        <div className="my-20 lg:my-28">
                            <DividerWithSun />
                        </div>
                    </div>

                    {/* --- SEÇÃO 2: RESERVE SEU MOMENTO --- */}
                    <div className="w-full px-6 md:px-22">
                        <Stagger
                            className="flex flex-col items-start text-left w-full gap-6"
                            gap={0.14}
                        >
                            <Reveal>
                                <Title
                                    scriptFirstLetter={true}
                                    firstLetterMargin="0.1em"
                                    className="leading-[1.1] [&>span]:text-[2em] "
                                >
                                    Reserve o seu momento na Mata Atlântica
                                </Title>
                            </Reveal>

                            <div className="flex flex-col gap-3 w-full">
                                <Reveal>
                                    <Text className="text-[#E1D5BF]/90">
                                        Trabalhamos com reservas antecipadas e vagas limitadas para garantir a privacidade e a tranquilidade de cada hospede.
                                    </Text>
                                </Reveal>

                                <Reveal className="mt-4">
                                    <Text className="text-[#E1D5BF]/90">
                                        Localizada, a Pousada Alvorada fica no topo da Serra dos Pinhais.
                                    </Text>
                                    <Text className="text-[#E1D5BF]/90">
                                        Atendimento: Segunda a Domingo, das 8h às 20h
                                    </Text>
                                    <Text className="text-[#E1D5BF]/90">
                                        Check-in às 14h e check-out às 12h.
                                    </Text>
                                </Reveal>
                            </div>

                            <Reveal className="mt-4">
                                <Button>Entrar em contato</Button>
                            </Reveal>
                        </Stagger>
                    </div>

                    {/* Footer: a linha se desenha do centro para as pontas, depois o texto surge */}
                    <Stagger className="mt-24 w-full text-center" gap={0.2}>
                        <Reveal
                            kind="lineX"
                            className="h-px w-full bg-[#E1D5BF]/20 origin-center"
                        />
                        <Reveal kind="fade" className="py-8">
                            <Text className="text-[#E1D5BF]/60 text-sm">
                                © 2026 Pousada Alvorada. Todos os direitos reservados.
                            </Text>
                        </Reveal>
                    </Stagger>
                </div>
            </section>
        </LazyMotion>
    );
}