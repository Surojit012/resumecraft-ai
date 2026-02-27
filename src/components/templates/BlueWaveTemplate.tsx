import { ResumeData } from '@/types';
import { Mail, Phone, MapPin, User, GraduationCap, Briefcase, Users, Settings } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  fontFamily: string;
}

export function BlueWaveTemplate({ data, fontFamily }: TemplateProps) {
  const primaryColor = '#4a72a3'; // Muted Blue from image
  const sidebarBg = '#f8f9fa'; // Very light grey for sidebar

  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] shadow-lg mx-auto flex"
      style={{ fontFamily }}
    >
      {/* Left Sidebar */}
      <div className="w-[35%] bg-[#fcfcfc] border-r border-slate-100 flex flex-col relative">
        {/* Blue Header Shape */}
        <div className="h-48 w-full bg-[#5d87b5] relative overflow-hidden">
           {/* Decorative circle overlay to create the curve effect if needed, 
               but the image shows the photo overlapping the straight edge or a slight curve.
               Let's go with the photo overlapping the blue/white boundary. */}
           <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Profile Photo */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
          <div className="w-40 h-40 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
              <img 
                src={data.personalInfo.imageUrl || `https://ui-avatars.com/api/?name=${data.personalInfo.fullName}&background=random&size=800`} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="mt-24 px-8 pb-8 text-center">
          {/* Name & Title */}
          <h1 className="text-3xl font-bold text-[#5d87b5] mb-1 leading-tight">
            {data.personalInfo.fullName}
          </h1>
          <p className="text-slate-500 uppercase tracking-widest text-xs font-medium mb-8">
            {data.personalInfo.jobTitle}
          </p>

          {/* Contact */}
          <div className="text-left space-y-4 mb-8">
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 w-full border-b pb-2 mb-2">
                <Phone size={18} className="text-[#5d87b5]" />
                <span className="text-[#5d87b5]">Contact</span>
              </h3>
            </div>
            
            {data.personalInfo.phone && (
              <div className="flex items-center gap-3 text-slate-600 text-xs">
                <Phone size={14} className="text-[#5d87b5]" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.email && (
              <div className="flex items-center gap-3 text-slate-600 text-xs">
                <Mail size={14} className="text-[#5d87b5]" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center gap-3 text-slate-600 text-xs">
                <MapPin size={14} className="text-[#5d87b5]" />
                <span>{data.personalInfo.address}</span>
              </div>
            )}
          </div>

          {/* About Me */}
          {data.summary && (
            <div className="text-left mb-8">
              <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 border-b pb-2 mb-3">
                <User size={18} className="text-[#5d87b5]" />
                <span className="text-[#5d87b5]">About Me</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {data.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 border-b pb-2 mb-3">
                <Settings size={18} className="text-[#5d87b5]" />
                <span className="text-[#5d87b5]">Skills</span>
              </h3>
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5d87b5]"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-10 pt-16">
        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-10">
            <h3 className="text-2xl font-bold text-slate-700 flex items-center gap-3 border-b-2 border-slate-100 pb-2 mb-6">
              <GraduationCap size={24} className="text-[#5d87b5]" />
              <span>Education</span>
            </h3>
            
            <div className="space-y-6 border-l-2 border-slate-100 ml-3 pl-8 relative">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#5d87b5] border-4 border-white shadow-sm"></div>
                  
                  <h4 className="text-lg font-bold text-slate-700">{edu.degree}</h4>
                  <div className="text-[#5d87b5] font-medium text-sm mb-2">{edu.school}</div>
                  <p className="text-xs text-slate-500 mb-2">{edu.startDate} - {edu.endDate}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-10">
            <h3 className="text-2xl font-bold text-slate-700 flex items-center gap-3 border-b-2 border-slate-100 pb-2 mb-6">
              <Briefcase size={24} className="text-[#5d87b5]" />
              <span>Experience</span>
            </h3>
            
            <div className="space-y-8 border-l-2 border-slate-100 ml-3 pl-8 relative">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#5d87b5] border-4 border-white shadow-sm"></div>
                  
                  <h4 className="text-lg font-bold text-slate-700">{exp.position}</h4>
                  <div className="text-[#5d87b5] font-medium text-sm mb-1">{exp.company}</div>
                  <div className="text-xs text-slate-400 mb-3 italic">{exp.startDate} - {exp.endDate}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">
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
            <h3 className="text-2xl font-bold text-slate-700 flex items-center gap-3 border-b-2 border-slate-100 pb-2 mb-6">
              <Users size={24} className="text-[#5d87b5]" />
              <span>References</span>
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref, index) => (
                <div key={ref.id || index}>
                  <h4 className="font-bold text-slate-700">{ref.name}</h4>
                  <div className="text-xs text-slate-500">{ref.position} / {ref.company}</div>
                  {ref.phone && <div className="text-xs text-slate-500 mt-1">Phone: {ref.phone}</div>}
                  {ref.email && <div className="text-xs text-slate-500">Email: {ref.email}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
