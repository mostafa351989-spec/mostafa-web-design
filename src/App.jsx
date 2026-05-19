import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sun, Moon, Settings, MessageSquare, Layers, DollarSign, Terminal } from "lucide-react";

const WHATSAPP_NUMBER = "201044907363";
const EMAIL = "mostafa@example.com";

const translations = {
  ar: {
    logo: "مصطفى لتصميم المواقع الحديثة",
    heroTitle: "أحول أفكارك إلى واجهات رقمية",
    heroTitleSpan: "أنيقة وبسيطة جداً",
    heroDesc: "تصميم صفحات هبوط وموقع عرض بسيط، فائق السرعة ومخصص لجذب عملائك وزيادة مبيعاتك فوراً.",
    ctaBtn: "تواصل عبر الواتساب فوراً",
    beforeAfterTitle: "كيف أغير نظرة زوارك لمشروعك؟",
    beforeAfterDesc: "اسحب الخط العمودي لرؤية الفرق بنفسك",
    modernTech: "✨ تصميم عصري، بسيط ومقنع",
    modernSub: "يزيد تفاعل العملاء والمبيعات فوراً",
    oldTech: "❌ موقع قديم ومشتت للعين",
    oldSub: "يهرب منه الزائر في أول 3 ثوانٍ",
    calcTitle: "احسب تكلفة موقعك تلقائياً",
    calcPages: "عدد صفحات الموقع المطلوبة:",
    calcFeatures: "إضافات مخصصة لموقعك:",
    featSpeed: "سرعة تحميل خارقة (أقل من ثانيتين)",
    featDark: "التحويل الذكي بين الوضعين",
    featSeo: "تهيئة السيو للأرشفة في جوجل",
    calcPriceLabel: "السعر المتوقع للمشروع",
    calcBtn: "اطلب هذا العرض الآن",
    copyEmail: "📬 تواصل معي عبر الإيميل (اضغط للنسخ)",
    copiedMsg: "📋 تم نسخ الإيميل بنجاح! يسعدني تواصلك.",
    settingsTitle: "لوحة التحكم والإعدادات",
    langLabel: "لغة الموقع الحالية",
    themeLabel: "مظهر الواجهة",
    footerText: "تم التطوير بكل شغف وعصرية بواسطة مصطفى.",
    liveTerminal: "// محاكي بناء المواقع الذكي المباشر"
  },
  en: {
    logo: "Mostafa Modern Web Design",
    heroTitle: "Transforming Your Ideas Into Digital",
    heroTitleSpan: "Elegant & Super Simple UIs",
    heroDesc: "Designing landing pages and modern showcase websites that are blazing fast, sleek, and optimized to convert your visitors into clients instantly.",
    ctaBtn: "Contact via WhatsApp Now",
    beforeAfterTitle: "How Do I Transform Your Project?",
    beforeAfterDesc: "Drag the slider to see the difference yourself",
    modernTech: "✨ Modern, Clean & High-Converting UI",
    modernSub: "Boosts user engagement and sales instantly",
    oldTech: "❌ Outdated & Distracting Layout",
    oldSub: "Visitors leave within the first 3 seconds",
    calcTitle: "Instant Project Price Calculator",
    calcPages: "Required Website Pages:",
    calcFeatures: "Custom Add-ons for your site:",
    featSpeed: "Blazing fast loading (under 2 seconds)",
    featDark: "Seamless Dark/Light mode integration",
    featSeo: "Basic SEO setup for Google search ranking",
    calcPriceLabel: "Estimated Project Cost",
    calcBtn: "Order This Setup Now",
    copyEmail: "📬 Contact via Email (Click to Copy)",
    copiedMsg: "📋 Email copied to clipboard! Let's talk.",
    settingsTitle: "Control Dashboard & Settings",
    langLabel: "Current Website Language",
    themeLabel: "Interface Theme Mode",
    footerText: "Built with passion by Mostafa.",
    liveTerminal: "// Smart Live Website Builder Simulator"
  }
};

export default function App() {
  const [lang, setLang] = useState("ar");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [pages, setPages] = useState(1);
  const [features, setFeatures] = useState({ speed: true, dark: true, seo: false });
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const t = translations[lang];
  const isRtl = lang === "ar";

  const basePrice = 50;
  const pricePerPage = 20;
  const totalPrice = basePrice + (pages * pricePerPage) + (features.speed? 30 : 0) + (features.dark? 15 : 0) + (features.seo? 25 : 0);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particlesArray = [];
    const colors = ["#39ff14", "#ff6b35", "#00b4d8", "#1e4646"];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() { this.x += this.speedX; this.y += this.speedY; if (this.x > canvas.width || this.x < 0) this.speedX *= -1; if (this.y > canvas.height || this.y < 0) this.speedY *= -1; }
      draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    for (let i = 0; i < 45; i++) particlesArray.push(new Particle());
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); animationFrameId = requestAnimationFrame(animate); };
    animate();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", handleResize); };
  }, []);

  return (
    <div dir={isRtl? "rtl" : "ltr"} className={darkMode? "bg-mostafa-dark text-white min-h-screen relative overflow-x-hidden" : "bg-slate-50 text-slate-900 min-h-screen relative overflow-x-hidden"}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30 z-0" />
      <header className="p-5 flex justify-between items-center max-w-6xl mx-auto backdrop-blur-md sticky top-0 z-40 border-b border-mostafa/40">
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl bg-mostafa-light/50 border border-slate-700/50 hover:border-phosphor transition-all text-phosphor">
            <div className="space-y-1.5 w-6 flex flex-col items-end"><span className="h-0.5 w-6 bg-current block rounded"></span><span className="h-0.5 w-5 bg-current block rounded"></span><span className="h-0.5 w-6 bg-current block rounded"></span><span className="h-0.5 w-4 bg-current block rounded"></span></div>
          </button>
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-phosphor via-blueAccent to-orangeAccent bg-clip-text text-transparent">{t.logo}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "ar"? "en" : "ar")} className="p-2 rounded-lg bg-slate-800/40 text-xs font-bold flex items-center gap-1 hover:text-phosphor transition"><Globe size={14} /> {lang === "ar"? "EN" : "عربي"}</button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-800/40 text-xs hover:text-orangeAccent transition">{darkMode? <Sun size={14} className="text-orangeAccent" /> : <Moon size={14} />}</button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black z-40" />
            <motion.div initial={{ x: isRtl? "100%" : "-100%" }} animate={{ x: 0 }} exit={{ x: isRtl? "100%" : "-100%" }} className={`fixed top-0 bottom-0 ${isRtl? "right-0" : "left-0"} w-80 bg-mostafa border-l border-slate-800 p-6 z-50 shadow-2xl text-white`}>
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <h3 className="font-bold flex items-center gap-2 text-phosphor"><Settings size={18} /> {t.settingsTitle}</h3>
                <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 transition"><X size={18} /></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 py-20 max-w-6xl mx-auto gap-12 z-10">
        <div className="flex-1 text-start">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {t.heroTitle} <br />
            <span className="bg-gradient-to-r from-phosphor via-blueAccent to-orangeAccent bg-clip-text text-transparent">{t.heroTitleSpan}</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl text-md mb-8 leading-relaxed">{t.heroDesc}</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="px-8 py-4 bg-gradient-to-r from-mostafa-light via-blueAccent to-orangeAccent rounded-xl text-white font-medium shadow-xl border border-phosphor/20 inline-block">
            {t.ctaBtn} : 01044907363
          </a>
        </div>
        <div className="flex-1 w-full max-w-md bg-black/75 p-6 rounded-2xl border border-mostafa-light font-mono text-xs text-left shadow-2xl">
          <p className="text-slate-500">{t.liveTerminal}</p>
          <p className="mt-2"><span className="text-orangeAccent">const</span> client = <span className="text-phosphor">"Mostafa"</span>;</p>
          <p><span className="text-orangeAccent">const</span> whatsapp = <span className="text-cyan-300">"{WHATSAPP_NUMBER}"</span>;</p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto text-center z-10 relative">
        <h3 className="text-2xl font-bold mb-3">{t.beforeAfterTitle}</h3>
        <p className="text-slate-400 mb-8 text-xs">{t.beforeAfterDesc}</p>
        <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-mostafa-light">
          <div className="absolute inset-0 bg-gradient-to-br from-mostafa via-mostafa-dark to-slate-950 flex flex-col justify-center items-center text-phosphor font-bold text-xl">
            <span>{t.modernTech}</span><span className="text-xs text-slate-400 mt-2">{t.modernSub}</span>
          </div>
          <div className="absolute inset-0 bg-slate-300 text-slate-700 flex flex-col justify-center items-center font-serif text-xl border-r-4 border-phosphor" style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
            <span>{t.oldTech}</span><span className="text-xs text-slate-500 mt-2">{t.oldSub}</span>
          </div>
          <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto z-10 relative">
        <div className="p-8 rounded-3xl border border-mostafa-light bg-mostafa/40 backdrop-blur-md max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-phosphor to-orangeAccent">{t.calcTitle}</h3>
          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-2">{t.calcPages} ({pages})</label>
            <input type="range" min="1" max="7" value={pages} onChange={(e) => setPages(parseInt(e.target.value))} className="w-full accent-phosphor cursor-pointer" />
          </div>
          <div className="text-center my-6">
            <p className="text-sm text-slate-400">{t.calcPriceLabel}</p>
            <p className="text-4xl font-extrabold text-phosphor">${totalPrice}</p>
          </div>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=مرحبا مصطفى، عايز موقع بعدد ${pages} صفحات`} target="_blank" className="block text-center py-3 rounded-xl bg-phosphor text-black font-bold">{t.calcBtn}</a>
          <button onClick={copyEmail} className="mt-4 w-full py-2 text-xs text-slate-400 hover:text-phosphor">{t.copyEmail}</button>
          {copied && <p className="text-center text-phosphor text-xs mt-2">{t.copiedMsg}</p>}
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-800 mt-10">{t.footerText}</footer>
    </div>
  );
}
