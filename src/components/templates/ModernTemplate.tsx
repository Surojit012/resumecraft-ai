import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function ModernTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] p-12 shadow-lg mx-auto text-slate-900"
      style={{ fontFamily }}
    >
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-8 mb-8 flex justify-between items-start gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">{data.personalInfo.fullName}</h1>
          <p className="text-xl text-slate-600 mb-4 font-medium">{data.personalInfo.jobTitle}</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {data.personalInfo.email && <span className="flex items-center gap-1"><Mail size={14}/> {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14}/> {data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span className="flex items-center gap-1"><MapPin size={14}/> {data.personalInfo.address}</span>}
            {data.personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={14}/> {data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
            {data.personalInfo.website && <span className="flex items-center gap-1"><Globe size={14}/> {data.personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          </div>
        </div>
        {data.personalInfo.imageUrl && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm flex-shrink-0">
            <img 
              src={data.personalInfo.imageUrl} 
              alt={data.personalInfo.fullName} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-slate-900 border-b border-slate-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-slate-900 border-b border-slate-200 pb-1">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-sm text-slate-500 font-medium">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="text-sm font-semibold text-indigo-600 mb-2">{exp.company}</div>
                <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-slate-900 border-b border-slate-200 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{edu.school}</h3>
                  <span className="text-sm text-slate-500 font-medium">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="text-sm text-slate-700">
                  <span className="font-semibold">{edu.degree}</span>
                  {edu.description && <span className="block mt-1 text-slate-600">{edu.description}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-slate-900 border-b border-slate-200 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-slate-900 border-b border-slate-200 pb-1">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
