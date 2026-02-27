import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function GeometricTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-[#fdfbf7] w-[210mm] min-h-[297mm] shadow-lg mx-auto text-slate-800 relative overflow-hidden"
      style={{ fontFamily }}
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full translate-y-1/3 -translate-x-1/3"></div>

      <div className="p-12 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-start mb-16 border-b-4 border-blue-900 pb-8 gap-8">
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-blue-900 mb-2 tracking-tight">{data.personalInfo.fullName}</h1>
            <p className="text-xl text-amber-600 font-medium tracking-wide uppercase">{data.personalInfo.jobTitle}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right space-y-1 text-sm font-medium text-slate-600">
              {data.personalInfo.email && <div className="flex items-center justify-end gap-2">{data.personalInfo.email} <Mail size={14} className="text-blue-900"/></div>}
              {data.personalInfo.phone && <div className="flex items-center justify-end gap-2">{data.personalInfo.phone} <Phone size={14} className="text-blue-900"/></div>}
              {data.personalInfo.address && <div className="flex items-center justify-end gap-2">{data.personalInfo.address} <MapPin size={14} className="text-blue-900"/></div>}
              {data.personalInfo.linkedin && <div className="flex items-center justify-end gap-2">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')} <Linkedin size={14} className="text-blue-900"/></div>}
            </div>
            
            {data.personalInfo.imageUrl && (
              <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-amber-500 shadow-lg flex-shrink-0 relative z-20">
                <img 
                  src={data.personalInfo.imageUrl} 
                  alt={data.personalInfo.fullName} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="col-span-4 space-y-10">
            {/* Summary */}
            {data.summary && (
              <section>
                <h3 className="text-lg font-bold text-blue-900 uppercase tracking-widest mb-4 border-l-4 border-amber-500 pl-3">About Me</h3>
                <p className="text-sm leading-relaxed text-slate-600 text-justify">
                  {data.summary}
                </p>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-blue-900 uppercase tracking-widest mb-4 border-l-4 border-amber-500 pl-3">Skills</h3>
                <div className="space-y-2">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-900 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-blue-900 uppercase tracking-widest mb-4 border-l-4 border-amber-500 pl-3">Languages</h3>
                <div className="space-y-2">
                  {data.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{lang}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i <= 4 ? 'bg-blue-900' : 'bg-slate-200'}`}></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-8 space-y-10">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-amber-500"></span>
                  Experience
                </h3>
                <div className="space-y-8">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-lg font-bold text-slate-900">{exp.position}</h4>
                        <span className="text-sm font-bold text-amber-600">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <div className="text-blue-900 font-semibold mb-3">{exp.company}</div>
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-amber-500"></span>
                  Education
                </h3>
                <div className="space-y-6">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900">{edu.school}</h4>
                        <span className="text-xs font-bold text-white bg-blue-900 px-2 py-1 rounded">{edu.startDate} – {edu.endDate}</span>
                      </div>
                      <div className="text-amber-600 font-medium">{edu.degree}</div>
                      {edu.description && <p className="text-sm text-slate-500 mt-2">{edu.description}</p>}
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
