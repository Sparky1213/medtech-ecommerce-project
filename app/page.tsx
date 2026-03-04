"use client";

import BottleScene from "@/components/BottleScene";
import Navbar from "@/components/layout/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Lexend } from "next/font/google";
import { useEffect, useRef } from "react";

import { ReactLenis } from "lenis/react";
import Lenis from "lenis";
import Image from "next/image";

// import Image from "next/image";

const lexend = Lexend({
  subsets: ["latin"],
});

export default function Home() {
  const fadeBg = useRef<HTMLDivElement>(null);
  const amlaRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.5,
      prevent: (node) => node.id === "get_burger-content",
    });

    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  });

  useGSAP(() => {
    const bg = fadeBg.current;
    const amlaBg = amlaRef.current;
    const leavesBg = leavesRef.current;

    if (!bg || !amlaBg || !leavesBg) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(bg, {
      opacity: 0,
      duration: 1,
    });

    const amlas = gsap.utils.toArray<HTMLImageElement>(".amla");
    amlas.forEach((amla, index) => {
      gsap.fromTo(
        amla,
        { y: 200, duration: 1.4 },
        {
          y: -200,
          opacity: 1,
          ease: "none",
          stagger: index * 1.8,
          scrollTrigger: {
            trigger: amlaBg,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    const leaves = gsap.utils.toArray<HTMLImageElement>(".leaf");
    leaves.forEach((leaf, index) => {
      gsap.fromTo(
        leaf,
        { y: 400, duration: 1 },
        {
          y: -450,
          opacity: 1,
          ease: "none",
          stagger: index * 1.8,
          scrollTrigger: {
            trigger: leavesBg,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <main className={`bg-white ${lexend.className} overflow-hidden`}>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      <Navbar />

      <BottleScene />

      <section
        ref={fadeBg}
        className="h-screen bg-[url(/images/amlaBg.png)] pointer-events-none overflow-hidden bg-center bg-no-repeat bg-cover text-white flex items-center justify-center"
      >
        <div className="h-screen w-screen bg-black/20 "></div>
        <h1 className="text-pretty text-[clamp(2rem,7vw,10rem)] leading-[0.95] font-extrabold w-[min(78vw,18rem)] md:w-[min(40vw,24rem)] absolute left-[6vw] md:left-[12vw] top-[16vh] md:top-auto">
          Nature's Answer To Hairfall
        </h1>
      </section>

      <section
        ref={amlaRef}
        className="h-screen relative bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-center"
      >
        <h1 className="text-pretty text-[clamp(2rem,5vw,6rem)] leading-tight font-normal w-[min(76vw,30rem)] absolute left-[8vw] top-[12vh] md:left-[14vw] md:top-[16vh]">
          Rooted in <span className="font-extrabold">Amla</span>
        </h1>
        <img
          src="/images/amla.png"
          className="amla amla-1 absolute w-[min(26vw,20rem)] -top-[12vh] left-[2vw]"
        />
        <img
          src="/images/amla.png"
          className="amla amla-2 absolute w-[min(20vw,15.5rem)] bottom-[4vh] -left-[4vw] rotate-300"
        />
        <img
          src="/images/amla.png"
          className="amla amla-3 absolute w-[min(22vw,16.5rem)] top-[16vh] -right-[8vw] rotate-320"
        />
        <img
          src="/images/amla.png"
          className="amla amla-4 absolute w-[min(20vw,17rem)] bottom-[4vh] right-[24vw] rotate-120"
        />
        {/* -- */}
        <img
          src="/images/amla.png"
          className="amla amla-1 absolute w-[min(20vw,15rem)] top-[32vh] left-[22vw] rotate-18"
        />
        <img
          src="/images/frontAmla.png"
          className="amla amla-2 absolute w-[min(24vw,15.5rem)] z-40 -bottom-[12vh] left-[38vw] rotate-104"
        />
        <img
          src="/images/frontAmla.png"
          className="amla amla-3 absolute w-[min(24vw,16.5rem)] top-[44vh] right-[42vw]"
        />
        <img
          src="/images/frontAmla.png"
          className="amla amla-4 absolute w-[min(22vw,17rem)] -bottom-[13vh] right-[10vw] rotate-140"
        />
      </section>

      <section
        ref={leavesRef}
        className="h-screen relative bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-center"
      >
        <h1 className="text-[#4E482E] absolute text-[clamp(2rem,6vw,8rem)] w-[min(86vw,70rem)] text-right top-[14vh] right-[7vw] font-normal leading-[1.05]">
          Calmed by <span className="font-extrabold">Ashwagandha</span>
        </h1>
        <img
          src="/images/leaves/leaf1.png"
          className="leaf leaf-3 absolute w-[min(52vw,40rem)] -bottom-[18vh] left-[14vw] rotate-20"
        />
        <img
          src="/images/leaves/leaf3.png"
          className="leaf leaf-2 absolute w-[min(58vw,50rem)] -top-[28vh] -left-[24vw] rotate-120"
        />
        <img
          src="/images/leaves/leaf3.png"
          className="leaf leaf-4 absolute w-[min(50vw,45rem)] -bottom-[30vh] -right-[8vw] z-40"
        />
      </section>

      <section className="h-screen bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] font-lexend flex items-center justify-center">
        <div id="ourStory" className="w-[min(92vw,84rem)] p-[clamp(1rem,3vw,3.5rem)] flex flex-col md:flex-row justify-between items-center gap-[min(8vw,5rem)]">
          <Image
            src="/images/p1.png"
            alt="Bottle"
            height={1000}
            width={10000}
            className="w-[min(80vw,38rem)]"
          />
          <Image
            src="/images/p2.png"
            alt="Bottle"
            height={1000}
            width={10000}
            className="w-[min(80vw,38rem)]"
          />
        </div>
      </section>
    </main>
  );
}
