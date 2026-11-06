import Image from "next/image";
import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";

const title =
    "Aproveite nosso espaço para surpreender ainda mais quem você ama";

const paragraphs = [
    "Seja para comemorar um aniversário, um pedido especial ou apenas celebrar o amor, montamos cestas surpresa personalizadas com vinhos, iguarias locais e um delicado buquê de flores.",
    "Aproveite a beleza do nosso espaço para fazer um piquenique romântico e surpreenda seu amor.",
];

const titleClasses =
    "leading-[1.1] [&>span]:text-[2em] uppercase [&>span]:leading-[0] pb-3 md:pb-0";

export default function SurpriseSection() {
    return (
        <section className="relative w-full overflow-hidden flex items-center lg:py-32 lg:min-h-[80vh]">
            <Image
                src="/imgs/surpresa01.png"
                alt="Cenário de piquenique ao ar livre"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
            />

            <div className="absolute inset-0 bg-[#1F0905] lg:bg-transparent" />

            <div className="relative z-10 w-full px-6 py-12 flex flex-col gap-6 lg:hidden ">
                <Title
                    scriptFirstLetter={true}
                    firstLetterMargin="0.1em"
                    className={`${titleClasses}`}
                >
                    {title}
                </Title>

                <div className="grid grid-cols-2 gap-4 items-start">
                    <div className="flex flex-col gap-6">
                        {paragraphs.map((p) => (
                            <Text key={p} className="text-sm">
                                {p}
                            </Text>
                        ))}
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="relative w-full aspect-[7/10] overflow-hidden">
                            <Image
                                src="/imgs/surpresa02.png"
                                alt="Detalhes da cesta de piquenique com queijos, vinhos e frutas"
                                fill
                                sizes="50vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="w-full whitespace-nowrap [&>button]:w-full [&>button]:whitespace-nowrap">
                            <Button>Encomendar cesta</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl ml-65 px-6 md:px-12 hidden lg:block">
                <div className="flex flex-row items-start gap-8 lg:gap-16">
                    <div className="relative w-full max-w-lg lg:max-w-none lg:w-[120%] lg:-ml-16 xl:-ml-32 aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                        <Image
                            src="/imgs/surpresa02.png"
                            alt="Detalhes da cesta de piquenique com queijos, vinhos e frutas"
                            fill
                            sizes="60vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col items-start text-left gap-6 text-[#E1D5BF] lg:pl-2">
                        <Title
                            scriptFirstLetter={true}
                            firstLetterMargin="0.1em"
                            className={`${titleClasses}`}
                        >
                            {title}
                        </Title>

                        <div className="flex flex-col gap-4 mt-2 pr-25">
                            {paragraphs.map((p) => (
                                <Text key={p} className="text-[#E1D5BF]/90 text-base">
                                    {p}
                                </Text>
                            ))}
                        </div>

                        <div className="mt-4">
                            <Button>Encomendar cesta</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}