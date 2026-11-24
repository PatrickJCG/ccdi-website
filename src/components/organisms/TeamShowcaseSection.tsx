import React, { useState } from 'react';
import { MapPin, ShieldCheck, ArrowDown } from 'lucide-react';
import { CornerAccent } from '../atoms/ArchitecturalAccents';
import {
  TEAM_MEMBERS,
  TEAM_GROUPS,
  type TeamMember,
} from '../../data/teamData';

const MemberMonogram: React.FC<{
  member: TeamMember;
  sizeClassName?: string;
  textClassName?: string;
  variant?: 'navy' | 'seal';
}> = ({
  member,
  sizeClassName = 'w-12 h-12',
  textClassName = 'text-sm',
  variant = 'seal',
}) => {
  const [imageError, setImageError] = useState(false);

  if (member.image && !imageError) {
    return (
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        onError={() => setImageError(true)}
        className={`${sizeClassName} rounded-full object-cover object-center shrink-0 ${
          variant === 'navy'
            ? 'border border-amber-400/60 ring-4 ring-amber-400/15'
            : 'border border-slate-200 ring-4 ring-slate-50 group-hover:border-amber-400/80 transition-all duration-300'
        }`}
      />
    );
  }

  return (
    <div
      className={`${sizeClassName} rounded-full shrink-0 flex items-center justify-center font-sans font-bold tracking-wide transition-all duration-300 ${textClassName} ${
        variant === 'navy'
          ? 'bg-[#07162A] text-amber-400 border border-amber-400/60 ring-4 ring-amber-400/15'
          : 'bg-slate-50 text-[#0B192C] border border-slate-200/90 ring-4 ring-slate-50 group-hover:border-amber-400/80 group-hover:ring-amber-50'
      }`}
      aria-hidden="true"
    >
      {member.initials}
    </div>
  );
};

const ExecutiveAnchorCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="relative border border-slate-200/90 rounded-[2px] overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-white shadow-xs hover:shadow-md transition-shadow duration-300 group">
    {/* Animated gold hover accent across executive details panel */}
    <span
      aria-hidden="true"
      className="hidden md:block absolute top-0 left-1/3 right-0 h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-20"
    />

    {/* Left Medallion / Portrait Column */}
    <div className="md:col-span-4 bg-[#0B192C] p-8 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden text-center">
      <img
        src="/images/branding/ccdi-logo.svg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute -right-6 -bottom-6 h-36 w-auto object-contain opacity-[0.06] pointer-events-none select-none"
      />
      <div className="relative z-10 flex flex-col items-center">
        <MemberMonogram
          member={member}
          sizeClassName="w-24 h-24"
          textClassName="text-xl"
          variant="navy"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/90 font-semibold mt-4">
          {member.department}
        </span>
      </div>
    </div>

    {/* Right Executive Details Column */}
    <div className="md:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4 text-left relative">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2 text-slate-400 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span>Executive Anchor</span>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-amber-500/70" />
          <span>Clarkbase Construction Dev&apos;t Inc.</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] tracking-tight">
          {member.name}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
          <p className="text-base font-semibold text-amber-700">
            {member.designation}
          </p>
          {member.additionalRoles && member.additionalRoles.length > 0 && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <p className="text-sm font-medium text-slate-600">
                {member.additionalRoles.join(' · ')}
              </p>
            </>
          )}
        </div>
      </div>

      {member.scope && (
        <p className="text-sm text-slate-600 leading-relaxed pt-4 border-t border-slate-100 max-w-xl">
          {member.scope}
        </p>
      )}
    </div>
  </div>
);

const TeamProfileCell: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="relative bg-white p-6 xl:p-7 border-r border-b border-slate-200 flex flex-col justify-between gap-6 group hover:bg-[#FAFBFD] transition-colors duration-200 text-left">
    {/* Animated top amber hairline */}
    <span
      aria-hidden="true"
      className="absolute top-0 inset-x-0 h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
    />

    <div className="space-y-5">
      {/* Top Row: Monogram Seal + Subtle Department Label */}
      <div className="flex items-start justify-between gap-4">
        <MemberMonogram
          member={member}
          sizeClassName="w-14 h-14"
          textClassName="text-sm"
          variant="seal"
        />
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold text-right pt-1">
          {member.department}
        </span>
      </div>

      {/* Name, Primary Role & Secondary Roles */}
      <div className="space-y-1.5">
        <h4 className="text-lg font-bold text-[#0B192C] tracking-tight group-hover:text-amber-800 transition-colors">
          {member.name}
        </h4>
        <p className="text-sm font-medium text-amber-700 leading-snug">
          {member.designation}
        </p>

        {member.additionalRoles && member.additionalRoles.length > 0 && (
          <ul className="pt-2.5 mt-2.5 border-t border-slate-100 space-y-1">
            {member.additionalRoles.map((role) => (
              <li
                key={role}
                className="flex items-start gap-2 text-xs font-medium text-slate-600 leading-snug"
              >
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-amber-500/70 shrink-0 mt-1.5"
                />
                <span>{role}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Bottom Scope / Territory Metadata */}
    {member.scope && (
      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
        {member.tier === 'sales' && (
          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        )}
        <span>{member.scope}</span>
      </div>
    )}
  </div>
);

const TeamCardsView: React.FC = () => {
  const executiveMember = TEAM_MEMBERS.find((member) => member.tier === 'executive');

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Executive Leadership */}
      {executiveMember && <ExecutiveAnchorCard member={executiveMember} />}

      {/* Balanced Tiered Hairline Grids */}
      {TEAM_GROUPS.map((group) => {
        const members = TEAM_MEMBERS.filter((member) => member.tier === group.tier);
        if (members.length === 0) return null;

        return (
          <div key={group.tier} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-bold text-amber-700 tracking-widest">
                {group.index}
              </span>
              <span className="h-px w-5 bg-slate-300" aria-hidden="true" />
              <h3 className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                {group.label}
              </h3>
            </div>

            <div
              className={`grid ${group.columnsClassName} border-t border-l border-slate-200 rounded-[2px] overflow-hidden`}
            >
              {members.map((member) => (
                <TeamProfileCell key={member.id} member={member} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const TeamShowcaseSection: React.FC = () => {
  return (
    <section
      id="team"
      className="relative py-24 sm:py-32 bg-white text-slate-900 border-b border-slate-200 overflow-hidden"
    >
      <CornerAccent className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto z-0 opacity-[0.16]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200/90 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-px bg-amber-600" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-700 font-bold">
                CCDI / LEADERSHIP &amp; TEAM
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B192C] tracking-tight leading-[1.12]">
              Leadership &amp; Project Specialists
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Direct accountability from executive leadership through specialized engineering, turnkey project delivery, and regional client support.
            </p>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 shrink-0">
            <span className="text-[#0B192C] font-bold tabular-nums">{TEAM_MEMBERS.length}</span>{' '}
            TEAM MEMBERS
          </p>
        </div>

        {/* Tiered Team Cards */}
        <TeamCardsView />

        {/* Quiet Trust Footer Strip */}
        <div className="border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              Single-Point Accountability
            </span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-slate-300" />
            <span>In-House Engineering &amp; Aftersales</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Nationwide Coverage</span>
          </div>

          <a
            href="#positions"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0B192C] hover:text-amber-700 transition-colors shrink-0"
          >
            <span>Explore Open Positions</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
