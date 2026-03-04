"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BottleScene() {
  const bottleRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const bottle = bottleRef.current;
    if (!bottle) return;

    const isMobile = window.innerWidth < 1024;

    const container = document.getElementById("pinContainer");

    // Fallback if pinContainer isn't found for some reason (e.g., initial render delay)
    const triggerElement = container || document.body;
    const endValue = container ? "+=300%" : "bottom bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: endValue,
        scrub: true,
      },
    });

    if (isMobile) {
      // Intro -> Amla
      tl.fromTo(
        bottle,
        { y: 0, x: 20, opacity: 1, rotate: 82 },
        { y: 0, opacity: 1, rotate: 45, duration: 1, scale: 1.5 },
      )
        // Amla -> Leaves
        .to(bottle, {
          rotate: 0,
          scale: 1.6,
          yPercent: 0,
          xPercent: 0,
          duration: 1,
        })
        // Leaves -> Story
        .to(bottle, {
          rotate: "-=45",
          yPercent: 0,
          xPercent: -20,
          scale: 1.2,
          duration: 1,
        });
    } else {
      // Intro -> Amla (Bottle stays perfectly right side up, slightly to the right)
      tl.fromTo(
        bottle,
        { yPercent: 0, xPercent: 20, opacity: 1, rotate: 82, scale: 1.1 },
        { yPercent: 0, xPercent: 25, opacity: 1, rotate: 0, duration: 1, scale: 1.1 }, // Straight up
      )
        // Amla -> Leaves (Bottle tilts horizontally, centered/left)
        .to(bottle, {
          rotate: "-70",
          scale: 1.5,
          yPercent: 15,
          xPercent: "-15",
          duration: 1,
        })
        // Leaves -> Story (Bottle scales massively, perfectly centered, showing top cap)
        .to(bottle, {
          rotate: 0,
          yPercent: -45, // Move it up off viewport slightly to show exactly neck/cap like screenshot
          xPercent: 0,
          scale: 2.5,
          duration: 1,
        });
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <Image
        ref={bottleRef}
        src="/images/amlaBottle.png"
        alt="Bottle"
        height={1000}
        width={1000}
        className="w-40 md:w-100 max-h-[50vh] lg:max-h-none object-contain"
      />
    </div>
  );
}
