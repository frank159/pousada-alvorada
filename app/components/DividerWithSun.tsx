import SunRow from "./SunRow";

export default function DividerWithSun() {
    return (
        <div className="relative left-1/2 w-screen md:w-[min(calc(100vw-6rem),94rem)] -translate-x-1/2">
            <SunRow />
        </div>
    );
}