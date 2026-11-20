"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import Text from "./Text";
import { Reveal, Stagger } from "../lib/motion";

export default function Footer() {
    return (
        <LazyMotion features={domAnimation} strict>
            <footer className="w-full text-center">
                <Stagger className="w-full" gap={0.2}>
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
            </footer>
        </LazyMotion>
    );
}
