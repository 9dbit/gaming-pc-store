export default function PaymentStrip(){
 const items=["VISA","Mastercard","JCB","QRIS","BCA","Mandiri","BNI","BRI","GoPay","OVO","DANA","ShopeePay"];
 return <section className="paymentStrip"><div><span className="kicker">PAYMENT OPTIONS</span><h2>Flexible payment, gateway-ready checkout</h2><p>Checkout UI is prepared for cards, virtual accounts, QRIS, bank transfer, and e-wallets. Live payment processing will be connected after storefront UI sign-off.</p></div><div className="paymentLogos">{items.map(x=><span className={`payLogo pay-${x.toLowerCase()}`} key={x}>{x}</span>)}</div></section>
}
