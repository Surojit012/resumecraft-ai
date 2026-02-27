import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function ProfessionalTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto text-slate-800 flex flex-col"
      style={{ fontFamily }}
    >
      {/* Header */}
      <header className="p-10 pb-0 flex items-end gap-8">
        <div className="w-48 h-48 bg-slate-200 overflow-hidden shadow-lg -mb-12 relative z-10">
          <img 
            src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=200`} 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="pb-12 flex-1">
          <h1 className="text-6xl font-black text-blue-600 uppercase tracking-tighter leading-none mb-2">{data.personalInfo.fullName}</h1>
          <p className="text-2xl text-slate-400 uppercase tracking-widest font-light">{data.personalInfo.jobTitle}</p>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-[35%] bg-blue-600 text-white pt-20 p-8 space-y-10">
          {/* Contact */}
          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-blue-400 pb-2 mb-4">Contact</h3>
            <div className="space-y-4 text-sm">
              {data.personalInfo.email && (
                <div className="flex flex-col">
                  <span className="text-blue-200 text-xs uppercase">Email</span>
                  <span className="font-medium break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex flex-col">
                  <span className="text-blue-200 text-xs uppercase">Phone</span>
                  <span className="font-medium">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex flex-col">
                  <span className="text-blue-200 text-xs uppercase">Address</span>
                  <span className="font-medium">{data.personalInfo.address}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex flex-col">
                  <span className="text-blue-200 text-xs uppercase">LinkedIn</span>
                  <span className="font-medium truncate">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex flex-col">
                  <span className="text-blue-200 text-xs uppercase">Website</span>
                  <span className="font-medium truncate">{data.personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </section>

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-widest border-b border-blue-400 pb-2 mb-4">Languages</h3>
              <ul className="space-y-2">
                {data.languages.map((lang, index) => (
                  <li key={index} className="font-medium">{lang}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-widest border-b border-blue-400 pb-2 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-700 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Content */}
        <div className="w-[65%] p-10 pt-16 space-y-10 bg-slate-50">
          {/* Summary */}
          {data.summary && (
            <section>
              <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight mb-4">Profile</h3>
              <p className="text-slate-600 leading-relaxed text-justify">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight mb-6">Work Experience</h3>
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-xl font-bold text-blue-600">{exp.position}</h4>
                      <span className="text-sm font-bold text-slate-400">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-slate-700 font-bold uppercase tracking-wide text-sm mb-3">{exp.company}</div>
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
              <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight mb-6">Education</h3>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-lg font-bold text-slate-900">{edu.school}</h4>
                      <span className="text-sm font-medium text-slate-400">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <div className="text-blue-600 font-medium">{edu.degree}</div>
                    {edu.description && <p className="text-sm text-slate-500 mt-2">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
