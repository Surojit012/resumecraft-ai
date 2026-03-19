export interface ResumeData {
  sourceMeta?: {
    url: string;
    title?: string;
  };
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    website: string;
    jobTitle: string;
    imageUrl?: string;
  };
  summary: string;
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: string[];
  languages: string[];
  references?: {
    id: string;
    name: string;
    position: string;
    company: string;
    phone: string;
    email: string;
  }[];
  fontFamily?: string;
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  summary: 'Experienced software engineer with a passion for building scalable web applications. Proven track record of delivering high-quality code and leading teams.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2020-01',
      endDate: 'Present',
      description: 'Led a team of 5 engineers to rebuild the core platform using React and Node.js. Improved performance by 50%.',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      description: 'Graduated with honors. President of the Coding Club.',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'],
  languages: ['English', 'Spanish'],
  references: [
    {
      id: '1',
      name: 'Jane Smith',
      position: 'Engineering Manager',
      company: 'Tech Corp',
      phone: '(555) 987-6543',
      email: 'jane.smith@techcorp.com',
    },
  ],
  fontFamily: 'Inter',
};
