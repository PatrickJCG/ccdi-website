import React from 'react';
import { 
  Truck, 
  Cog, 
  Flame, 
  Wind, 
  PackageCheck 
} from 'lucide-react';
import { 
  ProcessWorkflowDiagram, 
  type WorkflowStepItem,
  WORKFLOW_COLOR_PRIMARY,
  WORKFLOW_COLOR_SECONDARY,
} from './ProcessWorkflowDiagram';

export interface FeedProcessingWorkflowProps {
  onCtaClick?: () => void;
}

const FEEDMILL_WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    step: '01',
    title: 'STEP 01',
    phrases: ['Receiving', 'Pre-cleaning'],
    icon: Truck,
    accentColor: WORKFLOW_COLOR_SECONDARY,
  },
  {
    step: '02',
    title: 'STEP 02',
    phrases: ['Grinding', 'Batching', 'Mixing'],
    icon: Cog,
    accentColor: WORKFLOW_COLOR_PRIMARY,
  },
  {
    step: '03',
    title: 'STEP 03',
    phrases: ['Conditioning', 'Pelleting'],
    icon: Flame,
    accentColor: WORKFLOW_COLOR_SECONDARY,
  },
  {
    step: '04',
    title: 'STEP 04',
    phrases: ['Cooling', 'Crumbling', 'Screening'],
    icon: Wind,
    accentColor: WORKFLOW_COLOR_PRIMARY,
  },
  {
    step: '05',
    title: 'STEP 05',
    phrases: ['Packing', 'Storage'],
    icon: PackageCheck,
    accentColor: WORKFLOW_COLOR_SECONDARY,
  },
];

export const FeedProcessingWorkflow: React.FC<FeedProcessingWorkflowProps> = () => {
  return (
    <ProcessWorkflowDiagram
      id="process-flow"
      eyebrow="ENGINEERED PRODUCTION LINE FLOW"
      title="From Raw Material to Finished Feed"
      subtitle="A complete processing flow covering every key stage of feed production."
      steps={FEEDMILL_WORKFLOW_STEPS}
    />
  );
};
