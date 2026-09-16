import Link from "next/link";
import {LockKeyhole,PackageCheck,Heart,MonitorCog} from "lucide-react";

export const metadata={title:"Account | NEXRIG",description:"Sign in to manage NEXRIG orders, saved builds, wishlist, and account details."};

export default function AccountPage(){
 return <main className="accountPage">
  <section className="accountShell">
   <div className="accountPitch">
    <span className="kicker">NEXRIG ACCOUNT</span>
    <h1>Your builds, orders, and hardware in one place.</h1>
    <p>Account authentication will connect in the backend phase. The storefront UI is prepared now so the experience stays consistent when real identity and order data go live.</p>
    <div className="accountBenefits">
     <span><PackageCheck/><b>Track orders</b><small>Payment, packing, shipping, and delivery status.</small></span>
     <span><MonitorCog/><b>Save PC builds</b><small>Return to compatible configurations from any device.</small></span>
     <span><Heart/><b>Keep your wishlist</b><small>Save components and compare them later.</small></span>
     <span><LockKeyhole/><b>Secure account</b><small>Authentication and sessions will be connected in the backend phase.</small></span>
    </div>
   </div>
   <div className="accountCard">
    <span className="kicker">WELCOME BACK</span><h2>Sign in to NEXRIG</h2><p>UI preview only. Sign-in is not active yet.</p>
    <label>Email address<input type="email" placeholder="you@example.com" disabled/></label>
    <label>Password<input type="password" placeholder="••••••••" disabled/></label>
    <button disabled>Sign In</button>
    <div className="accountDivider"><span/>or<span/></div>
    <button className="accountAlt" disabled>Continue with Google</button>
    <small>New to NEXRIG? Account creation will activate together with the authentication backend.</small>
    <Link href="/category/all">Continue shopping →</Link>
   </div>
  </section>
 </main>
}
