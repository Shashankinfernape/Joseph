import React from 'react';
import { ArrowDownRight } from '@phosphor-icons/react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Header Section */}
      <section className="w-full border-b border-foreground/10">
        <div className="max-w-[1600px] mx-auto pt-24 pb-12 px-4 md:px-8 flex flex-col">
           <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter">
             About<br/>The Institute.
           </h1>
           <div className="mt-12 flex flex-col md:flex-row gap-8 justify-between items-start md:items-end border-t border-foreground/10 pt-8">
             <p className="max-w-xl text-lg md:text-xl font-medium uppercase tracking-widest leading-relaxed">
               A legacy of academic excellence, forging leaders of tomorrow through rigorous discipline and radical innovation.
             </p>
           </div>
        </div>
      </section>

      {/* Principal Quote Full Bleed */}
      <section className="w-full border-b border-foreground/10 flex flex-col md:flex-row h-auto">
        <div className="w-full md:w-1/2 bg-slate-900 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
            <img 
              src="https://stjosephschoolbangalore.org/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-22-at-1.00.26-PM.jpeg" 
              alt="Sr. Arockia Vinotha CIC - Principal" 
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-foreground text-background">
          <ArrowDownRight size={48} className="mb-12 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-8">
            "Education is not the preparation of life, education is life itself."
          </h2>
          <p className="text-sm text-background/80 leading-relaxed mb-8">
            We strive to respect the unique individuality of each child, cultivating wisdom alongside intelligence so every student is empowered to lead a purposeful life.
          </p>
          <div className="mt-auto pt-8 border-t border-background/20">
            <p className="text-sm font-bold uppercase tracking-widest">Sr. Arockia Vinotha CIC</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mt-1">Principal &amp; Secretary • B.Sc., MCA, M.Phil., (Ph.D)</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full border-b border-foreground/10">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/10 max-w-[1600px] mx-auto">
          <div className="p-8 md:p-16 flex flex-col gap-8 hover:bg-foreground/5 transition-colors">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Vision</h2>
            <p className="text-base font-bold uppercase tracking-widest leading-loose text-foreground/80">
              To be a beacon of transformative education under the guidance of the Congregation of the Immaculate Conception (CIC), nurturing spiritually rooted, intellectually curious, and morally upright students.
            </p>
          </div>
          <div className="p-8 md:p-16 flex flex-col gap-8 hover:bg-foreground/5 transition-colors">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Mission</h2>
            <p className="text-base font-bold uppercase tracking-widest leading-loose text-foreground/80">
              To provide child-centric experiential education, fostering critical thinking, sportsmanship, and values in a disciplined, compassionate environment that feels like a second home.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-b border-foreground/10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-foreground/10 max-w-[1600px] mx-auto">
          {[
            { value: "100%", label: "CBSE Board Pass Rate" },
            { value: "41+", label: "Years of Excellence (Est. 1985)" },
            { value: "1,800+", label: "Enrolled Students" },
            { value: "CIC", label: "Congregation (Est. 1911)" }
          ].map((stat, i) => (
             <div key={i} className="p-8 md:p-12 flex flex-col gap-4 text-center items-center justify-center min-h-[220px]">
               <div className="text-5xl md:text-7xl font-black tracking-tighter">{stat.value}</div>
               <div className="text-xs font-bold uppercase tracking-widest text-foreground/50">{stat.label}</div>
             </div>
          ))}
        </div>
      </section>

      {/* Governance */}
      <section className="w-full border-b border-foreground/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-foreground/10">
          <div className="w-full md:w-1/3 p-8 md:p-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter sticky top-24">
              School<br/>Leadership.
            </h2>
          </div>
          <div className="w-full md:w-2/3 flex flex-col divide-y divide-foreground/10">
            {[
              { name: "Sr. Arockia Vinotha CIC", role: "Principal & Secretary", qualification: "B.Sc., MCA, M.Phil., (Ph.D)" },
              { name: "Sr. Arul Jency CIC", role: "Vice Principal", qualification: "M.Sc., B.Ed." },
              { name: "Sr. Sudha CIC", role: "Bursar & Finance", qualification: "M.Com., B.Ed." },
              { name: "Sisters of CIC", role: "Patrons & Managing Society", qualification: "Origin 1911 • Global Educational Ministry" }
            ].map((member, i) => (
              <div key={i} className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-foreground/5 transition-colors cursor-pointer">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{member.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground/50">{member.role}</p>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-80 text-foreground/60">
                  {member.qualification}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
