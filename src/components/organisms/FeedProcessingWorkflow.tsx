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
  },
  {
    step: '02',
    title: 'STEP 02',
    phrases: ['Grinding', 'Batching', 'Mixing'],
    icon: Cog,
  },
  {
    step: '03',
    title: 'STEP 03',
    phrases: ['Conditioning', 'Pelleting'],
    icon: Flame,
  },
  {
    step: '04',
    title: 'STEP 04',
    phrases: ['Cooling', 'Crumbling', 'Screening'],
    icon: Wind,
  },
  {
    step: '05',
    title: 'STEP 05',
    phrases: ['Packing', 'Storage'],
    icon: PackageCheck,
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
