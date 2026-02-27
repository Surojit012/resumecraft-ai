import { forwardRef } from 'react';
import { ResumeData } from '@/types';
import { ModernTemplate } from './templates/ModernTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { GeometricTemplate } from './templates/GeometricTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { DesignerTemplate } from './templates/DesignerTemplate';
import { CleanTemplate } from './templates/CleanTemplate';
import { GraphicTemplate } from './templates/GraphicTemplate';
import { EngineerTemplate } from './templates/EngineerTemplate';
import { BWTemplate } from './templates/BWTemplate';
import { BlueWaveTemplate } from './templates/BlueWaveTemplate';
import { ArchitectTemplate } from './templates/ArchitectTemplate';
import { CreativeYellowTemplate } from './templates/CreativeYellowTemplate';
import { SocialMediaTemplate } from './templates/SocialMediaTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  templateId?: string;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, templateId = 'modern' }, ref) => {
  const fontFamily = data.fontFamily || 'Inter';

  const renderTemplate = () => {
    switch (templateId) {
      case 'executive':
        return <ExecutiveTemplate data={data} fontFamily={fontFamily} />;
      case 'geometric':
        return <GeometricTemplate data={data} fontFamily={fontFamily} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} fontFamily={fontFamily} />;
      case 'creative':
        return <CreativeTemplate data={data} fontFamily={fontFamily} />;
      case 'professional':
        return <ProfessionalTemplate data={data} fontFamily={fontFamily} />;
      case 'designer':
        return <DesignerTemplate data={data} fontFamily={fontFamily} />;
      case 'clean':
        return <CleanTemplate data={data} fontFamily={fontFamily} />;
      case 'graphic':
        return <GraphicTemplate data={data} fontFamily={fontFamily} />;
      case 'engineer':
        return <EngineerTemplate data={data} fontFamily={fontFamily} />;
      case 'bw':
        return <BWTemplate data={data} fontFamily={fontFamily} />;
      case 'blue-wave':
        return <BlueWaveTemplate data={data} fontFamily={fontFamily} />;
      case 'architect':
        return <ArchitectTemplate data={data} fontFamily={fontFamily} />;
      case 'creative-yellow':
        return <CreativeYellowTemplate data={data} fontFamily={fontFamily} />;
      case 'social-media':
        return <SocialMediaTemplate data={data} fontFamily={fontFamily} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} fontFamily={fontFamily} />;
    }
  };

  return (
    <div ref={ref} className="print:m-0">
      {renderTemplate()}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
