import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function CreativeTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-[#f5f2ea] w-[210mm] min-h-[297mm] p-0 shadow-lg mx-auto text-slate-800 border-[16px] border-blue-800 relative"
      style={{ fontFamily }}
    >
      <div className="p-12 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-8 mb-12">
          <div className="w-40 h-40 bg-slate-200 rounded-full overflow-hidden border-4 border-blue-800 flex-shrink-0">
            <img 
              src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=200`} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-blue-800 mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-2xl text-slate-600 font-medium">{data.personalInfo.jobTitle}</p>
            <div className="w-20 h-1 bg-blue-800 mt-4"></div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-12 flex-grow">
          {/* Left Column */}
          <div className="col-span-4 space-y-10">
            {/* Contact */}
            <section>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Contact</h3>
              <div className="space-y-3 text-sm font-medium text-slate-700">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-800" />
                    <span className="break-all">{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-800" />
                    <span>{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo.address && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-800" />
                    <span>{data.personalInfo.address}</span>
                  </div>
                )}
                {data.personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-blue-800" />
                    <span className="truncate">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
                {data.personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-blue-800" />
                    <span className="truncate">{data.personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Languages</h3>
                <div className="space-y-2">
                  {data.languages.map((lang, index) => (
                    <div key={index} className="bg-blue-100 text-blue-900 px-3 py-2 rounded-lg font-medium text-sm">
                      {lang}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 border border-blue-800 text-blue-800 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-8 space-y-10">
            {/* Summary */}
            {data.summary && (
              <section>
                <h3 className="text-xl font-bold text-blue-800 mb-4">About Me</h3>
                <p className="text-slate-700 leading-relaxed text-justify">
                  {data.summary}
                </p>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-blue-800 mb-6">Work Experience</h3>
                <div className="space-y-8">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-blue-200">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-800"></div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-lg font-bold text-slate-900">{exp.position}</h4>
                        <span className="text-sm font-bold text-blue-600">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <div className="text-slate-500 font-medium mb-2">{exp.company}</div>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
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
                <h3 className="text-xl font-bold text-blue-800 mb-6">Education</h3>
                <div className="space-y-6">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900">{edu.school}</h4>
                        <span className="text-sm font-medium text-slate-500">{edu.startDate} – {edu.endDate}</span>
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
    </div>
  );
}
