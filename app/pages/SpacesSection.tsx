import Image from "next/image";
import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";
import DividerWithSun from "../components/DividerWithSun";

const spacesData = [
    {
        id: "saudade",
        name: "Cabana Saudade",
        description:
            "A Cabana Saudade oferece um refúgio elegante e relaxante com cozinha equipada, chuveiro a gás e hidromassagem em um ambiente natural cercado por natureza.",
        details:
            "A área externa da Cabana foi projetada para proporcionar uma experiência completa, com hidromassagem para fora você pode aproveitar a vista para um céu deslumbrante, mesa para refeições e churrasqueira equipada.",
        pet: "Seu pet é bem-vindo! Garantimos a segurança e o conforto do seu animal durante o passeio, lembre-se de respeitar a vida selvagem e zelar pelo conforto do seu pet.",
        images: ["/imgs/detailSection01.png", "/imgs/detailSection02.png"],
    },
    {
        id: "sorriso",
        name: "Cabana Sorriso",
        description:
            "A Cabana Sorriso é um espaço relaxante e acolhedor, com cozinha equipada, chuveiro a gás e hidromassagem com vista para a natureza.",
        details:
            "Elegante e romântica, ela é perfeita para você aproveitar uma noite incrível com quem ama.",
        pet: "Seu pet é bem-vindo! Garantimos a segurança e o conforto do seu animal durante o passeio, lembre-se de respeitar a vida selvagem e zelar pelo conforto do seu pet.",
        images: ["/imgs/detailSection03.png", "/imgs/detailSection04.png"],
    },
];

export default function SpacesSection() {
    return (
        <section className="text-[#E1D5BF] pt-24 lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24 lg:gap-32">

                <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
                    <Title
                        scriptFirstLetter={true}
                        firstLetterMargin="0.1em"
                        className="leading-[1.1] [&>span]:text-[2em] [&>span]:-ml-[0.2em]"
                    >
                        Conheça nosso espaço
                    </Title>

                    <Text className="text-[#E1D5BF]/80">
                        Nossas cabanas são projetadas para oferecer uma experiência única e
                        exclusiva, com áreas de lazer privadas em meio a natureza, que garantem
                        conforto e privacidade.
                    </Text>
                    <Text className="text-[#E1D5BF]/80">
                        Conheça as particularidades de cada uma:
                    </Text>
                </div>

                <div className="flex flex-col">
                    {spacesData.map((cabana, index) => {
                        const isEven = index % 2 === 0;
                        const isLast = index === spacesData.length - 1;

                        return (
                            <div key={cabana.id} className="flex flex-col">

                                <div className="relative flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-16 items-stretch overflow-hidden lg:overflow-visible -mx-6 md:mx-0">

                                    <div className={`relative flex flex-col ${isEven ? "lg:order-1" : "lg:order-2"}`}>

                                        <div className="absolute inset-0 z-0 lg:hidden">
                                            <Image
                                                src={cabana.images[0]}
                                                alt={`${cabana.name} - Fundo`}
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-[#1A0D0A]/80" />
                                        </div>

                                        <div className="relative hidden lg:block w-full flex-grow min-h-[500px] overflow-hidden">
                                            <Image
                                                src={cabana.images[0]}
                                                alt={`${cabana.name} - Vista principal`}
                                                fill
                                                sizes="50vw"
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className={`hidden lg:flex items-center gap-4 mt-6 ${isEven ? "justify-end" : "justify-start"}`}>
                                            {isEven ? (
                                                <>
                                                    <Button>Fazer reserva</Button>
                                                    <div className="h-14 w-[1px] bg-[#E1D5BF]" />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-14 w-[1px] bg-[#E1D5BF]" />
                                                    <Button>Fazer reserva</Button>
                                                </>
                                            )}
                                        </div>

                                        <div className="relative z-10 pt-10 pb-10 px-6 lg:p-0 lg:hidden flex flex-col gap-4 text-left">
                                            <Title
                                                scriptFirstLetter={true}
                                                firstLetterMargin="0.1em"
                                                className="leading-[1.1] [&>span]:text-[2em] text-3xl"
                                            >
                                                {cabana.name}
                                            </Title>

                                            <Text className="text-[#E1D5BF]/90">{cabana.description}</Text>
                                            <Text className="text-[#E1D5BF]/90">{cabana.details}</Text>
                                            <Text className="text-[#E1D5BF]/90 mt-2">
                                                <strong className="font-semibold">Pet Friendly:</strong> {cabana.pet}
                                            </Text>

                                            <div className="flex flex-row gap-3 mt-4">
                                                <Button>Fazer reserva</Button>
                                                <Button>Ver fotos</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`hidden lg:flex flex-col gap-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                        <div className={`flex flex-col gap-4 ${!isEven ? "text-right items-end" : "text-left items-start"}`}>
                                            <Title
                                                scriptFirstLetter={true}
                                                firstLetterMargin="0.1em"
                                                className="leading-[1.1] [&>span]:text-[2em] [&>span]:-ml-[0.2em] text-3xl sm:text-4xl lg:text-5xl"
                                            >
                                                {cabana.name}
                                            </Title>

                                            <Text className="text-[#E1D5BF]/90">{cabana.description}</Text>
                                            <Text className="text-[#E1D5BF]/90">{cabana.details}</Text>
                                            <Text className="text-[#E1D5BF]/90 mt-2">
                                                <strong className="font-semibold">Pet Friendly:</strong> {cabana.pet}
                                            </Text>
                                        </div>

                                        <div className="relative w-full aspect-[16/10] mt-4 overflow-hidden">
                                            <Image
                                                src={cabana.images[1]}
                                                alt={`${cabana.name} - Detalhes`}
                                                fill
                                                sizes="50vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {!isLast && (
                                    <div className="relative z-20 h-0 lg:h-auto">

                                        <div className="py-4 lg:py-32 hidden lg:block">
                                            <DividerWithSun />
                                        </div>

                                        <div className="lg:hidden absolute top-0 left-1/2 w-screen -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                                            <div className="h-[1px] flex-1 bg-[#E1D5BF]" />

                                            <div className="px-4 flex-shrink-0 flex items-center justify-center">
                                                <Image
                                                    src="/sol.svg"
                                                    alt="Ícone de Sol"
                                                    width={34}
                                                    height={34}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            </div>

                                            <div className="h-[1px] flex-1 bg-[#E1D5BF]" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}