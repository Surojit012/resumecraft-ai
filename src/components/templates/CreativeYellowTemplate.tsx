import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function CreativeYellowTemplate({ data, fontFamily }: TemplateProps) {
  const accentColor = '#f2c94c'; // Mustard Yellow
  const darkText = '#333333';

  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto flex flex-col"
      style={{ fontFamily }}
    >
      {/* Header Section */}
      <div className="flex relative h-[300px] overflow-hidden">
        {/* Left Content */}
        <div className="w-[60%] p-12 flex flex-col justify-center z-10">
          <h2 
            className="text-4xl font-bold text-[#f2c94c] mb-2"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            {data.personalInfo.jobTitle}
          </h2>
          <h1 className="text-6xl font-extrabold text-[#333] uppercase tracking-tight leading-none mb-6">
            {data.personalInfo.fullName}
          </h1>
          
          {data.summary && (
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              {data.summary}
            </p>
          )}
        </div>

        {/* Right Yellow Shape & Photo */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-[#f2c94c] rounded-bl-[150px] flex items-center justify-center overflow-hidden">
           <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg mr-12 mt-8 bg-white">
              <img 
                src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=800`} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-1 p-12 pt-4">
        
        {/* Left Column */}
        <div className="w-[35%] pr-8 border-r-2 border-dotted border-slate-300 flex flex-col gap-10">
          
          {/* Contact */}
          <section>
            <h3 
              className="text-2xl font-bold text-[#f2c94c] mb-4"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-700 font-medium">
               {data.personalInfo.phone && (
                  <div className="flex items-center gap-3">
                     <span className="w-24 text-slate-500 font-normal">Phone</span>
                     <span>{data.personalInfo.phone}</span>
                  </div>
               )}
               {data.personalInfo.email && (
                  <div className="flex items-center gap-3">
                     <span className="w-24 text-slate-500 font-normal">Email</span>
                     <span className="break-all">{data.personalInfo.email}</span>
                  </div>
               )}
               {data.personalInfo.address && (
                  <div className="flex items-center gap-3">
                     <span className="w-24 text-slate-500 font-normal">Address</span>
                     <span>{data.personalInfo.address}</span>
                  </div>
               )}
               {data.personalInfo.website && (
                  <div className="flex items-center gap-3">
                     <span className="w-24 text-slate-500 font-normal">Website</span>
                     <span>{data.personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </div>
               )}
            </div>
          </section>

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 
                className="text-3xl font-bold text-[#333] mb-6"
              >
                Skills
              </h3>
              <ul className="space-y-3">
                {data.skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <div className="w-3 h-3 bg-[#e0e0e0] rotate-45"></div> {/* Diamond bullet */}
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 
                className="text-3xl font-bold text-[#333] mb-6"
              >
                Education
              </h3>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h4 
                      className="text-xl font-bold text-[#f2c94c] mb-1"
                      style={{ fontFamily: '"Caveat", cursive' }}
                    >
                      {edu.school}
                    </h4>
                    <div className="text-sm font-bold text-slate-800 mb-1">{edu.degree}</div>
                    <div className="text-xs text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 pl-10 flex flex-col gap-10">
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-3xl font-bold text-[#333] mb-2">Experience</h3>
              {/* Subtitle with script font */}
              <h4 
                 className="text-2xl font-bold text-[#f2c94c] mb-8"
                 style={{ fontFamily: '"Caveat", cursive' }}
              >
                 {data.personalInfo.jobTitle}
              </h4>
              
              <div className="space-y-10">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-4 border-[#f2c94c]">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#f2c94c]"></div>
                    
                    <div className="flex justify-between items-baseline mb-2">
                       <h4 className="text-lg font-bold text-slate-800">{exp.company}</h4>
                       <span className="text-sm text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">
                      {exp.description}
                    </p>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{exp.position}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <section className="mt-auto border-t-2 border-slate-100 pt-8">
              <h3 className="text-2xl font-bold text-[#333] uppercase mb-6 tracking-wide">References</h3>
              <div className="grid grid-cols-2 gap-8">
                {data.references.map((ref, index) => (
                  <div key={ref.id || index}>
                    <h4 
                      className="text-xl font-bold text-[#f2c94c] mb-1"
                      style={{ fontFamily: '"Caveat", cursive' }}
                    >
                      {ref.name}
                    </h4>
                    <div className="text-xs font-bold text-slate-700">{ref.position}, {ref.company}</div>
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
