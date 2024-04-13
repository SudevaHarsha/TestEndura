"use client";

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import { projects } from "@/data/PracticeDtata";
import ImageTextContainer from "@/components/sections/ImageTextContainer";
import { SwipeCarousel } from "@/components/sections/SwipeCarousel";
import Stats from "@/components/sections/Stats";
import Success from "@/components/sections/Success";
import VideoContainer from "@/components/sections/VideoContainer";
import GreStudyGuide from "@/components/sections/GreStudyGuide";
import InfiniteSlider from "@/components/sections/InfiniteSlider";
import TestimonialsPage from "@/components/sections/Testimonials";
import { Button } from "@/components/ui/button";
import Card from "@/components/sections/Card";
import { initialProfile } from "@/lib/initial-profile";

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div>
      <SwipeCarousel />
      <Stats />
      <Success />
      <main ref={container} className="mt-20">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
      <ImageTextContainer
        imageUrl="/img1.png"
        heading="Affordable TOEFL Prep
        for Your Success"
        description="Experience a higher quality of TOEFL learning at a price you won't find anywhere else. Don't pay more than what you need."
      />
      <VideoContainer />
      <GreStudyGuide />
      <InfiniteSlider />
      <TestimonialsPage />
      <section className="py-10 sm:py-20 bg-gradient-to-b from-primary to-secondary" /* style={{ background: "linear-gradient(180deg, #175FFC 0%, #80A8FF 100%)" }} */>
            <div className="mx-auto w-full sm:px-20 max-w-1280 text-center text-white">
                <div className="font-bold break-keep text-3xl sm:text-2xl md:text-5xl">Take a FREE mock test to get your score now</div>
                <div className="mt-10 text-xl sm:text-lg md:text-lg
                ">Sign up today to get a FREE mock test</div>
                <div className="mt-10 flex items-center justify-center sm:mt-10">
                    <a className="block w-full max-w-320" href="/mock-tests">
                        <Button className="w-[300px] bg-black/40">
                            <span>TAKE a FREE MOCK TEST</span>
                            <div className="ripple-container" id="TAKE a FREE MOCK TEST"></div>
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    </div>
  );
}
