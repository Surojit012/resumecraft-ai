import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function BWTemplate({ data, fontFamily }: TemplateProps) {
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto flex"
      style={{ fontFamily }}
    >
      {/* Left Sidebar */}
      <div className="w-[35%] bg-[#2d3038] text-white flex flex-col">
        {/* Photo Section */}
        <div className="w-full aspect-square bg-slate-400 relative overflow-hidden">
          <img 
            src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=800`} 
            alt="Profile" 
            className="w-full h-full object-cover grayscale" 
          />
        </div>

        <div className="p-8 space-y-10">
          {/* Name & Title */}
          <div>
            <h1 className="text-3xl font-bold leading-tight mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-slate-400 uppercase tracking-widest text-sm">{data.personalInfo.jobTitle}</p>
            
            {/* Social Icons (Mockup) */}
            <div className="flex gap-4 mt-6 text-slate-400">
               {data.personalInfo.linkedin && <Linkedin size={18} />}
               {data.personalInfo.website && <Globe size={18} />}
               <Github size={18} />
            </div>
          </div>

          {/* Contact */}
          <section>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <div className="space-y-4 text-sm text-slate-300">
              {data.personalInfo.email && (
                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Email</div>
                  <div className="break-all">{data.personalInfo.email}</div>
                </div>
              )}
              {data.personalInfo.phone && (
                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Phone</div>
                  <div>{data.personalInfo.phone}</div>
                </div>
              )}
              {data.personalInfo.address && (
                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Address</div>
                  <div>{data.personalInfo.address}</div>
                </div>
              )}
            </div>
          </section>

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-6">Languages</h3>
              <div className="space-y-4">
                {data.languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lang}</span>
                    </div>
                    <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12 text-slate-800">
        {/* Profile */}
        {data.summary && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-2">Profile</h3>
            <div className="w-12 h-1 bg-[#2d3038] mb-6"></div>
            <p className="text-slate-600 leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-2">Experience</h3>
            <div className="w-12 h-1 bg-[#2d3038] mb-8"></div>
            
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id} className="flex gap-8">
                  <div className="w-32 flex-shrink-0">
                    <div className="font-bold text-slate-900 text-sm mb-1">{exp.position}</div>
                    <div className="text-xs text-slate-500 mb-1">{exp.startDate} – {exp.endDate}</div>
                    <div className="text-xs text-slate-600 italic">{exp.company}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-2">Education</h3>
            <div className="w-12 h-1 bg-[#2d3038] mb-8"></div>
            
            <div className="space-y-8">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex gap-8">
                  <div className="w-32 flex-shrink-0">
                    <div className="font-bold text-slate-900 text-sm mb-1">{edu.school}</div>
                    <div className="text-xs text-slate-500">{edu.startDate} – {edu.endDate}</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 text-sm mb-1">{edu.degree}</div>
                    {edu.description && <p className="text-sm text-slate-600">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Expertise (Skills) */}
        {data.skills.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-2">Expertise</h3>
            <div className="w-12 h-1 bg-[#2d3038] mb-8"></div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-24 flex-shrink-0">{skill}</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2d3038]" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
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
