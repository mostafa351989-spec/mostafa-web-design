import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Globe, Sun, Moon, Settings, Layout, Cpu, Zap, Sparkles, Sliders, ToggleLeft, ToggleRight, Plus, Trash2, Star, ArrowUpRight, Layers, Gauge, Shield, Upload, Download, Image as ImageIcon, Send
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
  heroImage: "",
  portfolio: [],
  showBeforeAfter: true,
  showServices: true,
  showCalc: true,
  services: [
    { titleAr: "صفحات هبوط هندسية", titleEn: "Engineered Landing Pages", descAr: "تصميم مخصص يركز على الإقناع.", descEn: "Tailored for conversion.", icon: "Zap" },
    { titleAr: "مواقع الشركات", titleEn: "Corporate Hubs", descAr: "موقع فخم يعرض أعمالك.", descEn: "Premium corporate presence.", icon: "Layers" },
    { titleAr: "تحسين السرعة", titleEn: "Performance", descAr: "تحميل أقل من ثانيتين.", descEn: "Sub 2s load times.", icon: "Gauge" }
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

const iconMap = { Zap, Layers, Gauge, Shield, Cpu, Layout };

export default function App() {
  const [cfg, setCfg] = useState(() => {
    try { const s = localStorage.getItem("mwd_cfg"); return s? {...defaultConfig,...JSON.parse(s) } : defaultConfig; } catch { return defaultConfig; }
  });
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState("appearance");
  const [slider, setSlider] = useState(50);
  const [pages, setPages] = useState(3);
  const [copied, setCopied] = useState(false);
  const [revIdx, setRevIdx] = useState(0);
  const [contact, setContact] = useState({name:"",phone:"",msg:""});
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const importRef = useRef(null);

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
    const count = Math.floor(cfg.intensity * 1.2);
    const pts = Array.from({ length: count }, () => ({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6, r: Math.random()*2+0.5 }));
    const draw = () => {
      ctx.clearRect(0,0,innerWidth,innerHeight);
      const mx = mouse.current.x, my = mouse.current.y;
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>innerWidth) p.vx*=-1;
        if (p.y<0||p.y>innerHeight) p.vy*=-1;
        const dx=p.x-mx, dy=p.y-my, d=Math.hypot(dx,dy);
        if (d<140){ p.x-=dx*0.006; p.y-=dy*0.006; }
        const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
        g.addColorStop(0,color+"ee"); g.addColorStop(1,color+"00");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*8,0,Math.PI*2); ctx.fill();
      });
      id=requestAnimationFrame(draw);
    };
    draw();
    addEventListener("resize", resize);
    return ()=>{ cancelAnimationFrame(id); removeEventListener("resize", resize); };
  }, [cfg.particles, color, cfg.intensity]);

  const update = (k,v)=> setCfg(c=>({...c,[k]:v}));

  const handleHeroUpload = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => update("heroImage", r.result); r.readAsDataURL(f);
  };

  const addPortfolio = () => {
    const id = Date.now();
    setCfg(c=>({...c, portfolio:[...c.portfolio, {id, titleAr:"مشروع جديد", titleEn:"New Project", image:"", url:"#"}]}));
  };
  const updatePortfolio = (id,k,v) => setCfg(c=>({...c, portfolio: c.portfolio.map(p=> p.id===id? {...p,[k]:v}:p)}));
  const removePortfolio = (id) => setCfg(c=>({...c, portfolio: c.portfolio.filter(p=>p.id!==id)}));
  const uploadPortfolioImage = (id, file) => {
    const r = new FileReader(); r.onload = () => updatePortfolio(id,"image",r.result); r.readAsDataURL(file);
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(cfg,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="mostafa-config.json"; a.click(); URL.revokeObjectURL(url);
  };
  const importConfig = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => { try { const obj = JSON.parse(r.result); setCfg({...defaultConfig,...obj}); } catch {} }; r.readAsText(f);
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();
    const text = `مرحبا مصطفى 👋\nالاسم: ${contact.name}\nالهاتف: ${contact.phone}\nالرسالة: ${contact.msg}`;
    window.open(`https://wa.me/2${cfg.whatsapp.replace(/^0/,'')}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copy = ()=>{ navigator.clipboard.writeText(cfg.email); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const features = [
    { icon: Shield, title: rtl?"أمان وأداء":"Secure & Fast", desc: rtl?"تشفير كامل وسرعة تحميل <1.5s":"Full encryption & <1.5s load" },
    { icon: Layers, title: rtl?"بنية معيارية":"Modular Arch", desc: rtl?"مكونات معزولة قابلة لإعادة الاستخدام":"Isolated reusable components" },
    { icon: Gauge, title: rtl?"تحسين التحويل":"CRO Ready", desc: rtl?"تصميم مبني على علم النفس البيعي":"Psychology-driven design" }
  ];

  const reviews = [
    { name: rtl?"م. أحمد":"Eng. Ahmed", role: rtl?"مدير وكالة":"Agency Owner", text: rtl?"دقة هندسية في كل بكسل.":"Pixel-perfect engineering." },
    { name: rtl?"أ. سارة":"Sarah", role: rtl?"مؤسسة متجر":"Store Founder", text: rtl?"المبيعات زادت 240% بعد الإطلاق.":"Sales up 240% after launch." }
  ];

  return (
    <div dir={rtl?"rtl":"ltr"} className={cfg.dark?"bg-[#020a0a] text-white min-h-screen":"bg-[#f8fafc] text-slate-900 min-h-screen"} style={{fontFamily:"Cairo, sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800;900&display=swap');`}</style>
      {cfg.particles && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{opacity:0.35}}/>}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{backgroundImage:`linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize:'80px 80px'}}/>

      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={()=>setMenu(true)} className="p-2.5 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 transition">
              <Settings size={18} style={{color}}/>
            </button>
            <div>
              <h1 className="text-xl font-black leading-tight" style={{color}}>{rtl?cfg.logo:cfg.logoEn}</h1>
              <div className="text-xs uppercase tracking-widest opacity-60">{rtl?"هندسة رقمية":"Digital Engineering"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>update("lang",cfg.lang==="ar"?"en":"ar")} className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-bold">{cfg.lang==="ar"?"EN":"AR"}</button>
            <button onClick={()=>update("dark",!cfg.dark)} className="p-2.5 rounded-xl bg-white/10 border border-white/15">{cfg.dark?<Sun size={16} className="text-amber-400"/>:<Moon size={16}/>}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 z-50" onClick={()=>setMenu(false)}/>
          <motion.div initial={{x:rtl?"100%":"-100%"}} animate={{x:0}} exit={{x:rtl?"100%":"-100%"}} className={`fixed top-0 bottom-0 ${rtl?"right-0":"left-0"} w-[440px] max-w-[95vw] bg-[#071312]/95 backdrop-blur-2xl border-white/10 p-5 z-50 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-black"><Sliders size={18} style={{color}}/> لوحة التحكم</div>
              <button onClick={()=>setMenu(false)} className="p-2 rounded-lg hover:bg-white/10"><X size={18}/></button>
            </div>
            <div className="flex gap-2 mb-4 text-xs flex-wrap">
              {["appearance","content","contact","media","data"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-lg border ${tab===t?"bg-white/20 border-white/30":"bg-white/5 border-white/10"}`}>{t}</button>
              ))}
            </div>

            {tab==="appearance" && <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(accents).map(([k,c])=>(
                  <button key={k} onClick={()=>update("accent",k)} className={`h-10 rounded-xl border-2 ${cfg.accent===k?"scale-110 border-white":"border-white/20"}`} style={{background:c}}/>
                ))}
              </div>
              <Toggle label="الجسيمات" val={cfg.particles} set={v=>update("particles",v)} color={color}/>
              <label className="text-sm block">الشدة: {cfg.intensity}</label>
              <input type="range" min="20" max="150" value={cfg.intensity} onChange={e=>update("intensity",Number(e.target.value))} className="w-full"/>
            </div>}

            {tab==="content" && <div className="space-y-3">
              <input value={cfg.heroTitle} onChange={e=>update("heroTitle",e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10" placeholder="عنوان"/>
              <input value={cfg.heroSpan} onChange={e=>update("heroSpan",e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10" placeholder="عنوان مميز"/>
              <textarea value={cfg.heroDesc} onChange={e=>update("heroDesc",e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10" rows="3"/>
            </div>}

            {tab==="contact" && <div className="space-y-3">
              <input value={cfg.whatsapp} onChange={e=>update("whatsapp",e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10" placeholder="واتساب"/>
              <input value={cfg.email} onChange={e=>update("email",e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-white/10" placeholder="إيميل"/>
            </div>}

            {tab==="media" && <div className="space-y-5">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm font-bold mb-2 flex items-center gap-2"><ImageIcon size={16}/> صورة الهيرو</div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleHeroUpload} className="hidden"/>
                <button onClick={()=>fileInputRef.current.click()} className="w-full py-2 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Upload size={16}/> رفع صورة</button>
                {cfg.heroImage && <img src={cfg.heroImage} className="mt-3 rounded-xl border-white/10 max-h-40 object-cover w-full"/>}
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-bold">معرض الأعمال</div>
                  <button onClick={addPortfolio} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs flex items-center gap-1"><Plus size={14}/> إضافة</button>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cfg.portfolio.map(p=>(
                    <div key={p.id} className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-2">
                      <div className="flex justify-between"><input value={p.titleAr} onChange={e=>updatePortfolio(p.id,"titleAr",e.target.value)} className="flex-1 bg-transparent outline-none text-sm" placeholder="عنوان"/><button onClick={()=>removePortfolio(p.id)} className="text-red-400"><Trash2 size={14}/></button></div>
                      <input value={p.url} onChange={e=>updatePortfolio(p.id,"url",e.target.value)} className="w-full px-2 py-1 rounded bg-black/40 border border-white/10 text-xs" placeholder="رابط المشروع"/>
                      <input type="file" accept="image/*" onChange={e=> e.target.files[0] && uploadPortfolioImage(p.id, e.target.files[0])} className="text-xs"/>
                      {p.image && <img src={p.image} className="rounded-lg max-h-24 object-cover w-full border border-white/10"/>}
                    </div>
                  ))}
                </div>
              </div>
            </div>}

            {tab==="data" && <div className="space-y-3">
              <button onClick={exportConfig} className="w-full py-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Download size={16}/> تصدير الإعدادات JSON</button>
              <input ref={importRef} type="file" accept=".json" onChange={importConfig} className="hidden"/>
              <button onClick={()=>importRef.current.click()} className="w-full py-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Upload size={16}/> استيراد إعدادات</button>
            </div>}
          </motion.div>
        </>}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-5 relative z-10">
        <section className="pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs mb-6">
              <Sparkles size={14} style={{color}}/> {rtl?"تصميم هندسي فاخر":"Luxury Engineering"}
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tight">
              {rtl?cfg.heroTitle:cfg.heroTitleEn}<br/>
              <span style={{color}}>{rtl?cfg.heroSpan:cfg.heroSpanEn}</span>
            </h1>
            <p className="mt-6 text-lg opacity-80 max-w-xl leading-relaxed">{rtl?cfg.heroDesc:cfg.heroDescEn}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={LINK} target="_blank" className="group px-8 py-4 rounded-2xl font-bold text-black flex items-center gap-2 hover:scale-[1.02] transition" style={{background:color}}>
                {rtl?cfg.ctaText:cfg.ctaTextEn} <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"/>
              </a>
              <button onClick={copy} className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition backdrop-blur">
                {copied?"✓ تم النسخ":rtl?"نسخ البريد":"Copy Email"}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
              {cfg.heroImage ? <img src={cfg.heroImage} className="w-full h-full object-cover rounded-[1.8rem]"/> : (
                <div className="h-full rounded-[1.8rem] bg-[#0a0f0f] border border-white/10 p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"/><div className="w-3 h-3 rounded-full bg-yellow-500/80"/><div className="w-3 h-3 rounded-full bg-green-500/80"/>
                  </div>
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    {Array.from({length:6}).map((_,i)=>(
                      <div key={i} className="rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Sparkles size={24} style={{color}} className="opacity-60"/>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 grid md:grid-cols-3 gap-6">
          {features.map((f,i)=>(
            <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <f.icon className="w-10 h-10 mb-5" style={{color}}/>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="opacity-75 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>

        {cfg.portfolio.length > 0 && (
          <section className="py-20">
            <h2 className="text-5xl font-black text-center mb-14">{rtl?"معرض الأعمال":"Portfolio"}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cfg.portfolio.map(p=>(
                <a key={p.id} href={p.url} target="_blank" className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
                  {p.image ? <img src={p.image} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"/> : <div className="h-64 flex items-center justify-center bg-black/30"><ImageIcon size={40} style={{color}} className="opacity-50"/></div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
                  <div className="absolute bottom-0 p-5">
                    <div className="text-xl font-bold">{rtl?p.titleAr:p.titleEn}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="py-20">
          <h2 className="text-5xl font-black text-center mb-14">{rtl?"قبل / بعد":"Before / After"}</h2>
          <div className="max-w-6xl mx-auto relative h-[520px] rounded-[2.5rem] overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[#0b1220] flex items-center justify-center">
              <Sparkles className="w-16 h-16" style={{color}}/>
            </div>
            <div className="absolute inset-0 bg-[#e2e8f0]" style={{clipPath:`inset(0 ${100-slider}% 0 0)`}}/>
            <input type="range" min="0" max="100" value={slider} onChange={e=>setSlider(e.target.value)} className="absolute inset-0 opacity-0 cursor-ew-resize"/>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-3xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-10">
            <h2 className="text-4xl font-black text-center mb-8">{rtl?"تواصل مباشر":"Contact Us"}</h2>
            <form onSubmit={sendWhatsApp} className="space-y-4">
              <input required value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} placeholder={rtl?"الاسم":"Name"} className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 outline-none"/>
              <input required value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} placeholder={rtl?"الهاتف":"Phone"} className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 outline-none"/>
              <textarea required value={contact.msg} onChange={e=>setContact({...contact,msg:e.target.value})} placeholder={rtl?"رسالتك":"Your message"} rows="4" className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 outline-none"/>
              <button type="submit" className="w-full py-4 rounded-2xl font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.01] transition" style={{background:color}}>
                <Send size={18}/> {rtl?"إرسال عبر واتساب":"Send via WhatsApp"}
              </button>
            </form>
          </div>
        </section>

        <footer className="border-t border-white/10 py-12 text-center opacity-70">
          <a href={LINK} style={{color}} className="font-bold">{cfg.whatsapp}</a> • {cfg.email}
        </footer>
      </main>
    </div>
  );
}

function Toggle({label,val,set,color}){return <div className="flex justify-between items-center py-2"><span className="text-sm">{label}</span><button onClick={()=>set(!val)}>{val?<ToggleRight size={26} style={{color}}/>:<ToggleLeft size={26} className="opacity-50"/>}</button></div>}
