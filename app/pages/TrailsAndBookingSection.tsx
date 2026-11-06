import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";
import DividerWithSun from "../components/DividerWithSun";
import VideoPlayer from "../components/VideoPlayer";

export default function TrailsAndBookingSection() {
    return (
        <section className="text-[#E1D5BF] pt-14 lg:pt-32">
            <div className="flex flex-col w-full">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col">
                    <div className="mt-0 mb-30">
                        <DividerWithSun />
                    </div>

                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8 w-full">
                        <div className="hidden md:block">
                            <Title
                                scriptFirstLetter={true}
                                firstLetterMargin="0.1em"
                                className="leading-[1.1] [&>span]:text-[2em] [&>span]:-ml-[0.2em]"
                            >
                                Trilhas & Cachoeira no Entorno
                            </Title>
                        </div>

                        <div className="md:hidden w-full max-w-md">
                            <Title
                                scriptFirstLetter={false}
                                className="text-left leading-none"
                            >
                                <span className="block ml-[16%]">
                                    <span className="font-script leading-[0.5] -mr-[0.05em] pr-1 text-[64px] align-baseline">T</span>
                                    rilhas &amp;
                                </span>
                                <span className="block">
                                    <span className="font-script leading-[0.5] -mr-[0.05em] pr-1 text-[64px] align-baseline">C</span>
                                    achoeira no
                                </span>
                                <span className="block ml-[38%]">Entorno</span>
                            </Title>
                        </div>

                        <Text className="max-w-2xl text-left md:text-center text-[#E1D5BF]/90">
                            A Pousada Alvorada está localizada próxima a trilhas ecológicas e a uma cachoeira na região. Os caminhos são sinalizados e permitem explorar a flora e a fauna da Mata Atlântica a poucos minutos de caminhada das cabanas
                        </Text>

                        <div className="relative w-full mt-4 overflow-hidden">
                            <VideoPlayer
                                src="/vid/video.mp4"
                                poster="/imgs/cachoeira.png"
                            />
                        </div>
                    </div>

                    <div className="my-20 lg:my-28">
                        <DividerWithSun />
                    </div>
                </div>

                <div className="w-full px-6 md:px-22">
                    <div className="flex flex-col items-start text-left w-full gap-6">
                        <Title
                            scriptFirstLetter={true}
                            firstLetterMargin="0.1em"
                            className="leading-[1.1] [&>span]:text-[2em] "
                        >
                            Reserve o seu momento na Mata Atlântica
                        </Title>

                        <div className="flex flex-col gap-3 w-full">
                            <Text className="text-[#E1D5BF]/90">
                                Trabalhamos com reservas antecipadas e vagas limitadas para garantir a privacidade e a tranquilidade de cada hospede.
                            </Text>

                            <div className="mt-4">
                                <Text className="text-[#E1D5BF]/90">
                                    Localizada, a Pousada Alvorada fica no topo da Serra dos Pinhais.
                                </Text>
                                <Text className="text-[#E1D5BF]/90">
                                    Atendimento: Segunda a Domingo, das 8h às 20h
                                </Text>
                                <Text className="text-[#E1D5BF]/90">
                                    Check-in às 14h e check-out às 12h.
                                </Text>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button>Entrar em contato</Button>
                        </div>
                    </div>
                </div>

                <div className="mt-24 py-8 border-t border-[#E1D5BF]/20 text-center w-full">
                    <Text className="text-[#E1D5BF]/60 text-sm">
                        © 2026 Pousada Alvorada. Todos os direitos reservados.
                    </Text>
                </div>
            </div>
        </section>
    );
}