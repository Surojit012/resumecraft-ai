import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function ArchitectTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto flex"
      style={{ fontFamily }}
    >
      {/* Left Sidebar */}
      <div className="w-[32%] bg-[#f0f2f5] p-8 flex flex-col border-r border-slate-200">
        {/* Profile Photo */}
        <div className="w-32 h-32 mx-auto mb-12 rounded-full overflow-hidden ring-4 ring-white shadow-sm">
          <img 
            src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=800`} 
            alt="Profile" 
            className="w-full h-full object-cover grayscale" 
          />
        </div>

        {/* Contact */}
        <section className="mb-10">
          <h3 className="text-sm font-serif font-bold uppercase tracking-[0.2em] text-slate-800 mb-6 border-b border-slate-300 pb-2">
            Contact
          </h3>
          <div className="space-y-4 text-xs text-slate-600">
            {data.personalInfo.phone && (
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-slate-800" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.email && (
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-slate-800" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-3">
                <Linkedin size={14} className="text-slate-800" />
                <span className="break-all">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-slate-800" />
                <span>{data.personalInfo.address}</span>
              </div>
            )}
          </div>
        </section>

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-10">
            <h3 className="text-sm font-serif font-bold uppercase tracking-[0.2em] text-slate-800 mb-6 border-b border-slate-300 pb-2">
              Education
            </h3>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="text-xs font-bold text-slate-800 uppercase mb-1">{edu.school}</div>
                  <div className="text-xs text-slate-600 italic mb-1">{edu.degree}</div>
                  <div className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h3 className="text-sm font-serif font-bold uppercase tracking-[0.2em] text-slate-800 mb-6 border-b border-slate-300 pb-2">
              Skills
            </h3>
            <ul className="space-y-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-xs text-slate-600">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12 pt-16">
        {/* Header */}
        <header className="mb-12 border-b border-slate-200 pb-10">
          <h1 className="text-4xl font-serif text-slate-900 uppercase tracking-wider mb-3">
            {data.personalInfo.fullName}
          </h1>
          <p className="text-lg font-serif italic text-slate-600 mb-6">
            {data.personalInfo.jobTitle}
          </p>
          {data.summary && (
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              {data.summary}
            </p>
          )}
        </header>

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h3 className="text-sm font-serif font-bold uppercase tracking-[0.2em] text-slate-800 mb-8">
              Experience
            </h3>
            
            <div className="space-y-10">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col mb-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      {exp.position}
                    </h4>
                    <div className="text-xs text-slate-500 italic mt-1">
                      {exp.company} | {exp.startDate} – {exp.endDate}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
