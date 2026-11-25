import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { SolutionHeroBanner } from '../components/molecules/SolutionHeroBanner';
import { CornerAccent } from '../components/atoms/ArchitecturalAccents';
import {
  LEGAL_ENTITY_NAME,
  PRIVACY_CONTACT_EMAIL,
  RECRUITMENT_EMAIL,
  CONTACT_HOTLINE,
  CONTACT_LANDLINE,
  HQ_ADDRESS,
  BRANCH_ADDRESS,
  LEGAL_EFFECTIVE_DATE,
} from '../config/legal';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left">
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'PRIVACY POLICY' },
        ]}
        title="Privacy Policy"
        subtitle={`How ${LEGAL_ENTITY_NAME} collects, uses, protects, and manages personal data in compliance with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173) and applicable international data protection standards.`}
      />

      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <CornerAccent />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Meta Header */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[2px] bg-[#0B192C] text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  Data Privacy Compliance Notice
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
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                1. Personal Information Controller &amp; Privacy Contact
              </h2>
              <p>
                {LEGAL_ENTITY_NAME} (&ldquo;CCDI,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) acts as the Personal Information Controller for personal data
                collected through this website and our commercial inquiry channels.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-[2px] text-xs space-y-1.5">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Headquarters:</strong> {HQ_ADDRESS}
                    <br />
                    <strong>Operations Office:</strong> {BRANCH_ADDRESS}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Privacy / Data Protection Contact:</strong>{' '}
                    <a
                      href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
                      className="text-amber-700 font-semibold hover:underline"
                    >
                      {PRIVACY_CONTACT_EMAIL}
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Hotline:</strong> {CONTACT_HOTLINE} &middot; <strong>Landline:</strong>{' '}
                    {CONTACT_LANDLINE}
                  </span>
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                2. Scope &amp; Personal Data We Collect
              </h2>
              <p>
                We collect only personal information that you voluntarily submit when contacting us
                or requesting engineering, quotation, or recruitment information:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  <strong>General &amp; Product Consultation Inquiries:</strong> Full name, business
                  email address, optional phone number, company or farm name, proposed site
                  location, selected discipline, attached equipment specifications, and project
                  details.
                </li>
                <li>
                  <strong>Solar Price Estimator &amp; Site Assessment Requests:</strong> Full name,
                  property or farm name, phone number, email address, province/location, and
                  calculated system sizing preferences.
                </li>
                <li>
                  <strong>Farm Retrofit Assessment Requests:</strong> Full name, farm/company name,
                  phone number, optional email address, farm location, existing house
                  dimensions/specifications, upgrade selections, and preferred contact channel.
                </li>
                <li>
                  <strong>Careers &amp; Recruitment Applications:</strong> Full name, email address,
                  phone number, experience summary, CV/resume, and any optional applicant photograph
                  you choose to provide when emailing {RECRUITMENT_EMAIL}.
                </li>
              </ul>
              <p className="text-xs text-slate-600">
                Note: Our website forms prepare a pre-filled email draft for your email client so
                you retain full control before sending your inquiry to CCDI.
              </p>
            </div>

            {/* 3 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                3. Purposes &amp; Lawful Basis for Processing
              </h2>
              <p>We process your personal data based on your consent, pre-contractual steps taken at your request, our legitimate business interests, or legal obligations, strictly for:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Preparing technical proposals, Bills of Quantities (BOQ), and engineering consultations.</li>
                <li>Scheduling site visits, retrofit audits, and solar feasibility assessments.</li>
                <li>Delivering contracted after-sales maintenance, spare parts, and warranty support.</li>
                <li>Evaluating job applications and communicating with recruitment candidates.</li>
                <li>Complying with applicable Philippine laws, tax/accounting rules, and regulatory obligations.</li>
              </ul>
            </div>

            {/* 4 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                4. Cookies, Tracking &amp; Third-Party Requests
              </h2>
              <p>
                This website is designed with privacy-by-default principles. We{' '}
                <strong>do not set advertising, behavioral tracking, or third-party analytics cookies</strong>,
                and all web fonts are self-hosted directly from our own domain rather than loaded
                from external font CDNs.
              </p>
              <p>
                Standard technical access logs (such as IP address, timestamp, browser user-agent,
                and requested URL) may be temporarily processed by our hosting infrastructure
                provider solely to serve web pages, prevent abuse, and maintain network security.
              </p>
            </div>

            {/* 5 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                5. Data Sharing, Cross-Border Transfers &amp; Retention
              </h2>
              <p>
                We <strong>do not sell, rent, or trade</strong> your personal data to third parties.
                Information may be shared only internally with authorized CCDI engineering, sales,
                or HR personnel, or with essential service providers (such as email/cloud hosting
                and infrastructure partners) bound by confidentiality and data protection
                obligations, or when required by law.
              </p>
              <p>
                Where hosting or email providers process data outside the Philippines, CCDI takes
                reasonable organizational and technical steps to ensure comparable levels of data
                protection in accordance with RA 10173 and applicable cross-border transfer rules.
              </p>
              <p>
                We retain personal data only as long as necessary to fulfill the stated inquiry,
                contract, recruitment, or statutory retention purpose, after which it is securely
                deleted or anonymized.
              </p>
            </div>

            {/* 6 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                6. Security Measures
              </h2>
              <p>
                CCDI implements reasonable and appropriate organizational, physical, and technical
                safeguards to protect personal data against unauthorized access, disclosure,
                alteration, or destruction—including HTTPS/TLS transport encryption, strict
                Content Security Policy (CSP) controls, HTTP security headers, and role-restricted
                internal access to inquiry and recruitment inboxes.
              </p>
            </div>

            {/* 7 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                7. Your Data Privacy Rights
              </h2>
              <p>
                Under the Philippine Data Privacy Act of 2012 (RA 10173) and, where applicable,
                international privacy frameworks such as the GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Be informed about how your personal data is collected and processed.</li>
                <li>Request access to a copy of the personal data we hold about you.</li>
                <li>Request correction or rectification of inaccurate or incomplete data.</li>
                <li>Object to processing, withdraw consent, or request erasure/blocking where applicable.</li>
                <li>Request data portability where processing is based on consent or contract.</li>
                <li>
                  Lodge a complaint with the{' '}
                  <strong>Philippine National Privacy Commission (NPC)</strong> or your local data
                  protection supervisory authority.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please email{' '}
                <a
                  href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
                  className="text-amber-700 font-semibold hover:underline"
                >
                  {PRIVACY_CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>

            {/* 8 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                8. Recruitment &amp; Job Applicant Privacy Notice
              </h2>
              <p>
                Personal data submitted to{' '}
                <a
                  href={`mailto:${RECRUITMENT_EMAIL}`}
                  className="text-amber-700 font-semibold hover:underline"
                >
                  {RECRUITMENT_EMAIL}
                </a>{' '}
                is used exclusively for evaluating suitability for employment at CCDI, contacting
                shortlisted candidates, and completing pre-employment verification where an offer is
                extended. Including a photograph with your initial CV is optional. Applications from
                unsuccessful candidates are retained only for a reasonable recruitment cycle unless
                you consent to longer retention or request earlier deletion.
              </p>
            </div>

            {/* 9 */}
            <div className="space-y-2.5">
              <h2 className="text-xl font-extrabold text-[#0B192C]">
                9. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                operations, website features, or legal requirements. Any updates will be posted on
                this page with an updated effective date.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <Link
              to="/terms-of-use"
              className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
            >
              Read our Terms of Use &rarr;
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
