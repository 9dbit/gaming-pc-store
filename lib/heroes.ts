import fs from "node:fs";
import path from "node:path";

function read(name: string) {
  return fs.readFileSync(path.join(process.cwd(), "assets-src", name), "utf8").trim();
}

export function getHeroSlides() {
  const mobileGod = read("mobile-god.b64");
  const mobileRacing = read("mobile-racing.b64");
  const mobileRpg = read("mobile-rpg.part1") + read("mobile-rpg.part2");
  const desktopGod = read("desktop-god.b64");
  const desktopRacing = read("desktop-racing.b64");
  const desktopRpg = read("desktop-rpg.b64");

  return [
    { id: "god", mobile: `data:image/webp;base64,${mobileGod}`, desktop: `data:image/webp;base64,${desktopGod}`, alt: "NEXRIG Play Like a God gaming hardware campaign" },
    { id: "racing", mobile: `data:image/webp;base64,${mobileRacing}`, desktop: `data:image/webp;base64,${desktopRacing}`, alt: "NEXRIG Hyper Racing high FPS gaming campaign" },
    { id: "rpg", mobile: `data:image/webp;base64,${mobileRpg}`, desktop: `data:image/webp;base64,${desktopRpg}`, alt: "NEXRIG RPG gaming world campaign" },
  ];
}
