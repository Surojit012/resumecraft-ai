import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function MinimalistTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] p-16 shadow-lg mx-auto text-black"
      style={{ fontFamily }}
    >
      {/* Header */}
      <header className="text-center mb-16">
        {data.personalInfo.imageUrl && (
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden grayscale border-2 border-black">
             <img 
               src={data.personalInfo.imageUrl} 
               alt={data.personalInfo.fullName} 
               className="w-full h-full object-cover" 
             />
          </div>
        )}
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">{data.personalInfo.fullName}</h1>
        <p className="text-xl tracking-[0.2em] uppercase text-gray-500 mb-8">{data.personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-widest">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="col-span-4 space-y-12">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">Education</h3>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold">{edu.school}</h4>
                    <div className="text-sm text-gray-600 mb-1">{edu.degree}</div>
                    <div className="text-xs text-gray-400">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">Skills</h3>
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">Languages</h3>
              <ul className="space-y-2">
                {data.languages.map((lang, index) => (
                  <li key={index} className="text-sm font-medium">{lang}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-12">
          {/* Summary */}
          {data.summary && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">Profile</h3>
              <p className="text-sm leading-loose text-justify font-medium text-gray-800">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6">Work Experience</h3>
              <div className="space-y-10">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-bold">{exp.position}</h4>
                      <span className="text-xs font-bold bg-black text-white px-2 py-1">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{exp.company}</div>
                    <p className="text-sm leading-relaxed text-gray-700">
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
  );
}
