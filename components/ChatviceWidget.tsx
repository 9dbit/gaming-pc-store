"use client";

import {useEffect,useRef,useState} from "react";
import {MessageCircle} from "lucide-react";

const CHATVICE_SRC="https://chatvice.app/api/widget/chatvice.js?merchant=m_04ab193f4d47b1b4";
const SCRIPT_ID="chatvice-widget-script";
const BOT_RE=/(googlebot|google-inspectiontool|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|facebot|meta-externalagent|meta-externalfetcher|twitterbot|linkedinbot|pinterestbot|applebot|semrushbot|ahrefsbot)/i;

export default function ChatviceWidget(){
  const [activated,setActivated]=useState(false);
  const mounted=useRef(true);

  useEffect(()=>()=>{mounted.current=false},[]);

  const activate=()=>{
    if(activated||BOT_RE.test(navigator.userAgent)) return;
    setActivated(true);

    const existing=document.getElementById(SCRIPT_ID) as HTMLScriptElement|null;
    if(existing) return;

    const script=document.createElement("script");
    script.id=SCRIPT_ID;
    script.src=CHATVICE_SRC;
    script.async=true;
    script.referrerPolicy="strict-origin-when-cross-origin";
    script.setAttribute("data-merchant","m_04ab193f4d47b1b4");
    script.setAttribute("data-chatvice-private","true");
    script.onload=()=>document.documentElement.setAttribute("data-chatvice-loaded","true");
    script.onerror=()=>{
      script.remove();
      if(mounted.current) setActivated(false);
    };
    document.body.appendChild(script);
  };

  return <div className="chatvicePrivacyGate" data-nosnippet aria-label="Private customer support chat">
    {!activated&&<button type="button" className="chatvicePrivacyLauncher" onClick={activate} aria-label="Open private customer service chat" title="Chat with NEXRIG support">
      <MessageCircle size={24}/>
      <span>Chat</span>
    </button>}
  </div>;
}
