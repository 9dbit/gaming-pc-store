"use client";

export default function ErrorState({reset}:{reset:()=>void}){return <main className="statePage"><section className="stateCard"><span className="kicker">NEXRIG ERROR</span><h1>Something interrupted the storefront.</h1><p>Your cart and wishlist stay in this browser. Try loading the page again.</p><button onClick={reset}>Try Again</button></section></main>}
