import { ResumeData } from '@/types';
import { AIWriter } from './AIWriter';
import { Plus, Trash2, User, Mail, Phone, MapPin, Linkedin, Globe, Type, Briefcase, Languages, Image } from 'lucide-react';

interface EditorFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const fontOptions = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Merriweather', value: 'Merriweather, serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Lora', value: 'Lora, serif' },
  { name: 'Oswald', value: 'Oswald, sans-serif' },
];

export function EditorForm({ data, onChange }: EditorFormProps) {
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const updateFont = (value: string) => {
    onChange({ ...data, fontFamily: value });
  };

  const updateSummary = (value: string) => {
    onChange({ ...data, summary: value });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: crypto.randomUUID(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange({ ...data, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...data.experience];
    newExperience.splice(index, 1);
    onChange({ ...data, experience: newExperience });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: crypto.randomUUID(),
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onChange({ ...data, education: newEducation });
  };

  const removeEducation = (index: number) => {
    const newEducation = [...data.education];
    newEducation.splice(index, 1);
    onChange({ ...data, education: newEducation });
  };

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      onChange({ ...data, skills: [...data.skills, skill] });
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...data.skills];
    newSkills.splice(index, 1);
    onChange({ ...data, skills: newSkills });
  };

  const addLanguage = (language: string) => {
    if (language && !data.languages?.includes(language)) {
      onChange({ ...data, languages: [...(data.languages || []), language] });
    }
  };

  const removeLanguage = (index: number) => {
    const newLanguages = [...(data.languages || [])];
    newLanguages.splice(index, 1);
    onChange({ ...data, languages: newLanguages });
  };

  const addReference = () => {
    onChange({
      ...data,
      references: [
        ...(data.references || []),
        {
          id: crypto.randomUUID(),
          name: '',
          position: '',
          company: '',
          phone: '',
          email: '',
        },
      ],
    });
  };

  const updateReference = (index: number, field: string, value: string) => {
    const newReferences = [...(data.references || [])];
    newReferences[index] = { ...newReferences[index], [field]: value };
    onChange({ ...data, references: newReferences });
  };

  const removeReference = (index: number) => {
    const newReferences = [...(data.references || [])];
    newReferences.splice(index, 1);
    onChange({ ...data, references: newReferences });
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Appearance */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 border-b pb-2">Appearance</h2>
        <div className="flex items-center gap-4">
          <div className="w-full relative">
            <Type className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <select
              value={data.fontFamily || 'Inter'}
              onChange={(e) => updateFont(e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
            >
              {fontOptions.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 border-b pb-2">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Briefcase className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Job Title"
              value={data.personalInfo.jobTitle || ''}
              onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Address"
              value={data.personalInfo.address}
              onChange={(e) => updatePersonalInfo('address', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Linkedin className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="LinkedIn Profile URL"
              value={data.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Personal Website URL"
              value={data.personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 p-2 border rounded-md border-dashed border-slate-300 bg-slate-50">
              {data.personalInfo.imageUrl ? (
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                  <img src={data.personalInfo.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                  <User size={24} />
                </div>
              )}
              
              <div className="flex-1">
                <label className="cursor-pointer block">
                  <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    {data.personalInfo.imageUrl ? 'Change photo' : 'Upload photo'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updatePersonalInfo('imageUrl', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                <p className="text-xs text-slate-500">Recommended: Square JPG or PNG</p>
              </div>

              {data.personalInfo.imageUrl && (
                <button
                  onClick={() => updatePersonalInfo('imageUrl', '')}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Remove photo"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-slate-900">Professional Summary</h2>
          <AIWriter 
            onContentGenerated={updateSummary} 
            currentContent={data.summary}
            label="Improve with AI"
          />
        </div>
        <textarea
          value={data.summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          placeholder="Write a brief summary of your career..."
        />
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-slate-900">Experience</h2>
          <button onClick={addExperience} className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-700">
            <Plus size={16} /> Add Position
          </button>
        </div>
        
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
              <button 
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              
              <div className="relative">
                <div className="flex justify-end mb-1">
                   <AIWriter 
                    onContentGenerated={(content) => updateExperience(index, 'description', content)}
                    currentContent={exp.description}
                    placeholder={`Generate a job description for ${exp.position} at ${exp.company}...`}
                    label="Generate Description"
                  />
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  className="w-full h-24 p-3 border rounded-md text-sm"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-slate-900">Education</h2>
          <button onClick={addEducation} className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-700">
            <Plus size={16} /> Add Education
          </button>
        </div>
        
        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <div key={edu.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
              <button 
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              
              <textarea
                value={edu.description}
                onChange={(e) => updateEducation(index, 'description', e.target.value)}
                className="w-full h-24 p-3 border rounded-md text-sm"
                placeholder="Description (optional)..."
              />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-slate-900">Skills</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2">
              {skill}
              <button onClick={() => removeSkill(index)} className="hover:text-indigo-900">×</button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a skill..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const target = e.target as HTMLInputElement;
                addSkill(target.value);
                target.value = '';
              }
            }}
            className="flex-1 p-2 border rounded-md"
          />
          <button 
            onClick={() => {
              const input = document.querySelector('input[placeholder="Add a skill..."]') as HTMLInputElement;
              if (input.value) {
                addSkill(input.value);
                input.value = '';
              }
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </section>
      {/* Languages */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-slate-900">Languages</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {data.languages?.map((language, index) => (
            <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-2">
              {language}
              <button onClick={() => removeLanguage(index)} className="hover:text-emerald-900">×</button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a language..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const target = e.target as HTMLInputElement;
                addLanguage(target.value);
                target.value = '';
              }
            }}
            className="flex-1 p-2 border rounded-md"
          />
          <button 
            onClick={() => {
              const input = document.querySelector('input[placeholder="Add a language..."]') as HTMLInputElement;
              if (input.value) {
                addLanguage(input.value);
                input.value = '';
              }
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </section>
      {/* References */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-slate-900">References</h2>
          <button onClick={addReference} className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-700">
            <Plus size={16} /> Add Reference
          </button>
        </div>
        
        <div className="space-y-6">
          {data.references?.map((ref, index) => (
            <div key={ref.id || index} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
              <button 
                onClick={() => removeReference(index)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={ref.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={ref.position}
                  onChange={(e) => updateReference(index, 'position', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={ref.company}
                  onChange={(e) => updateReference(index, 'company', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={ref.phone}
                  onChange={(e) => updateReference(index, 'phone', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={ref.email}
                  onChange={(e) => updateReference(index, 'email', e.target.value)}
                  className="p-2 border rounded-md col-span-1 md:col-span-2"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
