import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";

export default function HeroSection() {
  return (
    <section className="relative w-full h-auto min-h-[110vh] md:h-screen md:min-h-[600px] flex items-center py-24 md:py-0">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/imgs/heroSection.png')" }}
      />

      <div className="relative z-10 w-full max-w-4xl px-6 md:pl-16 lg:pl-44 flex flex-col gap-6 md:gap-8">
        
        <Title
          scriptFirstLetter={true}
          firstLetterMargin="0.1em"
          className="text-[#E1D5BF] uppercase leading-[1.15] whitespace-pre-line text-[1.4rem] sm:text-3xl md:text-5xl [&>span]:text-[2.2em] [&>span]:leading-[0] [&>span]:-ml-[0.1em]"
        >
          {"Você,\nquem você ama\ne um refúgio romântico\ncercado por natureza"}
        </Title>

        <div className="border-l border-[#E1D5BF]/70 pl-4 md:pl-6 py-1 flex flex-col gap-5 md:gap-6">
          <Text className="text-[#E1D5BF] text-sm sm:text-base leading-[1.4] max-w-[420px]">
            Desligue-se da rotina e sinta a paz de um refúgio exclusivo na serra. A
            Pousada Alvorada conta com cabanas privativas e elegantes, com a
            atmosfera perfeita em meio à natureza.
          </Text>

          <div className="flex flex-row flex-nowrap gap-2 sm:gap-4 w-full">
            <Button className="whitespace-nowrap text-[13px] sm:text-base px-3 sm:px-6">
              Fazer reserva
            </Button>
            <Button className="whitespace-nowrap text-[13px] sm:text-base px-3 sm:px-6">
              Conhecer cabanas
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}