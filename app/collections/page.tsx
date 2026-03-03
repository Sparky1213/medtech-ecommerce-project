"use client";

import Navbar from "@/components/layout/Navbar";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

type Product = {
  _id: string;
  name: string;
  category: string;
  image?: string;
};

export default function CollectionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // ✅ Fetch from DB
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".collection-section");

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=80%",
          pin: true,
          scrub: true,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef },
  );

  // ✅ Category filters
  const hairOil = products.filter((p) =>
    p.category?.toLowerCase().includes("oil"),
  );

  const hairTablets = products.filter((p) =>
    p.category?.toLowerCase().includes("tablet"),
  );

  const hairLepa = products.filter((p) =>
    p.category?.toLowerCase().includes("lepa"),
  );

  return (
    <div className="">
      <Navbar />
      <main
        ref={containerRef}
        className={`relative pointer-events-none bg-[#F4F3EE] ${lexend.className}`}
      >
        {/* FIXED BACKGROUND */}
        <div className="fixed inset-0 z-1 overflow-hidden ">
          <Image
            src="/images/amla.png"
            alt="Amla"
            width={250}
            height={250}
            className="absolute -top-40 -left-20 blur-sm -rotate-45"
          />
          <Image
            src="/images/frontAmla.png"
            alt="Amla"
            width={200}
            height={200}
            className="absolute -top-30 right-1/5 rotate-140"
          />
          <Image
            src="/images/leaves/leaf1.png"
            alt="Leaf"
            width={250}
            height={250}
            className="absolute -bottom-20 -left-20 rotate-45"
          />
          <Image
            src="/images/frontAmla.png"
            alt="Amla"
            width={250}
            height={250}
            className="absolute -bottom-50 left-1/6 rotate-140 blur-sm"
          />
          <Image
            src="/images/amla.png"
            alt="Amla"
            width={250}
            height={250}
            className="absolute bottom-10 right-10 rotate-45"
          />
          <Image
            src="/images/leaves/leaf1.png"
            alt="Leaf"
            width={250}
            height={250}
            className="absolute bottom-2/4 -right-20 -rotate-45 blur-xs"
          />
        </div>

        {/* ================= HAIR OIL ================= */}
        <section className="collection-section pointer-events-none z-10 bg-[#F4F3EE]/85 min-h-screen flex flex-col items-center justify-center -mt-28 lg:mt-0">
          <h1
            className="text-5xl lg:text-[120px] font-extrabold text-transparent"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR OIL
          </h1>

          <div className="flex flex-row gap-4 lg:gap-8 mt-1 items-center overflow-x-auto portrait:snap-x portrait:snap-mandatory landscape:justify-center max-w-full px-4 lg:px-0 w-full lg:w-auto pointer-events-auto">
            {hairOil.map((product, index) => {
              console.log("Product ID:", product._id);
              return (
                <Link key={product._id} href={`/collections/${product._id}`} className="portrait:snap-center">
                  <ProductCard
                    image={product.image || "/images/oil/product1.png"}
                    title={product.name}
                    index={index}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ================= HAIR TABLETS ================= */}
        <section className="collection-section z-20 bg-[#F4F3EE]/85 min-h-screen flex flex-col items-center justify-center">
          <h1
            className="text-5xl lg:text-[120px] font-extrabold text-transparent"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR TABLETS
          </h1>

          <div className="flex flex-row gap-4 lg:gap-8 mt-1 items-center overflow-x-auto portrait:snap-x portrait:snap-mandatory landscape:justify-center max-w-full px-4 lg:px-0 w-full lg:w-auto pointer-events-auto">
            {hairTablets.map((product, index) => (
              <Link key={product._id} href={`/collections/${product._id}`} className="portrait:snap-center">
                <ProductCard
                  image={product.image || "/images/tablets/product1.png"}
                  title={product.name}
                  index={index}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* ================= HAIR LEPA ================= */}
        <section className="collection-section z-30 bg-[#F4F3EE]/85 min-h-screen flex flex-col items-center justify-center">
          <h1
            className="text-5xl lg:text-[120px] font-extrabold text-transparent"
            style={{ WebkitTextStroke: "2px #A6B11E" }}
          >
            HAIR LEPA
          </h1>

          <div className="flex flex-row gap-4 lg:gap-8 mt-1 items-center overflow-x-auto portrait:snap-x portrait:snap-mandatory landscape:justify-center max-w-full px-4 lg:px-0 w-full lg:w-auto pointer-events-auto">
            {hairLepa.map((product, index) => (
              <Link key={product._id} href={`/collections/${product._id}`} className="portrait:snap-center">
                <ProductCard
                  image={product.image || "/images/hairLepa/product1.png"}
                  title={product.name}
                  index={index}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductCard({ image, title, index = 0 }: { image: string; title: string; index?: number }) {
  return (
    <div className={`w-[80vw] portrait:w-[80vw] landscape:w-52 lg:w-90 shrink-0 z-2 bg-white rounded-[30px] lg:rounded-[40px] shadow-xl overflow-hidden flex flex-col items-center justify-between cursor-pointer`}>
      <div className="py-6 portrait:py-8 lg:py-6">
        <Image
          src={image}
          alt={title}
          width={1000}
          height={1000}
          className="object-contain w-64 portrait:w-64 landscape:w-40 lg:w-125 h-64 portrait:h-64 landscape:h-32 lg:h-70"
        />
      </div>

      <div className="bg-[#A6B11E] text-white text-center py-4 portrait:py-5 lg:py-6 text-xl portrait:text-xl landscape:text-lg lg:text-2xl font-semibold w-full">
        {title}
      </div>
    </div>
  );
}
