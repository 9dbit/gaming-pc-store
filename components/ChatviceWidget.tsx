"use client";

import {useEffect,useRef} from "react";

const CHATVICE_SRC="https://chatvice.app/api/widget/chatvice.js?merchant=m_04ab193f4d47b1b4";
const SCRIPT_ID="chatvice-widget-script";

export default function ChatviceWidget(){
  const mounted=useRef(true);

  useEffect(()=>{
    mounted.current=true;
    let retryTimer:number|undefined;

    const mount=()=>{
      if(!mounted.current) return;
      const existing=document.getElementById(SCRIPT_ID) as HTMLScriptElement|null;
      if(existing) return;

      const script=document.createElement("script");
      script.id=SCRIPT_ID;
      script.src=CHATVICE_SRC;
      script.async=true;
      script.referrerPolicy="strict-origin-when-cross-origin";
      script.setAttribute("data-merchant","m_04ab193f4d47b1b4");
      script.onload=()=>document.documentElement.setAttribute("data-chatvice-loaded","true");
      script.onerror=()=>{
        script.remove();
        if(mounted.current) retryTimer=window.setTimeout(mount,2500);
      };
      document.body.appendChild(script);
    };

    mount();

    return()=>{
      mounted.current=false;
      if(retryTimer) window.clearTimeout(retryTimer);
    };
  },[]);

  return null;
}
