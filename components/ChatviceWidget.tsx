"use client";

import {useEffect} from "react";

const CHATVICE_SRC="https://chatvice.app/api/widget/chatvice.js?merchant=m_04ab193f4d47b1b4";
const SCRIPT_ID="chatvice-widget-script";

export default function ChatviceWidget(){
  useEffect(()=>{
    let cancelled=false;
    let retryTimer:number|undefined;

    const mount=()=>{
      if(cancelled) return;
      const existing=document.getElementById(SCRIPT_ID) as HTMLScriptElement|null;
      if(existing){
        if(existing.src!==CHATVICE_SRC){
          existing.remove();
        }else{
          return;
        }
      }

      const script=document.createElement("script");
      script.id=SCRIPT_ID;
      script.src=CHATVICE_SRC;
      script.async=true;
      script.setAttribute("data-merchant","m_04ab193f4d47b1b4");
      script.onload=()=>document.documentElement.setAttribute("data-chatvice-loaded","true");
      script.onerror=()=>{
        script.remove();
        if(!cancelled) retryTimer=window.setTimeout(mount,2500);
      };
      document.body.appendChild(script);
    };

    if(document.readyState==="complete") mount();
    else window.addEventListener("load",mount,{once:true});

    return()=>{
      cancelled=true;
      if(retryTimer) window.clearTimeout(retryTimer);
      window.removeEventListener("load",mount);
    };
  },[]);

  return null;
}
