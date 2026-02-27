import { ResumeData } from '@/types';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function GraphicTemplate({ data, fontFamily }: TemplateProps) {
  const accentColor = '#FFD000'; // Yellow

  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto flex"
      style={{ fontFamily }}
    >
      {/* Left Sidebar Container - White background to show through the gap */}
      <div className="w-[35%] flex flex-col bg-white">
        
        {/* Top Black Section with Photo */}
        <div className="bg-[#1a1b1e] h-[320px] rounded-br-[100px] relative overflow-hidden p-8 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#2a2b2e]">
            <img 
              src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=400`} 
              alt="Profile" 
              className="w-full h-full object-cover grayscale" 
            />
          </div>
        </div>

        {/* Bottom Black Section with Content */}
        <div className="bg-[#1a1b1e] flex-1 rounded-tr-[100px] mt-2 p-8 pt-16 flex flex-col gap-10 text-white">
            
            {/* Education */}
            {data.education.length > 0 && (
                <section>
                    <div className="inline-block px-5 py-1.5 mb-5 rounded-full" style={{ backgroundColor: accentColor }}>
                        <h3 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Education</h3>
                    </div>
                    <div className="space-y-6">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="text-sm font-bold text-white uppercase mb-1">{edu.degree}</div>
                                <div className="text-xs text-slate-400 mb-1">{edu.school}</div>
                                <div className="text-xs text-[#FFD000]">{edu.startDate} – {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
                <section>
                    <div className="inline-block px-5 py-1.5 mb-5 rounded-full" style={{ backgroundColor: accentColor }}>
                        <h3 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Languages</h3>
                    </div>
                    <ul className="space-y-2">
                        {data.languages.map((lang, index) => (
                            <li key={index} className="text-sm text-slate-300 font-medium">{lang}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Contact Info */}
            <div className="mt-auto space-y-5">
                 {data.personalInfo.phone && (
                    <div className="relative pl-3">
                        <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: accentColor }}></div>
                        <div className="text-[10px] text-[#FFD000] font-bold uppercase mb-0.5">Phone</div>
                        <div className="text-xs text-white">{data.personalInfo.phone}</div>
                    </div>
                 )}
                 {data.personalInfo.email && (
                    <div className="relative pl-3">
                        <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: accentColor }}></div>
                        <div className="text-[10px] text-[#FFD000] font-bold uppercase mb-0.5">Email</div>
                        <div className="text-xs text-white break-all">{data.personalInfo.email}</div>
                    </div>
                 )}
                 {data.personalInfo.website && (
                    <div className="relative pl-3">
                        <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: accentColor }}></div>
                        <div className="text-[10px] text-[#FFD000] font-bold uppercase mb-0.5">Website</div>
                        <div className="text-xs text-white truncate">{data.personalInfo.website.replace(/^https?:\/\//, '')}</div>
                    </div>
                 )}
                 {data.personalInfo.address && (
                    <div className="relative pl-3">
                        <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: accentColor }}></div>
                        <div className="text-[10px] text-[#FFD000] font-bold uppercase mb-0.5">Address</div>
                        <div className="text-xs text-white">{data.personalInfo.address}</div>
                    </div>
                 )}
            </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12 pt-16 bg-white relative">
        {/* Yellow Header Shape */}
        <div className="absolute top-0 left-12 w-32 h-40 rounded-b-[60px] opacity-90 -z-0" style={{ backgroundColor: accentColor }}></div>

        {/* Header */}
        <header className="mb-16 relative z-10 ml-8 mt-8">
            <h1 className="text-6xl font-black uppercase tracking-tight text-slate-900 mb-2 leading-[0.9]">
                {data.personalInfo.fullName.split(' ').map((n, i) => (
                    <span key={i} className="block">{n}</span>
                ))}
            </h1>
            <p className="text-lg tracking-[0.3em] uppercase text-slate-500 font-medium mt-4">{data.personalInfo.jobTitle}</p>
        </header>

        {/* About Me */}
        {data.summary && (
            <section className="mb-12">
                <div className="inline-block px-6 py-1.5 mb-5 rounded-full" style={{ backgroundColor: accentColor }}>
                    <h3 className="text-slate-900 font-bold uppercase tracking-wider text-xs">About Me</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-justify text-sm">
                    {data.summary}
                </p>
            </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
            <section className="mb-12">
                <div className="inline-block px-6 py-1.5 mb-8 rounded-full" style={{ backgroundColor: accentColor }}>
                    <h3 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Work Experience</h3>
                </div>
                <div className="space-y-8">
                    {data.experience.map((exp) => (
                        <div key={exp.id} className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 text-xs font-bold text-slate-900 pt-1">
                                {exp.startDate} – <br/> {exp.endDate}
                            </div>
                            <div className="col-span-9 pl-4 border-l border-slate-200">
                                <h4 className="font-bold text-slate-900 uppercase text-sm mb-1">{exp.position}</h4>
                                <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">{exp.company}</div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
            <section>
                <div className="inline-block px-6 py-1.5 mb-6 rounded-full" style={{ backgroundColor: accentColor }}>
                    <h3 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Software Skill</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                    {data.skills.map((skill, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-xs font-bold text-slate-700 uppercase">{skill}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${Math.random() * 30 + 70}%`, backgroundColor: accentColor }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}
      </div>
    </div>
  );
}
