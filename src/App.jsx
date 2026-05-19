import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Sun, Moon, Upload, Download, Plus, Trash2, X, MessageCircle } from "lucide-react";

const defaultConfig = {
  lang: "ar",
  dark: true,
  name: "مصطفى محمود عيسى",
  title: "مصمم مواقع - ثلاثي الأبعاد",
  bio: "أحول الأفكار إلى تجارب بصرية تفاعلية باستخدام أحدث التقنيات. متخصص في Three.js و Next.js",
  whatsapp: "01044907363",
  email: "mostafa351989@gmail.com",
  heroImage: "",
  skills: ["Three.js","React","Next.js","Tailwind CSS","TypeScript","MongoDB","Node.js"],
  services: [
    { icon:"🌐", title:"مواقع 3D تفاعلية", desc:"تصميم مواقع بتقنية Three.js وتجربة مستخدم فريدة تبهر زوارك" },
    { icon:"⚡", title:"تطوير Full Stack", desc:"بناء مواقع متكاملة من الواجهة لقواعد البيانات بأحدث التقنيات" },
    { icon:"🎨", title:"تصميم UI/UX", desc:"واجهات عصرية سريعة ومستجيبة مع تجربة سلسة" }
  ],
  stats: [
    { value:"+27", label:"مشروع منجز" },
    { value:"+15", label:"عميل سعيد" },
    { value:"+3", label:"سنين خبرة" },
    { value:"100%", label:"التزام بالمواعيد" }
  ],
  projects: [
    { title:"نظام إدارة المشاريع", desc:"منصة سحابية لإدارة الفرق والمهام بكفاءة عالية", icon:"ℹ️" },
    { title:"منصة التجارة الإلكترونية", desc:"نظام متكامل مع دفع إلكتروني ولوحة تحكم متقدمة", icon:"🛒" }
  ],
  tech: [
    { title:"تطوير الويب", tech:"React, Next.js, Node.js, TypeScript", icon:"🎓" },
    { title:"الحلول السحابية", tech:"AWS, Azure, Docker, Kubernetes", icon:">_"}
  ],
  portfolio: []
};

export default function App(){
  const [cfg,setCfg]=useState(()=>{try{const s=localStorage.getItem("mwd_cfg_v2");return s?{...defaultConfig,...JSON.parse(s)}:defaultConfig}catch{return defaultConfig}});
  const [menu,setMenu]=useState(false);
  const [tab,setTab]=useState("content");
  const [contact,setContact]=useState({name:"",email:"",msg:""});
  const canvasRef=useRef(null);
  const importRef=useRef(null);

  useEffect(()=>{localStorage.setItem("mwd_cfg_v2",JSON.stringify(cfg))},[cfg]);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d"); let id;
    const DPR=window.devicePixelRatio||1;
    const resize=()=>{canvas.width=innerWidth*DPR; canvas.height=innerHeight*DPR; canvas.style.width=innerWidth+"px"; canvas.style.height=innerHeight+"px"; ctx.scale(DPR,DPR)};
    resize();
    const stars=Array.from({length:200},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2,s:Math.random()*0.5+0.2}));
    const draw=()=>{ctx.clearRect(0,0,innerWidth,innerHeight); stars.forEach(s=>{s.y+=s.s; if(s.y>innerHeight)s.y=0; ctx.fillStyle="rgba(255,255,255,"+(0.3+Math.random()*0.7)+")"; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill()}); id=requestAnimationFrame(draw)}; draw();
    addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(id); removeEventListener("resize",resize)}
  },[]);

  const update=(k,v)=>setCfg(c=>({...c,[k]:v}));
  const toggleDark=()=>update("dark",!cfg.dark);

  const exportCfg=()=>{const blob=new Blob([JSON.stringify(cfg,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="mostafa-config.json"; a.click(); URL.revokeObjectURL(url)};
  const importCfg=(e)=>{const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{try{setCfg({...defaultConfig,...JSON.parse(r.result)})}catch{}}; r.readAsText(f)};

  const addPortfolio=()=>setCfg(c=>({...c,portfolio:[...c.portfolio,{id:Date.now(),title:"مشروع جديد",image:"",url:"#"}]}));
  const updatePortfolio=(id,k,v)=>setCfg(c=>({...c,portfolio:c.portfolio.map(p=>p.id===id?{...p,[k]:v}:p)}));
  const removePortfolio=id=>setCfg(c=>({...c,portfolio:c.portfolio.filter(p=>p.id!==id)}));
  const uploadPortfolio=(id,file)=>{const r=new FileReader(); r.onload=()=>updatePortfolio(id,"image",r.result); r.readAsDataURL(file)};

  const sendWhatsApp=(e)=>{e.preventDefault(); const text=`مرحبا مصطفى 👋\nالاسم: ${contact.name}\nالإيميل: ${contact.email}\nالرسالة: ${contact.msg}`; window.open(`https://wa.me/2${cfg.whatsapp.replace(/^0/,'')}?text=${encodeURIComponent(text)}`,"_blank")};

  const gold="#d4af37";

  return(
    <div dir="rtl" className="min-h-screen bg-black text-white relative overflow-x-hidden" style={{fontFamily:"Cairo, sans-serif", background:"radial-gradient(ellipse at top left, #3a2a00 0%, #000 60%)"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');`}</style>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-60"/>
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none" style={{background:`radial-gradient(circle, ${gold} 0%, transparent 70%)`}}/>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-yellow-700/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={()=>update("lang",cfg.lang==="ar"?"en":"ar")} className="px-4 py-3 rounded-2xl border-2 border-yellow-600 text-yellow-500 font-bold">English</button>
            <button onClick={toggleDark} className="px-4 py-3 rounded-2xl border-2 border-yellow-600 text-yellow-500 font-bold flex items-center gap-2">نهار ☀️</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-yellow-500 leading-tight" style={{textShadow:`0 0 20px ${gold}80`}}>{cfg.name.split(" ")[0]}<br/>{cfg.name.split(" ")[1]}</div>
            </div>
            <button onClick={()=>setMenu(true)} className="p-3 rounded-2xl border-2 border-yellow-600 text-yellow-500 hover:bg-yellow-600/10"><Settings size={22}/></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 z-50" onClick={()=>setMenu(false)}/>
          <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 bottom-0 right-0 w-[420px] max-w-[95vw] bg-[#0a0a]/95 backdrop-blur-2xl border-l border-yellow-700/30 p-5 z-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-yellow-700/30 pb-3">
              <div className="font-black text-yellow-500">لوحة التحكم</div>
              <button onClick={()=>setMenu(false)} className="p-2 hover:bg-white/10 rounded-lg"><X size={18}/></button>
            </div>
            <div className="flex gap-2 mb-4 text-xs">
              {["content","media","data"].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-lg border ${tab===t?"bg-yellow-600 text-black border-yellow-500":"bg-white/5 border-white/10 text-white"}`}>{t}</button>)}
            </div>
            {tab==="content" && <div className="space-y-3">
              <input value={cfg.name} onChange={e=>update("name",e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/60 border border-yellow-700/40 text-white" placeholder="الاسم"/>
              <input value={cfg.title} onChange={e=>update("title",e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/60 border border-yellow-700/40 text-white" placeholder="المسمى"/>
              <textarea value={cfg.bio} onChange={e=>update("bio",e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/60 border border-yellow-700/40 text-white" rows="3"/>
              <input value={cfg.whatsapp} onChange={e=>update("whatsapp",e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/60 border border-yellow-700/40 text-white" placeholder="واتساب"/>
            </div>}
            {tab==="media" && <div className="space-y-4">
              <button onClick={addPortfolio} className="w-full py-2 rounded-xl bg-yellow-600 text-black font-bold flex items-center justify-center gap-2"><Plus size={16}/> إضافة مشروع</button>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {cfg.portfolio.map(p=>(
                  <div key={p.id} className="p-3 rounded-xl bg-white/5 border border-yellow-700/30 space-y-2">
                    <div className="flex justify-between"><input value={p.title} onChange={e=>updatePortfolio(p.id,"title",e.target.value)} className="bg-transparent outline-none flex-1 text-sm"/><button onClick={()=>removePortfolio(p.id)} className="text-red-400"><Trash2 size={14}/></button></div>
                    <input type="file" accept="image/*" onChange={e=>e.target.files[0]&&uploadPortfolio(p.id,e.target.files[0])} className="text-xs"/>
                    {p.image && <img src={p.image} className="rounded-lg max-h-32 w-full object-cover"/>}
                  </div>
                ))}
              </div>
            </div>}
            {tab==="data" && <div className="space-y-3">
              <button onClick={exportCfg} className="w-full py-3 rounded-xl bg-yellow-600 text-black font-bold flex items-center justify-center gap-2"><Download size={16}/> تصدير JSON</button>
              <input ref={importRef} type="file" accept=".json" onChange={importCfg} className="hidden"/>
              <button onClick={()=>importRef.current.click()} className="w-full py-3 rounded-xl bg-white/10 border border-yellow-700/40 flex items-center justify-center gap-2"><Upload size={16}/> استيراد</button>
            </div>}
          </motion.div>
        </>}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 relative z-10 pb-32">
        <section className="pt-16 pb-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-yellow-500 mb-3" style={{textShadow:`0 0 30px ${gold}60`}}>{cfg.name}</h1>
          <p className="text-xl text-white/80 mb-6">{cfg.title}</p>
          <p className="max-w-2xl mx-auto text-white/70 leading-relaxed mb-8">{cfg.bio}</p>
          <div className="flex justify-center"><div className="px-6 py-3 rounded-full border-2 border-yellow-600 bg-black/50 backdrop-blur text-white">واتساب: {cfg.whatsapp}</div></div>
          <button className="mt-6 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black text-xl shadow-[0_40px_rgba(212,175,55,0.5)]">شوف شغلي</button>
        </section>

        <section className="py-12">
          <h2 className="text-4xl font-black text-center text-white mb-8">المهارات</h2>
          <div className="flex flex-wrap justify-center gap-4">{cfg.skills.map(s=><div key={s} className="px-6 py-3 rounded-full bg-black/60 border-2 border-yellow-700/50 text-white backdrop-blur">{s}</div>)}</div>
        </section>

        <section className="py-12 space-y-6">
          {cfg.services.map((s,i)=>(
            <div key={i} className="p-8 rounded-3xl bg-black/70 border-2 border-yellow-700/40 backdrop-blur-xl">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-3xl font-black text-yellow-500 mb-3">{s.title}</h3>
              <p className="text-white/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </section>

        <section className="py-12 grid grid-cols-2 gap-6">
          {cfg.stats.map((s,i)=>(
            <div key={i} className="aspect-square rounded-3xl bg-black/70 border-2 border-yellow-700/40 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6">
              <div className="text-5xl font-black text-yellow-500 mb-2" style={{textShadow:`0 0 20px ${gold}`}}>{s.value}</div>
              <div className="text-white/80">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="py-12">
          <h2 className="text-5xl font-black text-center text-yellow-500 mb-10" style={{textShadow:`0 0 30px ${gold}`}}>المشاريع</h2>
          <div className="space-y-6">
            {cfg.projects.map((p,i)=>(
              <div key={i} className="p-8 rounded-3xl bg-black/70 border-2 border-yellow-700/40 backdrop-blur-xl">
                <div className="w-full aspect-video rounded-2xl border-2 border-yellow-700/40 bg-black/50 flex items-center justify-center text-6xl mb-6">{p.icon}</div>
                <h3 className="text-3xl font-black text-yellow-500 mb-3">{p.title}</h3>
                <p className="text-white/80">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-5xl font-black text-center text-yellow-500 mb-10">المهارات التقنية</h2>
          <div className="space-y-6">
            {cfg.tech.map((t,i)=>(
              <div key={i} className="p-8 rounded-3xl bg-black/70 border-2 border-yellow-700/40 backdrop-blur-xl text-center">
                <div className="text-5xl mb-4">{t.icon}</div>
                <h3 className="text-3xl font-black text-yellow-500 mb-3">{t.title}</h3>
                <p className="text-white/70">{t.tech}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="p-8 rounded-3xl bg-black/70 border-2 border-yellow-700/40 backdrop-blur-xl">
            <h2 className="text-5xl font-black text-center text-yellow-500 mb-3">تواصل معايا</h2>
            <p className="text-center text-white/70 mb-8">عندك مشروع؟ ابعتلي وهنبدأ على طول</p>
            <form onSubmit={sendWhatsApp} className="space-y-4">
              <input required value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} placeholder="الاسم" className="w-full px-5 py-4 rounded-2xl bg-black/60 border-2 border-yellow-700/40 text-white placeholder-white/50 outline-none"/>
              <input required type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} placeholder="الإيميل" className="w-full px-5 py-4 rounded-2xl bg-black/60 border-2 border-yellow-700/40 text-white placeholder-white/50 outline-none"/>
              <textarea required value={contact.msg} onChange={e=>setContact({...contact,msg:e.target.value})} placeholder="الرسالة" rows="5" className="w-full px-5 py-4 rounded-2xl bg-black/60 border-2 border-yellow-700/40 text-white placeholder-white/50 outline-none"/>
              <button type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black text-xl">إرسال الرسالة</button>
            </form>
          </div>
        </section>
      </main>

      <a href={`https://wa.me/2${cfg.whatsapp.replace(/^0/,'')}`} target="_blank" className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.7)]"><MessageCircle size={32} className="text-white"/></a>
    </div>
  )
}
