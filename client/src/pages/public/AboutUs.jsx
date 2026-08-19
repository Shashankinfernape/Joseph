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
      <section className="w-full border-b border-foreground/10 flex flex-col md:flex-row h-auto md:h-[70vh]">
        <div className="w-full md:w-1/2 h-[50vh] md:h-full grayscale bg-black">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80" 
            alt="Principal" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-foreground text-background">
          <ArrowDownRight size={48} className="mb-12 opacity-50" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
            "Education is the kindling of a flame, not the filling of a vessel."
          </h2>
          <div className="mt-auto pt-8 border-t border-background/20">
            <p className="text-sm font-bold uppercase tracking-widest">Dr. Suniti Krishnan</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mt-1">Principal / Visionary</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full border-b border-foreground/10">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/10 max-w-[1600px] mx-auto">
          <div className="p-8 md:p-16 flex flex-col gap-12 hover:bg-foreground/5 transition-colors">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Vision</h2>
            <p className="text-lg font-bold uppercase tracking-widest leading-loose text-foreground/80">
              To be a beacon of transformative schooling where intellectual curiosity, moral fortitude, and scientific temper converge to develop responsible global citizens who contribute to nation-building with a touch of brilliance.
            </p>
          </div>
          <div className="p-8 md:p-16 flex flex-col gap-12 hover:bg-foreground/5 transition-colors">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Mission</h2>
            <p className="text-lg font-bold uppercase tracking-widest leading-loose text-foreground/80">
              To provide child-centric, experiential education, fostering critical thinking, coding & robotics literacy, multilingual fluency, and sportsman spirit in a state-of-the-art campus that feels like a second home.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-b border-foreground/10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-foreground/10 max-w-[1600px] mx-auto">
          {[
            { value: "100%", label: "Board Pass Rate" },
            { value: "50+", label: "Sports Medals" },
            { value: "12K+", label: "Global Alumni" },
            { value: "#01", label: "Eco-Campus" }
          ].map((stat, i) => (
             <div key={i} className="p-8 md:p-12 flex flex-col gap-4 text-center items-center justify-center min-h-[250px]">
               <div className="text-6xl md:text-8xl font-black tracking-tighter">{stat.value}</div>
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
              Governing<br/>Board.
            </h2>
          </div>
          <div className="w-full md:w-2/3 flex flex-col divide-y divide-foreground/10">
            {[
              { name: "Shri M. R. Chandrashekar", role: "Chairman", year: "Est. 2004" },
              { name: "Smt. Radhika Nair", role: "Managing Trustee", year: "Est. 2004" },
              { name: "Dr. Anil Kumar", role: "Academic Advisor", year: "Est. 2012" },
              { name: "Mrs. Sarah Thomas", role: "Parent Representative", year: "Est. 2020" }
            ].map((member, i) => (
              <div key={i} className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-foreground/5 transition-colors cursor-pointer">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{member.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground/50">{member.role}</p>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {member.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
