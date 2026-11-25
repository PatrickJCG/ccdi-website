import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { SolutionHeroBanner } from '../components/molecules/SolutionHeroBanner';
import { CornerAccent } from '../components/atoms/ArchitecturalAccents';
import {
  LEGAL_ENTITY_NAME,
  PRIVACY_CONTACT_EMAIL,
  CONTACT_HOTLINE,
  HQ_ADDRESS,
  LEGAL_EFFECTIVE_DATE,
} from '../config/legal';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left">
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'TERMS OF USE' },
        ]}
        title="Terms of Use"
        subtitle={`Terms, conditions, and legal disclaimers governing your access to and use of the ${LEGAL_ENTITY_NAME} website, technical specifications, and estimation tools.`}
      />

      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <CornerAccent />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Meta Header */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[2px] bg-[#0B192C] text-amber-400 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  Website Legal Terms &amp; Disclaimers
                </p>
                <p className="text-sm font-bold text-[#0B192C]">{LEGAL_ENTITY_NAME}</p>
              </div>
            </div>
            <div className="font-mono text-xs text-slate-600">
              Effective Date: <strong className="text-[#0B192C]">{LEGAL_EFFECTIVE_DATE}</strong>
            </div>
          </div>

          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            {/* 1 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this website operated by {LEGAL_ENTITY_NAME}
                (&ldquo;CCDI&rdquo;), you agree to be bound by these Terms of Use and our{' '}
                <Link to="/privacy-policy" className="text-amber-700 font-semibold hover:underline">
                  Privacy Policy
                </Link>
                . If you do not agree to these terms, please discontinue use of this website.
              </p>
            </div>

            {/* 2 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                2. Intellectual Property &amp; Open-Source Attribution
              </h2>
              <p>
                All original text, engineering descriptions, layouts, graphics, photographs,
                videos, and CCDI logos displayed on this website are the property of CCDI or its
                content licensors and are protected by Philippine and international copyright and
                intellectual property laws. You may view and download materials solely for
                evaluating CCDI&rsquo;s products and services for your own business; commercial
                republication, scraping, or redistribution without prior written consent is
                prohibited.
              </p>
              <p className="text-xs text-slate-600">
                This website uses the <strong>Plus Jakarta Sans</strong> typeface licensed under
                the SIL Open Font License, Version 1.1.
              </p>
            </div>

            {/* 3 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                3. Third-Party Trademarks &amp; Non-Affiliation Disclaimer
              </h2>
              <p>
                All third-party brand names, product names, utility names, and trademarks
                referenced on this website—including but not limited to{' '}
                <strong>
                  RENAC, GCL S.I., Meralco, Petersime, Jamesway, Pas Reform, Rotem, FLIR, PVsyst,
                  Tai Chi Newtech Inc., and EI Farming
                </strong>
                —remain the property of their respective owners. Unless expressly stated in
                writing, references to compatibility, interoperability, maintenance, or servicing
                of third-party equipment are for descriptive purposes only and do not imply
                official endorsement, agency, or corporate affiliation.
              </p>
            </div>

            {/* 4 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                4. Non-Binding Specifications, Estimates &amp; Calculators
              </h2>
              <p>
                Product specifications, structural parameters, project timelines, financial savings
                projections, and interactive tools (including the{' '}
                <strong>Solar Price Estimator</strong> and{' '}
                <strong>Farm Retrofit Configurator</strong>) are provided for general
                informational and preliminary planning purposes only.
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  No website output constitutes a binding offer, fixed quotation, engineering
                  certification, or guaranteed financial return.
                </li>
                <li>
                  Actual pricing, energy yield, payback periods, wind-load compliance, and
                  production outcomes depend on on-site technical inspection, soil/structural
                  conditions, utility tariffs, permitting, and operational management.
                </li>
                <li>
                  All turnkey construction, equipment supply, and integration engagements require a
                  formal written quotation, technical scope, and executed contract signed by
                  authorized representatives of CCDI and the client.
                </li>
              </ul>
            </div>

            {/* 5 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                5. Warranties &amp; After-Sales Services
              </h2>
              <p>
                Any references to equipment warranties (such as 25-year solar module linear
                performance warranties) reflect manufacturer OEM warranty terms separate from
                CCDI&rsquo;s workmanship warranty, and are governed strictly by the applicable OEM
                warranty certificate and executed project contract.
              </p>
              <p>
                Response-time targets and Service Level Agreement (SLA) matrices presented on our
                after-sales pages are indicative only and apply exclusively to clients covered by an
                active, executed Annual Maintenance Agreement (AMA) or written service contract,
                subject to site accessibility and spare parts availability.
              </p>
            </div>

            {/* 6 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                6. Acceptable Use &amp; External Links
              </h2>
              <p>
                You agree not to misuse this website, attempt unauthorized access, introduce
                malicious code, or submit false or misleading inquiries. External links (such as
                social media pages or map links) are provided for convenience; CCDI is not
                responsible for the content, availability, or privacy practices of external sites.
              </p>
            </div>

            {/* 7 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                7. Disclaimer of Warranties &amp; Limitation of Liability
              </h2>
              <p>
                This website and its contents are provided on an &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; basis without warranties of any kind, express or implied, including
                warranties of accuracy, completeness, merchantability, or fitness for a particular
                purpose. To the fullest extent permitted by law, CCDI shall not be liable for any
                indirect, incidental, consequential, or special damages arising from your reliance
                on website estimates or temporary website unavailability.
              </p>
            </div>

            {/* 8 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                8. Governing Law &amp; Venue
              </h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of
                the <strong>Republic of the Philippines</strong>. Any dispute arising out of or
                relating to the use of this website shall be brought exclusively before the proper
                courts of Pampanga, Philippines, subject to mandatory consumer or statutory
                provisions where applicable.
              </p>
            </div>

            {/* 9 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">9. Contact Information</h2>
              <p>
                Questions regarding these Terms of Use may be directed to {LEGAL_ENTITY_NAME} at{' '}
                {HQ_ADDRESS}, via email at{' '}
                <a
                  href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
                  className="text-amber-700 font-semibold hover:underline"
                >
                  {PRIVACY_CONTACT_EMAIL}
                </a>
                , or by phone at {CONTACT_HOTLINE}.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <Link
              to="/privacy-policy"
              className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
            >
              Read our Privacy Policy &rarr;
            </Link>
            <Link
              to="/"
              className="px-4 py-2 rounded-[2px] bg-[#0B192C] text-white font-bold uppercase tracking-wider hover:bg-[#102A43] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
