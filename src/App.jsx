import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, ChevronRight, ChevronLeft, Plus, Trash2, Download, Upload, MessageCircle, Palette, Type, Sparkles, Sliders, Shield, Database } from "lucide-react";

const defaultConfig = {
  lang: "ar",
  dark: true,
  siteName: "مصطفى محمود عيسى",
  tagline: "مصمم مواقع - ثلاثي الأبعاد",
  bio: "أحول الأفكار إلى تجارب بصرية تفاعلية باستخدام أحدث التقنيات. متخصص في Three.js و Next.js",
  whatsapp: "01044907363",
  email: "mostafa351989@gmail.com",
  accent: "#d4af37",
  font: "Cairo",
  radius: 24,
  glass: 0.7,
  stars: 180,
  animations: true,
  heroTitle: "مصطفى محمود عيسى",
  heroSubtitle: "مصمم مواقع - ثلاثي الأبعاد",
  heroBio: "أحول الأفكار إلى تجارب بصرية تفاعلية باستخدام أحدث التقنيات.",
  heroCta: "شوف شغلي",
  showBadge: true,
  skills: ["Three.js","React","Next.js","Tailwind CSS","TypeScript","MongoDB","Node.js"],
  services: [
    {icon:"🌐",title:"مواقع 3D تفاعلية",desc:"تصميم مواقع بتقنية Three.js وتجربة مستخدم فريدة"},
    {icon:"⚡",title:"تطوير Full Stack",desc:"بناء مواقع متكاملة من الواجهة لقواعد البيانات"},
    {icon:"🎨",title:"تصميم UI/UX",desc:"واجهات عصرية سريعة ومستجيبة"}
  ],
  stats: [
    {value:"+27",label:"مشروع منجز"},
    {value:"+15",label:"عميل سعيد"},
    {value:"+3",label:"سنين خبرة"},
    {value:"100%",label:"التزام بالمواعيد"}
  ],
  projects: [
    {title:"نظام إدارة المشاريع",desc:"منصة سحابية لإدارة الفرق",icon:"ℹ️"},
    {title:"منصة التجارة الإلكترونية",desc:"نظام متكامل مع دفع إلكتروني",icon:"🛒"}
  ],
  tech: [
    {title:"تطوير الويب",tech:"React, Next.js, Node.js, TypeScript",icon:"🎓"},
    {title:"الحلول السحابية",tech:"AWS, Azure, Docker, Kubernetes",icon:">_"}
  ],
  portfolio: [],
  contactTitle: "تواصل معايا",
  contactDesc: "عندك مشروع؟ ابعتلي وهنبدأ على طول",
  metaTitle: "مصطفى محمود - مصمم مواقع",
  metaDesc: "مصمم مواقع ثلاثية الأبعاد وتجارب تفاعلية",
  customCss: "",
  maintenance: false,
  analytics: ""
};

const fonts = ["Cairo","Tajawal","Almarai","IBM Plex Sans Arabic"];
const accents = ["#d4af37","#39ff14","#00b4d8","#a855f7","#ec4899","#ff6b35"];

export default function App(){
  const [cfg,setCfg]=useState(()=>{try{const s=localStorage.getItem("mwd_cfg_pro");return s?{...defaultConfig,...JSON.parse(s)}:defaultConfig}catch{return defaultConfig}});
  const [menu,setMenu]=useState(false);
  const [view,setView]=useState("main");
  const [contact,setContact]=useState({name:"",email:"",msg:""});
  const canvasRef=useRef(null);
  const importRef=useRef(null);

  useEffect(()=>{localStorage.setItem("mwd_cfg_pro",JSON.stringify(cfg))},[cfg]);

  // Stars
  useEffect(()=>{
    const c=canvasRef.current; if(!c) return;
    const ctx=c.getContext("2d"); let id;
    const DPR=window.devicePixelRatio||1;
    const resize=()=>{c.width=innerWidth*DPR; c.height=innerHeight*DPR; c.style.width=innerWidth+"px"; c.style.height=innerHeight+"px"; ctx.setTransform(1,0,0,1,0,0); ctx.scale(DPR,DPR)};
    resize();
    const stars=Array.from({length:cfg.stars},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3,s:Math.random()*0.5+0.1}));
    const draw=()=>{ctx.clearRect(0,0,innerWidth,innerHeight); stars.forEach(st=>{st.y+=st.s; if(st.y>innerHeight)st.y=0; ctx.fillStyle=`rgba(255,255,255,${0.4+Math.random()*0.6})`; ctx.beginPath(); ctx.arc(st.x,st.y,st.r,0,Math.PI*2); ctx.fill()}); id=requestAnimationFrame(draw)};
    if(cfg.animations) draw();
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(id); window.removeEventListener("resize",resize)}
  },[cfg.stars,cfg.animations]);

  const update=(k,v)=>setCfg(c=>({...c,[k]:v}));
  const updateArr=(k,idx,field,val)=>setCfg(c=>({...c,[k]:c[k].map((it,i)=>i===idx?{...it,[field]:val}:it)}));
  const addService=()=>setCfg(c=>({...c,services:[...c.services,{icon:"✨",title:"خدمة جديدة",desc:"وصف"}]}));
  const removeService=i=>setCfg(c=>({...c,services:c.services.filter((_,j)=>j!==i)}));
  const addPortfolio=()=>setCfg(c=>({...c,portfolio:[...c.portfolio,{id:Date.now(),title:"مشروع جديد",image:""}]}));
  const updatePortfolio=(id,k,v)=>setCfg(c=>({...c,portfolio:c.portfolio.map(p=>p.id===id?{...p,[k]:v}:p)}));
  const removePortfolio=id=>setCfg(c=>({...c,portfolio:c.portfolio.filter(p=>p.id!==id)}));
  const uploadPortfolio=(id,file)=>{const r=new FileReader(); r.onload=()=>updatePortfolio(id,"image",r.result); r.readAsDataURL(file)};
  const exportCfg=()=>{const b=new Blob([JSON.stringify(cfg,null,2)],{type:"application/json"}); const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download="settings.json"; a.click(); URL.revokeObjectURL(u)};
  const importCfg=e=>{const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{try{setCfg({...defaultConfig,...JSON.parse(r.result)})}catch{}}; r.readAsText(f)};
  const sendWA=e=>{e.preventDefault(); const t=`مرحبا ${cfg.siteName} 👋\nالاسم: ${contact.name}\nالإيميل: ${contact.email}\nالرسالة: ${contact.msg}`; window.open(`https://wa.me/2${cfg.whatsapp.replace(/^0/,'')}?text=${encodeURIComponent(t)}`,"_blank")};

  const categories = [
    {id:"general",name:"عام",icon:Settings,desc:"الاسم، اللغة، التواصل"},
    {id:"appearance",name:"المظهر",icon:Palette,desc:"ألوان، خط، حواف، تأثيرات"},
    {id:"hero",name:"الهيرو",icon:Sparkles,desc:"العنوان، الوصف، الزر"},
    {id:"content",name:"المحتوى",icon:Type,desc:"المهارات والخدمات"},
    {id:"stats",name:"الإحصائيات",icon:Sliders,desc:"الأرقام والإنجازات"},
    {id:"projects",name:"المشاريع",icon:Shield,desc:"قائمة المشاريع"},
    {id:"portfolio",name:"المعرض",icon:Plus,desc:"معرض الأعمال"},
    {id:"contact",name:"التواصل",icon:MessageCircle,desc:"نموذج وواتساب"},
    {id:"seo",name:"السيو",icon:Database,desc:"ميتا تاج ووصف"},
    {id:"advanced",name:"متقدم",icon:Sliders,desc:"CSS، تحليلات، صيانة"},
    {id:"data",name:"البيانات",icon:Download,desc:"تصدير واستيراد"}
  ];

  const radiusPx = cfg.radius;
  const glassBg = `rgba(0,0,0,${cfg.glass})`;

  return(
    <div dir="rtl" className="min-h-screen bg-black text-white relative overflow-x-hidden" style={{fontFamily:`"${cfg.font}", Cairo, sans-serif`, background:"radial-gradient(ellipse at top, #2a1f00 0%, #000 60%)"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Tajawal:wght@400;700&family=Almarai:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap');`}</style>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-70"/>
      <div className="fixed top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{background:`radial-gradient(circle, ${cfg.accent}, transparent 70%)`}}/>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b" style={{borderColor:`${cfg.accent}40`}}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-4 py-3 rounded-2xl border-2 text-white font-bold" style={{borderColor:cfg.accent,color:cfg.accent}}>English</button>
            <button className="px-4 py-3 rounded-2xl border-2 text-white font-bold" style={{borderColor:cfg.accent,color:cfg.accent}}>نهار ☀️</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <div className="text-2xl font-black" style={{color:cfg.accent,textShadow:`0 0 15px ${cfg.accent}80`}}>{cfg.siteName.split(" ")[0]}<br/>{cfg.siteName.split(" ")[1]||""}</div>
            </div>
            <button onClick={()=>{setMenu(true);setView("main")}} className="p-3 rounded-2xl border-2 hover:bg-white/10" style={{borderColor:cfg.accent,color:cfg.accent}}><Settings size={22}/></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 z-50" onClick={()=>setMenu(false)}/>
          <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 bottom-0 right-0 w-[440px] max-w-[95vw] bg-[#0b0b0b]/98 backdrop-blur-2xl border-l z-50 flex flex-col" style={{borderColor:`${cfg.accent}40`}}>
            <div className="p-5 border-b flex items-center gap-3" style={{borderColor:`${cfg.accent}30`}}>
              {view!=="main" && <button onClick={()=>setView("main")} className="p-2 hover:bg-white/10 rounded-lg"><ChevronRight size={20}/></button>}
              <div className="font-black text-xl" style={{color:cfg.accent}}>{view==="main"?"الإعدادات":categories.find(c=>c.id===view)?.name}</div>
              <button onClick={()=>setMenu(false)} className="mr-auto p-2 hover:bg-white/10 rounded-lg"><X size={18}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {view==="main" && <div className="space-y-2">
                {categories.map(c=>(
                  <button key={c.id} onClick={()=>setView(c.id)} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition">
                    <c.icon size={22} style={{color:cfg.accent}}/>
                    <div className="flex-1">
                      <div className="font-bold">{c.name}</div>
                      <div className="text-xs opacity-70">{c.desc}</div>
                    </div>
                    <ChevronLeft size={18} className="opacity-50"/>
                  </button>
                ))}
              </div>}

              {view==="general" && <div className="space-y-4">
                <Field label="اسم الموقع"><input value={cfg.siteName} onChange={e=>update("siteName",e.target.value)} className="input"/></Field>
                <Field label="السطر التعريفي"><input value={cfg.tagline} onChange={e=>update("tagline",e.target.value)} className="input"/></Field>
                <Field label="واتساب"><input value={cfg.whatsapp} onChange={e=>update("whatsapp",e.target.value)} className="input"/></Field>
                <Field label="البريد"><input value={cfg.email} onChange={e=>update("email",e.target.value)} className="input"/></Field>
              </div>}

              {view==="appearance" && <div className="space-y-5">
                <Field label="اللون المميز">
                  <div className="flex gap-2 flex-wrap">{accents.map(c=><button key={c} onClick={()=>update("accent",c)} className="w-10 h-10 rounded-xl border-2" style={{background:c,borderColor:cfg.accent===c?"white":"transparent"}}/>)}</div>
                </Field>
                <Field label="الخط"><select value={cfg.font} onChange={e=>update("font",e.target.value)} className="input">{fonts.map(f=><option key={f} value={f}>{f}</option>)}</select></Field>
                <Field label={`نصف القطر: ${cfg.radius}px`}><input type="range" min="0" max="48" value={cfg.radius} onChange={e=>update("radius",+e.target.value)} className="w-full"/></Field>
                <Field label={`شفافية الزجاج: ${Math.round(cfg.glass*100)}%`}><input type="range" min="0.3" max="0.95" step="0.05" value={cfg.glass} onChange={e=>update("glass",+e.target.value)} className="w-full"/></Field>
                <Field label={`كثافة النجوم: ${cfg.stars}`}><input type="range" min="50" max="400" value={cfg.stars} onChange={e=>update("stars",+e.target.value)} className="w-full"/></Field>
                <Toggle label="تفعيل الحركات" value={cfg.animations} onChange={v=>update("animations",v)}/>
              </div>}

              {view==="hero" && <div className="space-y-4">
                <Field label="العنوان الرئيسي"><input value={cfg.heroTitle} onChange={e=>update("heroTitle",e.target.value)} className="input"/></Field>
                <Field label="العنوان الفرعي"><input value={cfg.heroSubtitle} onChange={e=>update("heroSubtitle",e.target.value)} className="input"/></Field>
                <Field label="الوصف"><textarea value={cfg.heroBio} onChange={e=>update("heroBio",e.target.value)} rows="3" className="input"/></Field>
                <Field label="نص الزر"><input value={cfg.heroCta} onChange={e=>update("heroCta",e.target.value)} className="input"/></Field>
                <Toggle label="إظهار شارة واتساب" value={cfg.showBadge} onChange={v=>update("showBadge",v)}/>
              </div>}

              {view==="content" && <div className="space-y-5">
                <Field label="المهارات (افصل بفاصلة)"><textarea value={cfg.skills.join(", ")} onChange={e=>update("skills",e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} rows="3" className="input"/></Field>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="font-bold">الخدمات</span><button onClick={addService} className="px-3 py-1 rounded-lg bg-white/10 text-sm flex items-center gap-1"><Plus size={14}/> إضافة</button></div>
                  {cfg.services.map((s,i)=>(
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <input value={s.title} onChange={e=>updateArr("services",i,"title",e.target.value)} className="w-full bg-transparent outline-none font-bold"/>
                      <textarea value={s.desc} onChange={e=>updateArr("services",i,"desc",e.target.value)} rows="2" className="w-full bg-transparent outline-none text-sm opacity-80"/>
                      <button onClick={()=>removeService(i)} className="text-red-400 text-xs flex items-center gap-1"><Trash2 size={14}/> حذف</button>
                    </div>
                  ))}
                </div>
              </div>}

              {view==="stats" && <div className="space-y-3">
                {cfg.stats.map((s,i)=>(
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <input value={s.value} onChange={e=>updateArr("stats",i,"value",e.target.value)} className="input"/>
                    <input value={s.label} onChange={e=>updateArr("stats",i,"label",e.target.value)} className="input"/>
                  </div>
                ))}
              </div>}

              {view==="projects" && <div className="space-y-3">
                {cfg.projects.map((p,i)=>(
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <input value={p.title} onChange={e=>updateArr("projects",i,"title",e.target.value)} className="w-full bg-transparent outline-none font-bold"/>
                    <textarea value={p.desc} onChange={e=>updateArr("projects",i,"desc",e.target.value)} rows="2" className="w-full bg-transparent outline-none text-sm opacity-80"/>
                  </div>
                ))}
              </div>}

              {view==="portfolio" && <div className="space-y-3">
                <button onClick={addPortfolio} className="w-full py-2 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Plus size={16}/> إضافة مشروع</button>
                {cfg.portfolio.map(p=>(
                  <div key={p.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex gap-2"><input value={p.title} onChange={e=>updatePortfolio(p.id,"title",e.target.value)} className="flex-1 bg-transparent outline-none text-sm"/><button onClick={()=>removePortfolio(p.id)} className="text-red-400"><Trash2 size={14}/></button></div>
                    <input type="file" accept="image/*" onChange={e=>e.target.files[0]&&uploadPortfolio(p.id,e.target.files[0])} className="text-xs w-full"/>
                    {p.image && <img src={p.image} className="rounded-lg w-full h-32 object-cover"/>}
                  </div>
                ))}
              </div>}

              {view==="contact" && <div className="space-y-4">
                <Field label="عنوان القسم"><input value={cfg.contactTitle} onChange={e=>update("contactTitle",e.target.value)} className="input"/></Field>
                <Field label="الوصف"><textarea value={cfg.contactDesc} onChange={e=>update("contactDesc",e.target.value)} rows="2" className="input"/></Field>
              </div>}

              {view==="seo" && <div className="space-y-4">
                <Field label="Meta Title"><input value={cfg.metaTitle} onChange={e=>update("metaTitle",e.target.value)} className="input"/></Field>
                <Field label="Meta Description"><textarea value={cfg.metaDesc} onChange={e=>update("metaDesc",e.target.value)} rows="3" className="input"/></Field>
              </div>}

              {view==="advanced" && <div className="space-y-4">
                <Field label="CSS مخصص"><textarea value={cfg.customCss} onChange={e=>update("customCss",e.target.value)} rows="4" className="input font-mono text-xs" placeholder="/* اكتب CSS هنا */"/></Field>
                <Field label="معرف التحليلات"><input value={cfg.analytics} onChange={e=>update("analytics",e.target.value)} className="input" placeholder="G-XXXX"/></Field>
                <Toggle label="وضع الصيانة" value={cfg.maintenance} onChange={v=>update("maintenance",v)}/>
              </div>}

              {view==="data" && <div className="space-y-3">
                <button onClick={exportCfg} className="w-full py-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Download size={16}/> تصدير الإعدادات</button>
                <input ref={importRef} type="file" accept=".json" onChange={importCfg} className="hidden"/>
                <button onClick={()=>importRef.current.click()} className="w-full py-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center gap-2"><Upload size={16}/> استيراد</button>
                <button onClick={()=>{localStorage.removeItem("mwd_cfg_pro"); location.reload()}} className="w-full py-3 rounded-xl bg-red-600/20 border border-red-600/40 text-red-400">إعادة ضبط المصنع</button>
              </div>}
            </div>
          </motion.div>
        </>}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 relative z-10 pb-28">
        <section className="pt-16 pb-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-3" style={{color:cfg.accent,textShadow:`0 0 25px ${cfg.accent}70`}}>{cfg.heroTitle}</h1>
          <p className="text-xl text-white/80 mb-5">{cfg.heroSubtitle}</p>
          <p className="max-w-2xl mx-auto text-white/70 leading-relaxed mb-8">{cfg.heroBio}</p>
          {cfg.showBadge && <div className="inline-flex px-6 py-3 rounded-full border-2 bg-black/60 backdrop-blur text-white" style={{borderColor:cfg.accent,borderRadius:`${radiusPx}px`}}>واتساب: {cfg.whatsapp}</div>}
          <div className="mt-6"><button className="px-10 py-4 rounded-full font-black text-xl text-black" style={{background:`linear-gradient(90deg, ${cfg.accent}, #fff)`,borderRadius:`${radiusPx}px`}}>{cfg.heroCta}</button></div>
        </section>

        <section className="py-12">
          <h2 className="text-4xl font-black text-center text-white mb-8">المهارات</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {cfg.skills.map(s=><div key={s} className="px-5 py-2.5 border-2 bg-black/60 backdrop-blur text-white" style={{borderColor:`${cfg.accent}80`,borderRadius:`${radiusPx}px`}}>{s}</div>)}
          </div>
        </section>

        <section className="py-12 space-y-6">
          {cfg.services.map((s,i)=>(
            <div key={i} className="p-8 border-2 backdrop-blur-xl" style={{background:glassBg,borderColor:`${cfg.accent}60`,borderRadius:`${radiusPx}px`}}>
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-3xl font-black mb-3" style={{color:cfg.accent}}>{s.title}</h3>
              <p className="text-white/80">{s.desc}</p>
            </div>
          ))}
        </section>

        <section className="py-12 grid grid-cols-2 gap-6">
          {cfg.stats.map((s,i)=>(
            <div key={i} className="aspect-square border-2 backdrop-blur-xl flex flex-col items-center justify-center" style={{background:glassBg,borderColor:`${cfg.accent}60`,borderRadius:`${radiusPx}px`}}>
              <div className="text-5xl font-black mb-2" style={{color:cfg.accent}}>{s.value}</div>
              <div className="text-white/80">{s.label}</div>
            </div>
          ))}
        </section>

        {cfg.portfolio.length>0 && (
          <section className="py-12">
            <h2 className="text-5xl font-black text-center mb-10" style={{color:cfg.accent}}>معرض الأعمال</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cfg.portfolio.map(p=>(
                <div key={p.id} className="overflow-hidden border-2 bg-black/70" style={{borderColor:`${cfg.accent}60`,borderRadius:`${radiusPx}px`}}>
                  {p.image? <img src={p.image} className="w-full h-64 object-cover"/> : <div className="h-64 flex items-center justify-center text-5xl">🖼️</div>}
                  <div className="p-5 font-bold">{p.title}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="py-12">
          <div className="p-8 border-2 backdrop-blur-xl" style={{background:glassBg,borderColor:`${cfg.accent}60`,borderRadius:`${radiusPx}px`}}>
            <h2 className="text-5xl font-black text-center mb-3" style={{color:cfg.accent}}>{cfg.contactTitle}</h2>
            <p className="text-center text-white/70 mb-8">{cfg.contactDesc}</p>
            <form onSubmit={sendWA} className="space-y-4 max-w-2xl mx-auto">
              <input required value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} placeholder="الاسم" className="w-full px-5 py-4 rounded-2xl bg-black/70 border-2 text-white placeholder-white/50 outline-none" style={{borderColor:`${cfg.accent}60`,borderRadius:`${radiusPx}px`}}/>
              <input required type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} placeholder="الإيميل" className="w-full px-5 py-4 rounded-2xl bg-black/70 border-2 text-white placeholder-white/50 outline-none" style={{borderColor:`${cfg.accent}60`,borderRadius:`${radiusPx}px`}}/>
              <textarea required value={contact.msg} onChange={e=>setContact({...contact,msg:e.target.value})} placeholder="الرسالة" rows="5" className="w-full px-5 py-4 rounded-2xl bg-black/70 border-2 text-white placeholder-white/50 outline-none" style={{borderColor:`${cfg.accent}60`,borderRadius:`${radiusPx}px`}}/>
              <button className="w-full py-5 rounded-2xl font-black text-xl text-black" style={{background:`linear-gradient(90deg, ${cfg.accent}, #fff)`,borderRadius:`${radiusPx}px`}}>إرسال الرسالة</button>
            </form>
          </div>
        </section>
      </main>

      <a href={`https://wa.me/2${cfg.whatsapp.replace(/^0/,'')}`} target="_blank" className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.7)]"><MessageCircle size={30} className="text-white"/></a>

      <style>{cfg.customCss}</style>
    </div>
  )
}

function Field({label,children}){return <div><div className="text-sm opacity-80 mb-2">{label}</div>{children}</div>}
function Toggle({label,value,onChange}){return <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span>{label}</span><button onClick={()=>onChange(!value)} className={`w-12 h-7 rounded-full relative transition ${value?"bg-yellow-600":"bg-white/20"}`}><span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition ${value?"right-0.5":"left-0.5"}`}/></button></div>}
const input="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white outline-none focus:border-yellow-600";
if(typeof document!=="undefined"){const s=document.createElement("style"); s.innerHTML=`.input{${input}}`; document.head.appendChild(s)}
