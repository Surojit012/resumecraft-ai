import { ResumeData } from '@/types';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function EngineerTemplate({ data, fontFamily }: TemplateProps) {
  const accentColor = '#e8b058'; // Muted Orange/Gold

  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto flex"
      style={{ fontFamily }}
    >
      {/* Left Sidebar */}
      <div className="w-[35%] bg-[#e6e6e6] pt-0 flex flex-col relative">
        {/* Black decorative bar at top */}
        <div className="absolute top-0 right-12 w-4 h-16 bg-black"></div>

        {/* Name Section */}
        <div className="mt-24 px-8 text-right mb-12">
          <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-slate-900 mb-8">
            {data.personalInfo.fullName.split(' ').map((n, i) => (
              <span key={i} className="block">{n}</span>
            ))}
          </h1>
          
          {/* Orange decorative line */}
          <div className="flex justify-end mb-8">
             <div className="w-1 h-16" style={{ backgroundColor: accentColor }}></div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-xs font-medium text-slate-600">
            {data.personalInfo.address && (
              <div>
                <span className="font-bold text-slate-900 block uppercase mb-0.5">Address</span>
                {data.personalInfo.address}
              </div>
            )}
            {data.personalInfo.phone && (
              <div>
                <span className="font-bold text-slate-900 block uppercase mb-0.5">Phone</span>
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.email && (
              <div>
                <span className="font-bold text-slate-900 block uppercase mb-0.5">Email</span>
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div>
                <span className="font-bold text-slate-900 block uppercase mb-0.5">Website</span>
                <span className="break-all">{data.personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {data.education.length > 0 && (
          <div className="px-8 text-right mb-12">
            <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">Education</h3>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="text-xs font-bold text-slate-500 mb-1">{edu.startDate} – {edu.endDate}</div>
                  <div className="font-bold text-slate-900 uppercase text-sm">{edu.school}</div>
                  <div className="text-xs text-slate-600 italic">{edu.degree}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="px-8 text-right">
            <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">Skills</h3>
            <ul className="space-y-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-sm font-medium text-slate-700">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12 pt-24 bg-[#f5f5f5]">
        {/* Job Title */}
        <div className="mb-12">
          <h2 
            className="text-5xl font-light uppercase leading-tight tracking-wide"
            style={{ color: accentColor }}
          >
            {data.personalInfo.jobTitle.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
            ))}
          </h2>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-16">
            <p className="text-sm text-slate-600 leading-relaxed text-justify max-w-lg">
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 flex items-center gap-4">
              Experience
              <span className="flex-1 h-px bg-slate-300"></span>
            </h3>
            <div className="space-y-10">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">from {exp.startDate} - {exp.endDate}</div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase">{exp.position}</h4>
                    <span className="text-slate-400">|</span>
                    <span className="text-sm font-medium text-slate-700 uppercase">{exp.company}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
