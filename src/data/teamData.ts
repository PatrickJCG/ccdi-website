export type TeamTier = 'executive' | 'management' | 'technical' | 'sales';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  designation: string;
  additionalRoles?: string[];
  department: string;
  tier: TeamTier;
  scope?: string;
  image: string;
}

export interface TeamGroupMeta {
  index: string;
  tier: Exclude<TeamTier, 'executive'>;
  label: string;
  columnsClassName: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'rvp',
    name: 'Dr. RVP',
    initials: 'RVP',
    designation: 'Managing Director',
    additionalRoles: ['ABU Manager'],
    department: 'Executive Leadership',
    tier: 'executive',
    scope: 'Executive direction & Agribusiness Unit (ABU) leadership',
    image: '',
  },
  {
    id: 'dindo-de-guma',
    name: 'Engr. Dindo De Guma',
    initials: 'DG',
    designation: 'SBU Manager',
    additionalRoles: ['Assistant ABU Manager'],
    department: 'Solar & Agribusiness',
    tier: 'management',
    scope: 'Solar Business Unit & Agribusiness Operations',
    image: '',
  },
  {
    id: 'robin-sotto',
    name: 'Engr. Robin Sotto',
    initials: 'RS',
    designation: 'CBU Manager',
    department: 'Construction Unit',
    tier: 'management',
    scope: 'Construction Business Unit',
    image: '',
  },
  {
    id: 'reynaldo-villegas',
    name: 'Engr. Reynaldo Villegas',
    initials: 'RV',
    designation: 'Technical and R&D Manager',
    additionalRoles: ['Installation and Aftersales Services Manager', 'Poultry Project Lead'],
    department: 'Technical & Aftersales',
    tier: 'management',
    scope: 'Technical R&D, Installation & Aftersales, Poultry Delivery',
    image: '',
  },
  {
    id: 'marvin-tactay',
    name: 'Engr. Marvin Tactay',
    initials: 'MT',
    designation: 'Hatchery and Feed Mill Project Lead',
    department: 'Installation & Aftersales',
    tier: 'management',
    scope: 'Hatchery & Feedmill Project Delivery',
    image: '',
  },
  {
    id: 'robert-poschor',
    name: 'Engr. Robert Poschor',
    initials: 'RP',
    designation: 'Technical Specialist 1',
    department: 'Technical & R&D',
    tier: 'technical',
    scope: 'Technical & R&D Engineering',
    image: '',
  },
  {
    id: 'jayvee-gaddi',
    name: 'Engr. Jayvee Gaddi',
    initials: 'JG',
    designation: 'Technical Specialist 2',
    department: 'Technical & R&D',
    tier: 'technical',
    scope: 'Technical & R&D Engineering',
    image: '',
  },
  {
    id: 'mark-del-rosario',
    name: 'Engr. Mark Del Rosario',
    initials: 'MD',
    designation: 'CBU Support Engineer',
    department: 'Construction Unit',
    tier: 'technical',
    scope: 'CBU Engineering & Construction Support',
    image: '',
  },
  {
    id: 'jonathan-simon',
    name: 'Engr. Jonathan Simon',
    initials: 'JS',
    designation: 'SBU Electrical Support',
    department: 'Solar Business Unit',
    tier: 'technical',
    scope: 'SBU Electrical Support & Solar Systems',
    image: '',
  },
  {
    id: 'jens-punzalan',
    name: 'Jens Punzalan',
    initials: 'JP',
    designation: 'NLUZ Sales Specialist',
    department: 'Regional Sales',
    tier: 'sales',
    scope: 'North Luzon',
    image: '',
  },
  {
    id: 'john-dolf-pedroso',
    name: 'John Dolf Pedroso',
    initials: 'JP',
    designation: 'VISMIN Sales Specialist',
    department: 'Regional Sales',
    tier: 'sales',
    scope: 'Visayas & Mindanao',
    image: '',
  },
];

export const TEAM_GROUPS: TeamGroupMeta[] = [
  {
    index: '01',
    tier: 'management',
    label: 'Business Unit & Technical Management',
    columnsClassName: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  {
    index: '02',
    tier: 'technical',
    label: 'Technical and Support',
    columnsClassName: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  {
    index: '03',
    tier: 'sales',
    label: 'Regional Commercial Specialists',
    columnsClassName: 'grid-cols-1 sm:grid-cols-2',
  },
];
