"use client";

import Image from "next/image";

const logos: string[] = [
  "php.png",
  "typescript.png",
  "symfony.png",
  "nextjs.svg.png",
  "react.svg.png",
  "docker.png",
  "postgresql.png",
  "phpstorm.png",
  "cursor.png",
  "ubuntu.png",
  "laravel.svg.png",
  "phpunit.png",
  "playwright.png",
  "python.png",
  "tanstack.png",
  "vitest.png",
  "cloudflare.png"
];

export function LogoMarquee() {
  return (
      <div className="relative w-full overflow-hidden py-10">
        <div className="flex w-max animate-marquee gap-16">
          {[...logos, ...logos].map((logo: string, index: number) => {
            const isNext = logo === "nextjs.svg.png";
            const isCloudflare = logo === "cloudflare.png";

            return (
                <div
                    key={`${logo}-${index}`}
                    className={`flex items-center justify-center ${
                        isCloudflare ? "h-20 w-36" : "h-16 w-28"
                    }`}
                >
                  <Image
                      src={`/images/logos/${logo}`}
                      alt={`${logo} logo`}
                      width={160}
                      height={100}
                      className={`h-full w-full object-contain opacity-70 transition hover:opacity-100 ${
                          isNext ? "brightness-0 invert" : ""
                      }`}
                  />
                </div>
            );
          })}
        </div>
      </div>
  );
}
