import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function ExecutiveTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto flex text-slate-800"
      style={{ fontFamily }}
    >
      {/* Left Sidebar */}
      <div className="w-[35%] bg-slate-900 text-white p-8 flex flex-col h-full">
        <div className="mb-8">
          <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-6 overflow-hidden border-4 border-slate-600">
             <img 
               src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=200`} 
               alt="Profile" 
               className="w-full h-full object-cover" 
             />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">{data.personalInfo.fullName}</h1>
          <p className="text-center text-slate-400 uppercase tracking-widest text-sm">{data.personalInfo.jobTitle}</p>
        </div>

        <div className="space-y-6 text-sm">
          <div>
            <h3 className="text-slate-400 uppercase tracking-wider font-bold mb-3 text-xs border-b border-slate-700 pb-1">Contact</h3>
            <div className="space-y-3">
              {data.personalInfo.email && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <Mail size={14} />
                  </div>
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <Phone size={14} />
                  </div>
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <MapPin size={14} />
                  </div>
                  <span>{data.personalInfo.address}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <Linkedin size={14} />
                  </div>
                  <span className="truncate">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <Globe size={14} />
                  </div>
                  <span className="truncate">{data.personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-slate-400 uppercase tracking-wider font-bold mb-3 text-xs border-b border-slate-700 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-slate-400 uppercase tracking-wider font-bold mb-3 text-xs border-b border-slate-700 pb-1">Languages</h3>
              <ul className="space-y-1">
                {data.languages.map((lang, index) => (
                  <li key={index} className="text-slate-300">{lang}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-10 flex flex-col">
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 inline-block"></span>
              About Me
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 inline-block"></span>
              Experience
            </h2>
            <div className="space-y-6 border-l-2 border-slate-100 ml-1 pl-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                  </div>
                  <div className="text-indigo-600 font-semibold mb-1">{exp.company}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">
                    {exp.startDate} – {exp.endDate}
                  </div>
                  <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 inline-block"></span>
              Education
            </h2>
            <div className="space-y-6 border-l-2 border-slate-100 ml-1 pl-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div>
                  <h3 className="font-bold text-slate-900 text-lg">{edu.school}</h3>
                  <div className="text-indigo-600 font-medium mb-1">{edu.degree}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  {edu.description && <p className="text-sm text-slate-600">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
