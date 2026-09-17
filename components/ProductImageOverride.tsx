"use client";

import {useEffect} from "react";

const IMAGE_BY_NAME: Record<string,string> = {
  "AMD Ryzen 7 9800X3D":"/api/media/unique-products/cpu-9800x3d.webp",
  "AMD Ryzen 7 9700X":"/api/media/unique-products/cpu-9700x.webp",
  "AMD Ryzen 5 9600X":"/api/media/unique-products/cpu-9600x.webp",
  "X870 Gaming WiFi":"/api/media/unique-products/mb-x870.webp",
  "B850 Gaming WiFi":"/api/media/unique-products/mb-b850.webp",
  "B650M Compact WiFi":"/api/media/unique-products/mb-b650m.webp",
  "RTX 64 COR3 Gaming GPU":"/api/media/unique-products/gpu-64cor3.webp",
  "RTX 48 COR3 Gaming GPU":"/api/media/unique-products/gpu-48cor3.webp",
  "RTX 32 COR3 Gaming GPU":"/api/media/unique-products/gpu-32cor3.webp",
  "NEXRIG DDR5 RGB 64 COR3":"/api/media/unique-products/ram-64.webp",
  "NEXRIG DDR5 RGB 32GB":"/api/media/unique-products/ram-32.webp",
  "NEXRIG DDR5 Stealth 32GB":"/api/media/unique-products/ram-32-stealth.webp",
  "NEXRIG NVMe SSD 2TB":"/api/media/unique-products/ssd-2tb.webp",
  "NEXRIG NVMe SSD 1TB":"/api/media/unique-products/ssd-1tb.webp",
  "NEXRIG NVMe SSD 4TB":"/api/media/unique-products/ssd-4tb.webp",
  "NEXRIG ATX PSU 850W Gold":"/api/media/unique-products/psu-850.webp",
  "NEXRIG ATX PSU 750W Gold":"/api/media/unique-products/psu-750.webp",
  "NEXRIG ATX PSU 1000W Gold":"/api/media/unique-products/psu-1000.webp",
  "NEXRIG Airflow Mid Tower":"/api/media/unique-products/case-mid.webp",
  "NEXRIG Compact mATX Case":"/api/media/unique-products/case-compact.webp",
  "NEXRIG Panoramic Showcase":"/api/media/unique-products/case-show.webp",
  "NEXRIG 27 QHD 180Hz Monitor":"/api/media/unique-products/monitor-180.webp",
  "NEXRIG 25 FHD 240Hz Monitor":"/api/media/unique-products/monitor-240.webp",
  "NEXRIG 32 4K 144Hz Monitor":"/api/media/unique-products/monitor-4k.webp",
  "NEXRIG HDMI 2.1 Cable":"/api/media/unique-products/cable-hdmi.webp",
  "NEXRIG DisplayPort 2.1 Cable":"/api/media/unique-products/cable-dp.webp",
  "NEXRIG Sleeved PSU Cable Kit":"/api/media/unique-products/cable-kit.webp",
  "NEXRIG Tower CPU Cooler":"/api/media/unique-products/cooler-air.webp",
  "NEXRIG AIO 240 RGB":"/api/media/unique-products/cooler-aio240.webp",
  "NEXRIG AIO 360 LCD":"/api/media/unique-products/cooler-aio360.webp"
};

function applyUniqueProductImages(root: ParentNode = document){
  root.querySelectorAll<HTMLImageElement>("img[alt]").forEach(img=>{
    const alt=(img.getAttribute("alt")||"").trim();
    const key=Object.keys(IMAGE_BY_NAME).find(name=>alt===name||alt.startsWith(name+" "));
    if(!key)return;
    const next=IMAGE_BY_NAME[key];
    if(img.getAttribute("src")!==next) img.src=next;
  });
}

export default function ProductImageOverride(){
  useEffect(()=>{
    applyUniqueProductImages();
    const observer=new MutationObserver(()=>applyUniqueProductImages());
    observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["alt","src"]});
    return()=>observer.disconnect();
  },[]);
  return null;
}
