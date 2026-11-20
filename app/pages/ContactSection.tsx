"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";
import { Reveal, Stagger } from "../lib/motion";

export default function ContactSection() {
    return (
        <LazyMotion features={domAnimation} strict>
            <section id="contato" className="w-full px-6 py-20 md:px-22 lg:py-28">
                <Stagger
                    className="flex flex-col items-start text-left w-full gap-6"
                    gap={0.14}
                >
                    <Reveal>
                        <Title
                            scriptFirstLetter={true}
                            firstLetterMargin="0.1em"
                            className="leading-[1.1] [&>span]:text-[2em]"
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
                        <Button
                            href="https://wa.me/5541996262562?text=Olá!%20Gostaria%20de%20mais%20informações."
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Entrar em contato
                        </Button>
                    </Reveal>
                </Stagger>
            </section>
        </LazyMotion>
    );
}
