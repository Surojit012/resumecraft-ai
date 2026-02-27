import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function SocialMediaTemplate({ data, fontFamily }: TemplateProps) {
  const orangeColor = '#d95d00'; // Burnt Orange
  const darkColor = '#1a1b26'; // Dark Navy/Black
  const bgColor = '#fdfbf7'; // Warm Off-White

  // Helper for section headers
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center mb-4">
      <div className="w-1.5 h-6 bg-[#d95d00] mr-3"></div>
      <h3 className="text-xl font-bold uppercase tracking-wide text-[#d95d00]">
        {title}
      </h3>
    </div>
  );

  const [firstName, ...lastNameParts] = data.personalInfo.fullName.split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <div 
      className="w-[210mm] min-h-[297mm] shadow-lg mx-auto flex flex-col p-12"
      style={{ fontFamily, backgroundColor: bgColor }}
    >
      {/* Header Section */}
      <div className="flex justify-between mb-16">
        {/* Left: Name & Contact */}
        <div className="w-[55%] flex flex-col justify-center">
          <div className="mb-2 leading-[0.85]">
            <h1 className="text-7xl font-extrabold uppercase text-[#1a1b26] tracking-tighter mb-1">
              {firstName}
            </h1>
            <h1 className="text-7xl font-extrabold uppercase text-[#d95d00] tracking-tighter">
              {lastName}
            </h1>
          </div>
          
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#1a1b26] mb-8 mt-2">
            {data.personalInfo.jobTitle}
          </h2>

          {/* Orange Divider */}
          <div className="w-12 h-1.5 bg-[#d95d00] mb-8"></div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-slate-700 font-medium uppercase tracking-wide">
             {data.personalInfo.address && (
                <div>{data.personalInfo.address}</div>
             )}
             {data.personalInfo.phone && (
                <div>{data.personalInfo.phone}</div>
             )}
             {data.personalInfo.email && (
                <div>{data.personalInfo.email}</div>
             )}
             {data.personalInfo.website && (
                <div>{data.personalInfo.website.replace(/^https?:\/\//, '')}</div>
             )}
          </div>
        </div>

        {/* Right: Photo */}
        <div className="w-[40%]">
          <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
             <img 
               src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=800`} 
               alt="Profile" 
               className="w-full h-full object-cover grayscale contrast-125" 
             />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex gap-12">
        
        {/* Left Column */}
        <div className="w-[40%] flex flex-col gap-10">
          
          {/* Profile Summary */}
          {data.summary && (
            <section>
              <SectionHeader title="Profile Summary" />
              <p className="text-sm text-slate-700 leading-relaxed">
                {data.summary}
              </p>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <SectionHeader title="Education" />
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-bold text-slate-800 uppercase mb-1">
                      {edu.degree}
                    </h4>
                    <div className="text-sm text-slate-600 mb-1">{edu.school}</div>
                    <div className="text-xs text-slate-500 italic">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <SectionHeader title="Skills" />
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1a1b26] shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[60%] flex flex-col gap-10">
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <SectionHeader title="Experience" />
              
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">
                      {exp.position} | {exp.company} | {exp.startDate} - {exp.endDate}
                    </h4>
                    
                    <p className="text-sm text-slate-700 leading-relaxed mt-3">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <section>
              <SectionHeader title="References" />
              <div className="grid grid-cols-1 gap-6">
                {data.references.map((ref, index) => (
                  <div key={ref.id || index}>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">
                      {ref.name}
                    </h4>
                    <div className="text-sm text-slate-700">{ref.position} | {ref.company}</div>
                    {ref.phone && <div className="text-xs text-slate-500 mt-1">Phone: {ref.phone}</div>}
                    {ref.email && <div className="text-xs text-slate-500">Email: {ref.email}</div>}
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
