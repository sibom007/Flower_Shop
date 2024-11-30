"use client";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  useGSAP(() => {
    gsap.from("#box", { x: 20, scale: 20, duration: 7 });
  });

  return (
    <div>
      hello
      <Button
        id="box"
        className="motion-scale-in-[0.5] motion-translate-x-in-[-120%] motion-translate-y-in-[-60%] motion-opacity-in-[33%] motion-rotate-in-[-1080deg] motion-blur-in-[10px] motion-delay-[0.38s]/scale motion-duration-[0.38s]/opacity motion-duration-[1.20s]/rotate motion-duration-[0.42s]/blur motion-delay-[0.33s]/blur motion-ease-spring-bouncier"
        variant={"destructive"}>
        Helo
      </Button>
    </div>
  );
}
