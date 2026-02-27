import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function DesignerTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto text-slate-900 flex relative overflow-hidden"
      style={{ fontFamily }}
    >
      {/* Vertical Line Decoration */}
      <div className="absolute left-[80px] top-20 bottom-20 w-px bg-slate-800 z-10"></div>

      {/* Left Sidebar (Resume Text) */}
      <div className="w-[80px] relative flex-shrink-0">
        <div className="absolute top-[280px] -left-[60px] w-[200px] -rotate-90 origin-center">
          <h1 className="text-6xl font-black uppercase tracking-[0.2em] text-slate-900">Resume</h1>
        </div>
        {/* Green accent box on the left edge */}
        <div className="absolute top-[240px] left-0 w-[40px] h-[40px] bg-[#ccff00]"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-20 pr-12 pb-12 pl-8">
        {/* Header Section */}
        <div className="flex gap-10 mb-16 relative">
          {/* Photo */}
          <div className="w-48 h-60 relative flex-shrink-0 z-20">
             <div className="absolute top-12 -left-6 w-16 h-48 bg-[#ccff00] -z-10"></div>
             <div className="w-full h-full bg-slate-200 overflow-hidden grayscale filter contrast-125">
               <img 
                 src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=400`} 
                 alt="Profile" 
                 className="w-full h-full object-cover" 
               />
             </div>
          </div>

          {/* Name & Info */}
          <div className="flex-1 flex flex-col justify-center pt-8">
            <h2 className="text-5xl font-medium mb-6 tracking-tight">{data.personalInfo.fullName}</h2>
            
            <div className="bg-[#ccff00] py-3 px-6 w-full -mr-12 mb-6 relative">
              <p className="tracking-[0.4em] uppercase font-bold text-sm">{data.personalInfo.jobTitle}</p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              {data.personalInfo.email && <span>e: {data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>p: {data.personalInfo.phone}</span>}
              {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
            </div>
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="flex gap-6 mb-16">
            <div className="w-1.5 bg-[#ccff00] flex-shrink-0"></div>
            <p className="text-sm text-slate-600 leading-relaxed text-justify font-medium">
              {data.summary}
            </p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-12">
          {/* Left Column: Skills & Education */}
          <div className="col-span-5 space-y-12">
            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Skills</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Professional</h4>
                    <ul className="space-y-2">
                      {data.skills.map((skill, index) => (
                        <li key={index} className="text-sm font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Education</h3>
                <div className="space-y-8 relative border-l border-slate-300 ml-1.5 pl-6 py-2">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-slate-900 rounded-full"></div>
                      <div className="text-xs font-bold text-slate-500 mb-1">{edu.startDate} – {edu.endDate}</div>
                      <h4 className="font-bold uppercase tracking-wider text-sm mb-1">{edu.degree}</h4>
                      <div className="text-sm text-slate-600">{edu.school}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Languages</h3>
                <ul className="space-y-2">
                  {data.languages.map((lang, index) => (
                    <li key={index} className="text-sm font-medium border-b border-slate-200 pb-1">{lang}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Experience */}
          <div className="col-span-7 space-y-12">
            {data.experience.length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Experience</h3>
                <div className="space-y-10">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="text-xs font-bold text-slate-500 mb-1">{exp.startDate} – {exp.endDate}</div>
                      <h4 className="font-bold uppercase tracking-wider text-sm mb-1">{exp.position} — {exp.company}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed mt-3 text-justify">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
