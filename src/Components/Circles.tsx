import OrbitingCircles from "./ui/orbiting-circles"
import Ao from "../assets/AO2.png"
export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden border border-rule bg-void">
      <span className="t-display pointer-events-none text-center text-6xl text-phosphor">
        Sentinel
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.AO1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={60}
        delay={30}
        radius={150}
      >
        <Icons.AO1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={50}
        radius={80}
      >
        <Icons.AO1/>
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        <Icons.AO1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={50}
        delay={20}
        reverse
      >
        <Icons.AO1 />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  AO1: () => (
    <img src={Ao} alt="" />
  ),
  
};
