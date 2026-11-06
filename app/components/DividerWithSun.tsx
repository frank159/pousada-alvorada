import Image from "next/image";

export default function DividerWithSun() {
    return (
        <div className="relative left-1/2 w-screen md:w-[min(calc(100vw-6rem),94rem)] -translate-x-1/2 flex items-center justify-center">
            <div className="h-[1px] flex-1 bg-[#E1D5BF]" />

            <div className="px-4 md:mx-0 flex-shrink-0 flex items-center justify-center relative z-10">
                <Image
                    src="/sol.svg"
                    alt="Ícone de Sol"
                    width={34}
                    height={34}
                    className="w-10 h-10 md:w-10 md:h-10 object-contain"
                />
            </div>

            <div className="h-[1px] flex-1 bg-[#E1D5BF]" />
        </div>
    );
}