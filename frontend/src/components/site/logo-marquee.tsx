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
    <div
      className="relative w-full overflow-hidden py-8"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee gap-12">
        {[...logos, ...logos].map((logo: string, index: number) => {
          const isCloudflare = logo === "cloudflare.png";

          return (
            <div
              key={`${logo}-${index}`}
              className={`flex items-center justify-center ${
                isCloudflare ? "h-16 w-32" : "h-12 w-24"
              }`}
            >
              <Image
                src={`/images/logos/${logo}`}
                alt={`${logo} logo`}
                width={120}
                height={80}
                className="h-full w-full object-contain grayscale opacity-40 transition-all duration-300 hover:grayscale-0 hover:opacity-80"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
