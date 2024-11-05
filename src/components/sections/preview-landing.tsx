import { marqueeList } from "@/config/landing";
import Marquee from "../ui/marquee";
import Image from "next/image";
import MaxWidthWrapper from "../shared/max-width-wrapper";



export function Marquee3D() {
  // Split the images into two rows
  const firstRowImages = marqueeList.slice(0, Math.ceil(marqueeList.length / 2));
  const secondRowImages = marqueeList.slice(Math.ceil(marqueeList.length / 2));

  return (
    <div className="pb-6 sm:pb-16">
    <MaxWidthWrapper>
      <div className="rounded-xl md:bg-muted/30 md:p-1.0 animated-border">
        <div className="relative overflow-hidden rounded-xl inner-content">
          <div className="flex flex-col py-8 [perspective:1000px]">
            <Marquee
              className="justify-center overflow-hidden [--duration:40s]"
              style={{
                transform: "rotateX(20deg) rotateY(-10deg) rotateZ(5deg) scale(0.95)",
              }}
            >
              {firstRowImages.map((item) => (
                <div
                  key={item.id}
                  className="mx-4 h-56 w-56 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                >
                  <img
                    src={item.image}
                    alt={`Image ${item.id}`}
                    width={250}
                    height={350}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </Marquee>
            <Marquee
              className="justify-center overflow-hidden [--duration:50s] [--gap:1.5rem]"
              reverse
              style={{
                transform: "rotateX(20deg) rotateY(-10deg) rotateZ(5deg) scale(0.95)",
              }}
            >
              {secondRowImages.map((item) => (
                <div
                  key={item.id}
                  className="mx-4 h-56 w-56 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                >
                  <img
                    src={item.image}
                    alt={`Image ${item.id}`}
                    width={250}
                    height={350}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </Marquee>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </MaxWidthWrapper>
  </div>
  );
}
