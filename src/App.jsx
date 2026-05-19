import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Globe, Sun, Moon, Settings, Layout, Cpu, Zap, ArrowRight, Sparkles, Sliders, ToggleLeft, ToggleRight
} from "lucide-react";

const translations = {
  ar: {
    logo: "مصطفى لتصميم المواقع الحديثة",
    settingsTitle: "غرفة التحكم الذكية",
    heroTitle: "هندسة واجهات رقمية",
    heroTitleSpan: "خارقة الذكاء وعصرية",
    heroDesc: "نصنع صفحات هبوط ومواقع عرض حصرية، مدمجة بذكاء اصطناعي وتأثيرات بصرية هندسية تجذب عملائك وتضاعف مبيعاتك.",
    ctaBtn: "ابدأ مشروعك الآن عبر الواتساب",
    liveTerminal: "// محاكي بناء النظام الهندسي الحي",
    beforeAfterTitle: "النقلة النوعية لمشروعك",
    beforeAfterDesc: "اسحب المؤشر لرؤية الفارق بين العشوائية والهندسة الرقمية",
    modernTech: "✨ واجهة هندسية فائقة الأداء",
    modernSub: "كود نظيف، سرعة 100%، تفاعل لحظي ونمو للمبيعات",
    archTitle: "الهندسة الداخلية للكود",
    archDesc: "اضغط على أي طبقة لرؤية معايير الجودة البرمجية التي نتبعها",
    calcTitle: "مُهندس ميزانية المشروع التفاعلي",
    calcPages: "حجم البنية البرمجية (عدد الصفحات):",
    calcPriceLabel: "الاستثمار المتوقع للمشروع",
    calcBtn: "حجز المعمارية البرمجية للموقع",
    servicesTitle: "المنظومة الخدمية الهندسية",
    servicesDesc: "حلول رقمية متكاملة مصممة بأحدث التقنيات العالمية.",
    timelineTitle: "مراحل تشييد مشروعك الرقمي",
    reviewsTitle: "شركاء النجاح والثقة",
    faqTitle: "المعلومات الهندسية الشائعة",
    copyEmail: "📧 اضغط لنسخ البريد",
    copiedMsg: "🚀 تم النسخ!",
    footerText: "جميع الحقوق محفوظة. بواسطة مصطفى.",
    settingToggleParticles: "تأثير الجسيمات",
    settingToggleTerminal: "إظهار التيرمنال",
    settingBasePrice: "السعر الأساسي ($)",
    settingAccentColor: "اللون المهيمن"
  },
  en: {
    logo: "Mostafa Web Design",
    settingsTitle: "Smart Control Room",
    heroTitle: "Engineering High-End",
    heroTitleSpan: "Futuristic Digital UIs",
    heroDesc: "We build premium landing pages engineered with striking visual architecture.",
    ctaBtn: "Launch Your Project On WhatsApp",
    liveTerminal: "// Live Simulator",
    beforeAfterTitle: "Project Transformation",
    beforeAfterDesc: "Drag to preview",
    modernTech: "✨ High-Performance UI",
    modernSub: "Clean code, 100% speed",
    archTitle: "Code Architecture",
    archDesc: "Click layers",
    calcTitle: "Budget Planner",
    calcPages: "Pages:",
    calcPriceLabel: "Estimated Investment",
    calcBtn: "Secure Now",
    servicesTitle: "Our Ecosystem",
    servicesDesc: "End-to-end solutions.",
    timelineTitle: "Construction Phases",
    reviewsTitle: "Partners in Success",
    faqTitle: "Knowledge Base",
    copyEmail: "📧 Copy Email",
    copiedMsg: "🚀 Copied!",
    footerText: "All Rights Reserved by Mostafa.",
    settingToggleParticles: "Particles",
    settingToggleTerminal: "Show Terminal",
    settingBasePrice: "Base Price ($)",
    settingAccentColor: "Accent Color"
  }
};

export default function App() {
  const [lang, setLang] = useState("ar");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [pages, setPages] = useState(3);
  const [copied, setCopied] = useState(false);
  const [enableParticles, setEnableParticles] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [basePrice, setBasePrice] = useState(60);
  const [accentColor, setAccentColor] = useState("phosphor");

  const canvasRef = useRef(null);
  const t = translations[lang];
  const isRtl = lang === "ar";

  const WHATSAPP_NUMBER = "01044907363";
  const WHATSAPP_LINK = `https://wa.me/2${WHATSAPP_NUMBER.replace(/^0/, '')}`;
  const EMAIL = "mostafa351989@gmail.com";

  const accentMap = { phosphor: "#39ff14", orange: "#ff6b35", blue: "#00b4d8" };
  const accent = accentMap[accentColor];
  const totalPrice = basePrice + pages * 25;

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!enableParticles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
      s: Math.random() * 2 + 1
    }));
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.fillStyle = accent + "55";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });
      id = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, [enableParticles, accent]);

  return (
    <div dir={isRtl? "rtl" : "ltr"} className={darkMode? "bg-[#020a0a] text-white min-h-screen" : "bg-slate-50 text-slate-900 min-h-screen"} style={{ fontFamily: "Cairo, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap');`}</style>
      {enableParticles && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />}

      <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} className="p-2 rounded-xl bg-white/10 flex items-center gap-2">
              <Settings size={18} style={{ color: accent }} />
              <span className="text-xs hidden md:inline">{t.settingsTitle}</span>
            </button>
            <h1 className="font-black text-xl" style={{ color: accent }}>{t.logo}</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setLang(lang === "ar"? "en" : "ar")} className="px-3 py-1.5 rounded-xl bg-white/10 text-xs flex items-center gap-1">
              <Globe size={14} style={{ color: accent }} /> {lang === "ar"? "EN" : "AR"}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl bg-white/10">
              {darkMode? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50" onClick={() => setMenuOpen(false)} />
            <motion.div initial={{ x: isRtl? "100%" : "-100%" }} animate={{ x: 0 }} exit={{ x: isRtl? "100%" : "-100%" }} className={`fixed top-0 bottom-0 ${isRtl? "right-0" : "left-0"} w-[360px] max-w-[90vw] bg-[#071312] p-6 z-50 overflow-y-auto`}>
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-bold"><Sliders size={18} style={{ color: accent }} />{t.settingsTitle}</div>
                <button onClick={() => setMenuOpen(false)}><X size={18} /></button>
              </div>
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-center mb-3"><span>{t.settingToggleParticles}</span>
                    <button onClick={() => setEnableParticles(!enableParticles)}>{enableParticles? <ToggleRight size={26} style={{ color: accent }} /> : <ToggleLeft size={26} />}</button>
                  </div>
                  <div className="flex justify-between items-center"><span>{t.settingToggleTerminal}</span>
                    <button onClick={() => setShowTerminal(!showTerminal)}>{showTerminal? <ToggleRight size={26} style={{ color: accent }} /> : <ToggleLeft size={26} />}</button>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm mb-2">{t.settingAccentColor}</div>
                  <div className="flex gap-2">
                    {Object.entries(accentMap).map(([k, c]) => (
                      <button key={k} onClick={() => setAccentColor(k)} className={`w-9 h-9 rounded-full border-2 ${accentColor === k? "border-white" : "border-white/20"}`} style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="text-sm block mb-2">{t.settingBasePrice}</label>
                  <input type="number" value={basePrice} onChange={e => setBasePrice(Number(e.target.value))} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 relative z-10">
        <section className="py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">{t.heroTitle} <span style={{ color: accent }}>{t.heroTitleSpan}</span></h1>
          <p className="max-w-3xl mx-auto opacity-80 mb-10">{t.heroDesc}</p>
          <div className="flex justify-center gap-3">
            <a href={WHATSAPP_LINK} target="_blank" className="px-8 py-4 rounded-2xl font-bold text-black" style={{ background: accent }}>{t.ctaBtn}</a>
            <button onClick={copyEmail} className="px-8 py-4 rounded-2xl border border-white/20">{copied? t.copiedMsg : t.copyEmail}</button>
          </div>
          {showTerminal && (
            <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-sm text-left">
              <div className="opacity-60 mb-2">{t.liveTerminal}</div>
              <div>whatsapp = "{WHATSAPP_NUMBER}"</div>
              <div>email = "{EMAIL}"</div>
            </div>
          )}
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-black text-center mb-4">{t.beforeAfterTitle}</h2>
          <p className="text-center opacity-70 mb-10">{t.beforeAfterDesc}</p>
          <div className="max-w-4xl mx-auto relative h-[380px] rounded-3xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
              <div className="text-center"><Sparkles className="w-12 h-12 mx-auto mb-3" style={{ color: accent }} /><div className="text-2xl font-bold">{t.modernTech}</div><div className="opacity-70">{t.modernSub}</div></div>
            </div>
            <div className="absolute inset-0 bg-slate-200" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} />
            <input type="range" min="0" max="100" value={sliderPos} onChange={e => setSliderPos(e.target.value)} className="absolute inset-0 opacity-0 cursor-ew-resize" />
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-3xl font-black mb-6">{t.calcTitle}</h2>
            <label className="block mb-2">{t.calcPages} {pages}</label>
            <input type="range" min="1" max="10" value={pages} onChange={e => setPages(Number(e.target.value))} className="w-full mb-6" />
            <div className="text-5xl font-black my-4" style={{ color: accent }}>${totalPrice}</div>
            <a href={WHATSAPP_LINK} target="_blank" className="inline-block px-8 py-4 rounded-2xl font-bold text-black" style={{ background: accent }}>{t.calcBtn}</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center opacity-70 text-sm">
        {t.footerText}<br />
        <a href={WHATSAPP_LINK} style={{ color: accent }}>{WHATSAPP_NUMBER}</a> • {EMAIL}
      </footer>
    </div>
  );
}
