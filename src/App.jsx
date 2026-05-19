import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Globe, Sun, Moon, Settings, Layout, Cpu, Zap, ArrowRight, Sparkles, Sliders, ToggleLeft, ToggleRight, Star, Plus, Trash2
} from "lucide-react";

const defaultConfig = {
  lang: "ar",
  dark: true,
  accent: "gold",
  bgMode: "orbs",
  intensity: 70,
  particles: true,
  animations: true,
  terminal: true,
  logo: "مصطفى لتصميم المواقع الحديثة",
  logoEn: "Mostafa Web Design",
  heroTitle: "هندسة واجهات رقمية",
  heroTitleEn: "Engineering High-End",
  heroSpan: "خارقة الذكاء وعصرية",
  heroSpanEn: "Futuristic Digital UIs",
  heroDesc: "نصنع صفحات هبوط ومواقع عرض حصرية، مدمجة بذكاء اصطناعي وتأثيرات بصرية هندسية تجذب عملائك وتضاعف مبيعاتك.",
  heroDescEn: "We build premium landing pages engineered with striking visual architecture.",
  ctaText: "ابدأ مشروعك الآن عبر الواتساب",
  ctaTextEn: "Launch Your Project On WhatsApp",
  whatsapp: "01044907363",
  email: "mostafa351989@gmail.com",
  basePrice: 60,
  showBeforeAfter: true,
  showServices: true,
  showCalc: true,
  services: [
    { titleAr: "صفحات هبوط هندسية", titleEn: "Engineered Landing Pages", descAr: "تصميم مخصص يركز على الإقناع.", descEn: "Tailored for conversion." },
    { titleAr: "مواقع الشركات", titleEn: "Corporate Hubs", descAr: "موقع فخم يعرض أعمالك.", descEn: "Premium corporate presence." },
    { titleAr: "تحسين السرعة", titleEn: "Performance", descAr: "تحميل أقل من ثانيتين.", descEn: "Sub 2s load times." }
  ],
  links: [
    { labelAr: "معرض الأعمال", labelEn: "Portfolio", url: "#" }
  ]
};

const accents = {
  phosphor: "#39ff14",
  orange: "#ff6b35",
  blue: "#00b4d8",
  gold: "#ffd700",
  purple: "#a855f7",
  pink: "#ec4899",
  teal: "#14b8a6",
  lime: "#84cc16",
  rose: "#f43f5e",
  cyan: "#06b6d4"
};

export default function App() {
  const [cfg, setCfg] = useState(() => {
    try { const s = localStorage.getItem("mwd_cfg"); return s? {...defaultConfig,...JSON.parse(s) } : defaultConfig; } catch { return defaultConfig; }
  });
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState("appearance");
  const [slider, setSlider] = useState(50);
  const [pages, setPages] = useState(3);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const rtl = cfg.lang === "ar";
  const color = accents[cfg.accent];
  const price = cfg.basePrice + pages * 25;
  const LINK = `https://wa.me/2${cfg.whatsapp.replace(/^0/, '')}`;

  useEffect(() => { localStorage.setItem("mwd_cfg", JSON.stringify(cfg)); }, [cfg]);
  useEffect(() => { const onMove = e => mouse.current = { x: e.clientX, y: e.clientY }; window.addEventListener("mousemove", onMove); return () => window.removeEventListener("mousemove", onMove); }, []);

  useEffect(() => {
    if (!cfg.particles) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let id;
    const DPR = window.devicePixelRatio || 1;
    const resize = () => { canvas.width = innerWidth * DPR; canvas.height = innerHeight * DPR; canvas.style.width = innerWidth + "px"; canvas.style.height = innerHeight + "px"; ctx.setTransform(1,0,0,1,0,0); ctx.scale(DPR, DPR); };
    resize();
    const count = Math.floor(cfg.intensity * 1.3);
    const pts = Array.from({ length: count }, () => ({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, vx:(Math.random()-0.5)*0.7, vy:(Math.random()-0.5)*0.7, r: Math.random()*2+0.5 }));
    const draw = () => {
      ctx.clearRect(0,0,innerWidth,innerHeight);
      const mx = mouse.current.x, my = mouse.current.y;
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>innerWidth) p.vx*=-1;
        if (p.y<0||p.y>innerHeight) p.vy*=-1;
        const dx=p.x-mx, dy=p.y-my, d=Math.hypot(dx,dy);
        if (d<130){ p.x-=dx*0.008; p.y-=dy*0.008; }
        if (cfg.bgMode==="orbs"){
          const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*7);
          g.addColorStop(0,color+"ff"); g.addColorStop(1,color+"00");
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*7,0,Math.PI*2); ctx.fill();
        } else {
          ctx.fillStyle=color+"aa"; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        }
      });
      id=requestAnimationFrame(draw);
    };
    draw();
    addEventListener("resize", resize);
    return ()=>{ cancelAnimationFrame(id); removeEventListener("resize", resize); };
  }, [cfg.particles, color, cfg.bgMode, cfg.intensity]);

  const update = (k,v)=> setCfg(c=>({...c,[k]:v}));
  const updateService = (i,k,v)=> setCfg(c=>{ const s=[...c.services]; s[i]={...s[i],[k]:v}; return {...c,services:s}; });
  const addService = ()=> setCfg(c=>({...c,services:[...c.services,{titleAr:"خدمة جديدة",titleEn:"New Service",descAr:"وصف",descEn:"Desc"}]}));
  const removeService = i=> setCfg(c=>({...c,services:c.services.filter((_,j)=>j!==i)}));
  const addLink = ()=> setCfg(c=>({...c,links:[...c.links,{labelAr:"رابط",labelEn:"Link",url:"#"}]}));
  const updateLink = (i,k,v)=> setCfg(c=>{ const l=[...c.links]; l[i]={...l[i],[k]:v}; return {...c,links:l}; });
  const removeLink = i=> setCfg(c=>({...c,links:c.links.filter((_,j)=>j!==i)}));

  const copy = ()=>{ navigator.clipboard.writeText(cfg.email); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (
    <div dir={rtl?"rtl":"ltr"} className={cfg.dark?"bg-[#020a0a] text-white min-h-screen":"bg-slate-50 text-slate-900 min-h-screen"} style={{fontFamily:"Cairo, sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap');`}</style>
      {cfg.particles && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{opacity:0.35}}/>}

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={()=>setMenu(true)} className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-2 hover:bg-white/20">
              <Settings size={18} style={{color}} className={cfg.animations?"animate-spin":""}/><span className="text-xs font-bold hidden md:inline">لوحة التحكم</span>
            </button>
            <h1 className="text-xl font-black" style={{color}}>{rtl?cfg.logo:cfg.logoEn}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>update("lang",cfg.lang==="ar"?"en":"ar")} className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-1"><Globe size={14} style={{color}}/>{cfg.lang==="ar"?"EN":"AR"}</button>
            <button onClick={()=>update("dark",!cfg.dark)} className="p-2 rounded-xl bg-white/10 border border-white/10">{cfg.dark?<Sun size={16} className="text-amber-400"/>:<Moon size={16}/>}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 z-50" onClick={()=>setMenu(false)}/>
          <motion.div initial={{x:rtl?"100%":"-100%"}} animate={{x:0}} exit={{x:rtl?"100%":"-100%"}} className={`fixed top-0 bottom-0 ${rtl?"right-0":"left-0"} w-[420px] max-w-[95vw] bg-[#071312]/95 backdrop-blur-2xl border-white/10 p-5 z-50 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-black"><Sliders size={18} style={{color}}/> لوحة تحكم كاملة</div>
              <button onClick={()=>setMenu(false)} className="p-2 rounded-lg hover:bg-white/10"><X size={18}/></button>
            </div>
            <div className="flex gap-2 mb-4 text-xs flex-wrap">
              {["appearance","content","contact","sections","services","links"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-lg border ${tab===t?"bg-white/20 border-white/30":"bg-white/5 border-white/10"}`}>{t}</button>
              ))}
            </div>

            {tab==="appearance" && <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <Toggle label="الجسيمات" val={cfg.particles} set={v=>update("particles",v)} color={color}/>
                <Toggle label="الحركات" val={cfg.animations} set={v=>update("animations",v)} color={color}/>
                <Toggle label="التيرمنال" val={cfg.terminal} set={v=>update("terminal",v)} color={color}/>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs opacity-70 mb-2">اللون</div>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(accents).map(([k,c])=>(
                    <button key={k} onClick={()=>update("accent",k)} className={`h-10 rounded-xl border-2 ${cfg.accent===k?"scale-110 border-white":"border-white/20"}`} style={{background:c}} title={k}/>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <label className="text-sm">نمط الخلفية</label>
                <select value={cfg.bgMode} onChange={e=>update("bgMode",e.target.value)} className="w-full mt-2 px-3 py-2 rounded bg-black/40 border border-white/10">
                  {["orbs","dots","grid","waves"].map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                <label className="text-sm mt-3 block">الشدة: {cfg.intensity}</label>
                <input type="range" min="20" max="150" value={cfg.intensity} onChange={e=>update("intensity",Number(e.target.value))} className="w-full"/>
              </div>
            </div>}

            {tab==="content" && <div className="space-y-3">
              {[
                ["logo","الشعار"],
                ["heroTitle","عنوان رئيسي"],
                ["heroSpan","عنوان مميز"],
                ["heroDesc","وصف"],
                ["ctaText","نص الزر"]
              ].map(([k,l])=>(
                <div key={k}>
                  <label className="text-xs opacity-70">{l}</label>
                  <input value={cfg[k]} onChange={e=>update(k,e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10"/>
                </div>
              ))}
            </div>}

            {tab==="contact" && <div className="space-y-3">
              <div><label className="text-xs opacity-70">واتساب</label><input value={cfg.whatsapp} onChange={e=>update("whatsapp",e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10"/></div>
              <div><label className="text-xs opacity-70">إيميل</label><input value={cfg.email} onChange={e=>update("email",e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10"/></div>
              <div><label className="text-xs opacity-70">السعر الأساسي</label><input type="number" value={cfg.basePrice} onChange={e=>update("basePrice",Number(e.target.value))} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10"/></div>
            </div>}

            {tab==="sections" && <div className="space-y-2">
              {[
                ["showBeforeAfter","قبل/بعد"],
                ["showServices","الخدمات"],
                ["showCalc","الحاسبة"]
              ].map(([k,l])=>(
                <div key={k} className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/10">
                  <span className="text-sm">{l}</span>
                  <button onClick={()=>update(k,!cfg[k])}>{cfg[k]?<ToggleRight size={26} style={{color}}/>:<ToggleLeft size={26} className="opacity-50"/>}</button>
                </div>
              ))}
            </div>}

            {tab==="services" && <div className="space-y-3">
              {cfg.services.map((s,i)=>(
                <div key={i} className="p-3 rounded bg-white/5 border border-white/10 space-y-2">
                  <div className="flex justify-between"><span className="text-xs opacity-70">خدمة #{i+1}</span><button onClick={()=>removeService(i)} className="text-red-400"><Trash2 size={16}/></button></div>
                  <input value={s.titleAr} onChange={e=>updateService(i,"titleAr",e.target.value)} placeholder="عنوان عربي" className="w-full px-2 py-1 rounded bg-black/40 border border-white/10 text-sm"/>
                  <input value={s.descAr} onChange={e=>updateService(i,"descAr",e.target.value)} placeholder="وصف عربي" className="w-full px-2 py-1 rounded bg-black/40 border border-white/10 text-sm"/>
                </div>
              ))}
              <button onClick={addService} className="w-full py-2 rounded bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Plus size={16}/> إضافة خدمة</button>
            </div>}

            {tab==="links" && <div className="space-y-3">
              {cfg.links.map((l,i)=>(
                <div key={i} className="p-3 rounded bg-white/5 border border-white/10 space-y-2">
                  <div className="flex justify-between"><span className="text-xs opacity-70">رابط #{i+1}</span><button onClick={()=>removeLink(i)} className="text-red-400"><Trash2 size={16}/></button></div>
                  <input value={l.labelAr} onChange={e=>updateLink(i,"labelAr",e.target.value)} placeholder="اسم الرابط" className="w-full px-2 py-1 rounded bg-black/40 border border-white/10 text-sm"/>
                  <input value={l.url} onChange={e=>updateLink(i,"url",e.target.value)} placeholder="https://..." className="w-full px-2 py-1 rounded bg-black/40 border border-white/10 text-sm"/>
                </div>
              ))}
              <button onClick={addLink} className="w-full py-2 rounded bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Plus size={16}/> إضافة رابط</button>
            </div>}
          </motion.div>
        </>}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 relative z-10">
        <section className="py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">{rtl?cfg.heroTitle:cfg.heroTitleEn} <span style={{color}}>{rtl?cfg.heroSpan:cfg.heroSpanEn}</span></h1>
          <p className="max-w-3xl mx-auto opacity-80 mb-10 text-lg">{rtl?cfg.heroDesc:cfg.heroDescEn}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={LINK} target="_blank" className="px-8 py-4 rounded-2xl font-bold text-black shadow-xl hover:scale-105 transition" style={{background:color}}>{rtl?cfg.ctaText:cfg.ctaTextEn}</a>
            <button onClick={copy} className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition">{copied?"🚀 تم النسخ!":"📧 نسخ البريد"}</button>
          </div>
          {cfg.terminal && <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-black/50 p-6 text-left font-mono text-sm"><div className="opacity-60 mb-3">// live config</div><div>whatsapp = "{cfg.whatsapp}"</div><div>email = "{cfg.email}"</div><div>accent = "{color}"</div></div>}
        </section>

        {cfg.showBeforeAfter && <section className="py-20"><h2 className="text-4xl font-black text-center mb-10">قبل / بعد</h2><div className="max-w-5xl mx-auto relative h-[400px] rounded-3xl overflow-hidden border border-white/10"><div className="absolute inset-0 bg-slate-900 flex items-center justify-center"><Sparkles className="w-12 h-12" style={{color}}/></div><div className="absolute inset-0 bg-slate-200" style={{clipPath:`inset(0 ${100-slider}% 0 0)`}}/><input type="range" min="0" max="100" value={slider} onChange={e=>setSlider(e.target.value)} className="absolute inset-0 opacity-0 cursor-ew-resize"/></div></section>}

        {cfg.showServices && <section className="py-20"><h2 className="text-4xl font-black text-center mb-12">الخدمات</h2><div className="grid md:grid-cols-3 gap-6">{cfg.services.map((s,i)=>(<div key={i} className="p-7 rounded-3xl border border-white/10 bg-white/5 hover:-translate-y-1 transition"><Layout className="w-9 h-9 mb-3" style={{color}}/><h3 className="font-bold text-xl mb-2">{rtl?s.titleAr:s.titleEn}</h3><p className="opacity-80 text-sm">{rtl?s.descAr:s.descEn}</p></div>))}</div></section>}

        {cfg.showCalc && <section className="py-20"><div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-10 text-center"><h2 className="text-3xl font-black mb-6">الحاسبة</h2><input type="range" min="1" max="12" value={pages} onChange={e=>setPages(Number(e.target.value))} className="w-full mb-6"/><div className="text-6xl font-black" style={{color}}>${price}</div><a href={LINK} className="inline-block mt-6 px-8 py-4 rounded-2xl font-bold text-black" style={{background:color}}>اطلب الآن</a></div></section>}

        <footer className="border-t border-white/10 py-10 text-center opacity-70">{rtl?cfg.logo:cfg.logoEn}<br/><a href={LINK} style={{color}} className="font-bold">{cfg.whatsapp}</a> • {cfg.email}</footer>
      </main>
    </div>
  );
}

function Toggle({label,val,set,color}){return <div className="flex justify-between items-center"><span className="text-sm">{label}</span><button onClick={()=>set(!val)}>{val?<ToggleRight size={26} style={{color}}/>:<ToggleLeft size={26} className="opacity-50"/>}</button></div>}
