import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function CleanTemplate({ data, fontFamily }: TemplateProps) {
  const accentColor = '#f5bf23'; // Golden yellow from the image

  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto text-slate-800 flex flex-col"
      style={{ fontFamily }}
    >
      {/* Header Section */}
      <header className="bg-slate-100 p-12 pb-8 relative">
        {/* Yellow Accent Shape Top Left */}
        <div 
          className="absolute top-10 left-12 w-8 h-2"
          style={{ backgroundColor: accentColor, transform: 'skewX(-20deg)' }}
        ></div>

        <div className="flex justify-between items-start mt-4">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 uppercase tracking-tight mb-2 leading-none">
              {data.personalInfo.fullName.split(' ')[0]} <br />
              <span className="font-black">{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">{data.personalInfo.jobTitle}</p>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            {data.personalInfo.address && (
              <div className="flex items-center justify-end gap-3">
                <span>{data.personalInfo.address}</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                  <MapPin size={10} />
                </div>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center justify-end gap-3">
                <span>{data.personalInfo.phone}</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                  <Phone size={10} />
                </div>
              </div>
            )}
            {data.personalInfo.email && (
              <div className="flex items-center justify-end gap-3">
                <span>{data.personalInfo.email}</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                  <Mail size={10} />
                </div>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center justify-end gap-3">
                <span>{data.personalInfo.website.replace(/^https?:\/\//, '')}</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                  <Globe size={10} />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 p-12 pt-8 gap-12">
        {/* Left Column */}
        <div className="w-[30%] space-y-12">
          {/* Photo */}
          <div className="relative w-full aspect-[4/5] bg-slate-200 mb-8">
            <img 
              src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=400`} 
              alt="Profile" 
              className="w-full h-full object-cover grayscale" 
            />
            {/* Yellow Triangle Overlay */}
            <div 
              className="absolute bottom-4 -right-4 w-12 h-12 z-10"
              style={{ backgroundColor: accentColor, transform: 'rotate(45deg)' }}
            ></div>
            <div 
              className="absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-b-[50px] border-b-white z-0"
            ></div>
          </div>

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-6">Education</h3>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-slate-800 text-sm uppercase mb-1">{edu.degree}</h4>
                    <div className="text-xs text-slate-500 mb-1">{edu.school}</div>
                    <div className="text-xs text-slate-400">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-6">Skills</h3>
              <ul className="space-y-3">
                {data.skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-10">
          {/* About Me */}
          {data.summary && (
            <section className="border-b border-slate-200 pb-10">
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-4">About Me</h3>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-6">Experiences</h3>
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 uppercase text-sm">{exp.position}</h4>
                      <span className="text-slate-400 text-xs">|</span>
                      <span className="font-bold text-slate-900 text-xs">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-xs text-slate-500 mb-3 uppercase tracking-wide">{exp.company}</div>
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
    </div>
  );
}
