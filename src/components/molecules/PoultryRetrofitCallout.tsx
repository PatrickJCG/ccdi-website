import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface PoultryRetrofitCalloutProps {
  currentCategory?: string;
  tagline?: string;
  headline?: string;
  description?: string;
}

export const PoultryRetrofitCallout: React.FC<PoultryRetrofitCalloutProps> = ({
  currentCategory = 'Poultry',
  tagline = 'Poultry House Retrofit Solutions',
  headline,
  description = 'CCDI can assess existing farm structures and recommend suitable upgrades to housing, ventilation, feeding, and control systems based on the facility’s condition and project requirements.',
}) => {
  const displayHeadline = headline || (currentCategory.includes('Broiler') ? 'Upgrade Your Existing Broiler House' : `Upgrade Your Existing ${currentCategory} House`);

  return (
    <section className="py-12 sm:py-14 bg-[#07162A] border-b border-[#102A43] relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0B192C] border border-slate-700/80 rounded-md p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs text-slate-400 font-medium block">
                {tagline}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {displayHeadline}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
              <Link
                to="/solutions/poultry/retrofitting"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Submit Upgrade Specs
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/solutions/poultry/retrofitting#retrofit-audit-form"
                className="inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-[#1E3E66] text-white px-5 py-3 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors border border-slate-700 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-300" />
                Book Free Farm Visit
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
