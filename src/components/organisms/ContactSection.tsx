import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Mail, MapPin, Phone, Clock, X, Building2,
  CheckCircle2, Copy, Check,
  Layers, Home, Egg, Factory, Sun, HardHat, Trash2,
  ChevronDown, ChevronUp, Sparkles,
} from "lucide-react";
import type { Product } from "../../data/mockProducts";
import { SectionAccents } from "../atoms/ArchitecturalAccents";
import { buildMailtoUrl } from "../../utils/inquiryMailto";
import { PRIVACY_CONTACT_EMAIL } from "../../config/legal";

export interface ContactSectionProps {
  inquiryItems: Product[];
  onRemoveInquiryItem: (productId: string) => void;
  onClearInquiry?: () => void;
}

const SERVICE_CATEGORIES = [
  { id: "Poultry",  title: "Poultry Facilities",    icon: Home    },
  { id: "Hatchery", title: "Hatchery Construction", icon: Egg     },
  { id: "Feedmill", title: "Feedmill Systems",       icon: Factory },
  { id: "Solar",    title: "Solar Power Systems Integration",  icon: Sun     },
  { id: "General",  title: "General Construction",  icon: HardHat },
];

const OFFICES = [
  {
    id: "clark",   name: "Clark Freeport Zone HQ",  badge: "Main Headquarters",
    address: "Office Center 05J Berthaphil Clark Center, Clark Freeport Zone, Pampanga, Philippines",
    phone: "+63 925 7588 458", landline: "(045) 499 8508", email: "inquiries@ccdi-asia.com",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM PST",
    mapLink: "https://maps.google.com/?q=Berthaphil+Clark+Center+Pampanga",
  },
  {
    id: "angeles", name: "Angeles City Branch",     badge: "Operations and Engineering",
    address: "Blk 22 Lot 6 Fil-Am Friendship Hi-way, Cut-cut, Angeles City, Pampanga, Philippines",
    phone: "+63 925 7588 458", landline: "(045) 499 8508", email: "inquiries@ccdi-asia.com",
    hours: "Mon - Sat: 8:00 AM - 5:00 PM PST",
    mapLink: "https://maps.google.com/?q=Fil-Am+Friendship+Highway+Angeles+City",
  },
];

const OfficeInfoPanel: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<"clark" | "angeles">("clark");
  const office = OFFICES.find(o => o.id === activeTab) ?? OFFICES[0];
  return (
    <div className="bg-[#0B192C] border border-[#102A43] rounded-[2px] p-6 space-y-5 text-left font-sans">
      <div className="flex items-center justify-between font-bold text-white text-base">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Office Locations</span>
        </div>
        <img
          src="/images/branding/ccdi-logo.svg"
          alt="CCDI"
          loading="lazy"
          decoding="async"
          className="h-7 w-auto object-contain shrink-0"
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#07162A] rounded-[2px] border border-[#102A43]">
        {OFFICES.map(o => (
          <button key={o.id} onClick={() => setActiveTab(o.id as "clark" | "angeles")}
            className={["py-2 px-3 rounded-[2px] text-xs font-bold transition-colors flex items-center justify-center gap-1.5",
              activeTab === o.id ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white hover:bg-[#102A43]"].join(" ")}>
            <Building2 className="w-3.5 h-3.5" />
            {o.id === "clark" ? "Clark HQ" : "Angeles Branch"}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={office.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="space-y-4">
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-widest">{office.badge}</span>
            <p className="text-sm font-bold text-white">{office.name}</p>
          </div>
          <p className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed bg-[#07162A] p-3 rounded-[2px] border border-[#102A43]">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />{office.address}
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#07162A] p-2.5 rounded-[2px] border border-[#102A43] space-y-0.5">
              <span className="font-mono text-[10px] text-slate-400 uppercase">Hours</span>
              <p className="text-[11px] text-slate-200 font-medium">{office.hours}</p>
            </div>
            <div className="bg-[#07162A] p-2.5 rounded-[2px] border border-[#102A43] space-y-0.5">
              <span className="font-mono text-[10px] text-slate-400 uppercase">Landline</span>
              <p className="text-[11px] text-slate-200 font-medium">{office.landline}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
OfficeInfoPanel.displayName = "OfficeInfoPanel";

const InquiryAttachments: React.FC<{ inquiryItems: Product[]; onRemoveInquiryItem: (id: string) => void; onClearInquiry?: () => void }> =
  React.memo(({ inquiryItems, onRemoveInquiryItem, onClearInquiry }) => (
    <div className="bg-[#0B192C] border border-amber-400/30 rounded-[2px] p-4 space-y-2.5 text-left font-sans">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400 font-bold">
          <Layers className="w-4 h-4" /><span>ATTACHED CATALOG ITEMS ({inquiryItems.length})</span>
        </div>
        <button type="button"
          onClick={() => { if (onClearInquiry) { onClearInquiry(); } else { inquiryItems.forEach(item => onRemoveInquiryItem(item.id)); } }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-xs font-bold text-red-400 hover:text-white bg-red-950/40 border border-red-800/40 transition-colors">
          <Trash2 className="w-3 h-3" /><span>Clear All</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {inquiryItems.map(item => (
          <span key={item.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-semibold text-white bg-[#07162A] border border-[#102A43]">
            {item.title}
            <button type="button" onClick={() => onRemoveInquiryItem(item.id)}
              className="ml-0.5 text-slate-400 hover:text-amber-400 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  ));
InquiryAttachments.displayName = "InquiryAttachments";

export const ContactSection: React.FC<ContactSectionProps> = ({ inquiryItems, onRemoveInquiryItem, onClearInquiry }) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [mailtoUrl, setMailtoUrl] = useState<string>("");
  const [draftText, setDraftText] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", location: "", message: "" });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };
  const handleChange = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Please fill in your full name and business email.");
      return;
    }
    if (showAdvanced && !formData.message.trim()) {
      setFormError("Please describe your project needs.");
      return;
    }
    if (!privacyAccepted) {
      setFormError("Please confirm that you have read and agree to our Privacy Policy and Terms of Use.");
      return;
    }

    const lines = [
      `Name: ${formData.name.trim()}`,
      `Business Email: ${formData.email.trim()}`,
      formData.phone.trim() ? `Phone: ${formData.phone.trim()}` : "",
      formData.company.trim() ? `Company / Farm: ${formData.company.trim()}` : "",
      formData.location.trim() ? `Proposed Site Location: ${formData.location.trim()}` : "",
      selectedService ? `Core Discipline: ${selectedService}` : "",
      inquiryItems.length > 0
        ? `Attached Catalog Items (${inquiryItems.length}): ${inquiryItems.map(item => item.title).join(", ")}`
        : "",
      formData.message.trim() ? `\r\nProject Scope / Needs:\r\n${formData.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\r\n");

    const subject = `CCDI Project Inquiry - ${formData.name.trim()}${selectedService ? ` (${selectedService})` : ""}`;
    const url = buildMailtoUrl(PRIVACY_CONTACT_EMAIL, subject, lines);
    setMailtoUrl(url);
    setDraftText(`To: ${PRIVACY_CONTACT_EMAIL}\r\nSubject: ${subject}\r\n\r\n${lines}`);
    setIsSubmitted(true);
    window.location.href = url;
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", phone: "", company: "", location: "", message: "" });
    setSelectedService("");
    setShowAdvanced(false);
    setPrivacyAccepted(false);
    setFormError("");
    setMailtoUrl("");
    setDraftText("");
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#07162A] border-b border-[#102A43] text-white text-left font-sans overflow-hidden">
      <SectionAccents />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              CCDI / GET CONSULTATION
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Partner with CCDI for your next agro-industrial build.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Whether you’re expanding a farm, building a feedmill, or adding solar power, CCDI is ready to support your poultry project.
            </p>
          </div>
          <div className="shrink-0 hidden md:flex items-center justify-center lg:justify-end">
            <img
              src="/images/branding/ccdi-logo.svg"
              alt="CCDI Logo"
              loading="lazy"
              decoding="async"
              className="h-32 sm:h-40 lg:h-48 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#102A43] pt-12">
          <div className="lg:col-span-5 space-y-6">
            <OfficeInfoPanel />
            <div className="bg-[#0B192C] border border-[#102A43] rounded-[2px] p-6 space-y-4 text-left">
              <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">Direct Communications</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#07162A] p-3 rounded-[2px] border border-[#102A43]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-slate-400 uppercase">Email</p>
                      <a href="mailto:inquiries@ccdi-asia.com" className="text-xs font-bold text-white hover:text-amber-400 transition-colors">inquiries@ccdi-asia.com</a>
                    </div>
                  </div>
                  <button onClick={() => handleCopy("inquiries@ccdi-asia.com", "email")} className="p-1.5 rounded-[2px] bg-[#102A43] text-slate-300 hover:text-white">
                    {copiedText === "email" ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-[#07162A] p-3 rounded-[2px] border border-[#102A43]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-slate-400 uppercase">Hotline</p>
                      <a href="tel:+639257588458" className="text-xs font-bold text-white hover:text-amber-400 transition-colors">+63 925 7588 458</a>
                    </div>
                  </div>
                  <button onClick={() => handleCopy("+639257588458", "phone")} className="p-1.5 rounded-[2px] bg-[#102A43] text-slate-300 hover:text-white">
                    {copiedText === "phone" ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0B192C] border border-[#102A43] rounded-[2px] p-6 sm:p-8 text-left">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                    <h3 className="text-2xl font-bold text-white">Email Draft Ready</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-amber-400">{formData.name}</strong>. Your email client has been opened with a pre-filled inquiry to <span className="font-mono text-white">{PRIVACY_CONTACT_EMAIL}</span>. Please click Send in your email app, or copy the details below.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={mailtoUrl}
                        className="px-5 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors inline-flex items-center gap-2"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Open Email Client
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(draftText, "draft")}
                        className="px-5 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold text-white bg-[#07162A] border border-[#1E3E66] hover:border-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
                      >
                        {copiedText === "draft" ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedText === "draft" ? "Copied Details" : "Copy Inquiry Details"}
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold text-slate-300 hover:text-white bg-transparent border border-[#1E3E66] transition-colors cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#102A43]">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {showAdvanced ? "Detailed Project Inquiry" : "Quick Inquiry"}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {showAdvanced ? "Provide full project details for a tailored proposal." : "Get in touch — we aim to respond within 24 hours."}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-amber-400 flex items-center gap-1 bg-[#07162A] px-2.5 py-1.5 rounded-[2px] border border-[#102A43] shrink-0">
                        <Clock className="w-3.5 h-3.5" /> 24h Target Response
                      </span>
                    </div>

                    {inquiryItems.length > 0 && (
                      <InquiryAttachments inquiryItems={inquiryItems} onRemoveInquiryItem={onRemoveInquiryItem} onClearInquiry={onClearInquiry} />
                    )}

                    {/* Always-visible: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="contact-name" className="font-mono text-[10px] text-slate-400 uppercase">Full Name *</label>
                        <input id="contact-name" type="text" required value={formData.name} onChange={handleChange("name")}
                          placeholder="e.g. Juan Dela Cruz"
                          className="w-full px-3 py-2 rounded-[2px] bg-[#07162A] border border-[#102A43] text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="contact-email" className="font-mono text-[10px] text-slate-400 uppercase">Business Email *</label>
                        <input id="contact-email" type="email" required value={formData.email} onChange={handleChange("email")}
                          placeholder="juan@company.com"
                          className="w-full px-3 py-2 rounded-[2px] bg-[#07162A] border border-[#102A43] text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400" />
                      </div>
                    </div>

                    {/* Advanced toggle */}
                    <button
                      type="button"
                      id="advanced-inquiry-toggle"
                      onClick={() => setShowAdvanced(prev => !prev)}
                      className={[
                        "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-[2px] border transition-all duration-200 cursor-pointer",
                        showAdvanced
                          ? "bg-amber-400/10 border-amber-400/40 text-amber-400"
                          : "bg-[#07162A] border-[#102A43] text-slate-300 hover:border-amber-400/30 hover:text-amber-400",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        {showAdvanced ? "Advanced Inquiry Active" : "Switch to Advanced Inquiry"}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
                        {showAdvanced
                          ? <><span>Collapse</span><ChevronUp className="w-3.5 h-3.5" /></>
                          : <><span>Include project details</span><ChevronDown className="w-3.5 h-3.5" /></>
                        }
                      </span>
                    </button>

                    {/* Advanced fields */}
                    <AnimatePresence initial={false}>
                      {showAdvanced && (
                        <motion.div
                          key="advanced-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-5 border-t border-[#102A43] pt-5">
                            <div className="space-y-3">
                              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">Client Details</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label htmlFor="contact-phone" className="font-mono text-[10px] text-slate-400 uppercase flex items-center justify-between">
                                    <span>Phone Number</span><span className="text-slate-500 font-normal lowercase">(optional)</span>
                                  </label>
                                  <input id="contact-phone" type="tel" value={formData.phone} onChange={handleChange("phone")}
                                    placeholder="+63 917 000 0000"
                                    className="w-full px-3 py-2 rounded-[2px] bg-[#07162A] border border-[#102A43] text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400" />
                                </div>
                                <div className="space-y-1">
                                  <label htmlFor="contact-company" className="font-mono text-[10px] text-slate-400 uppercase flex items-center justify-between">
                                    <span>Company / Farm Name</span><span className="text-slate-500 font-normal lowercase">(optional)</span>
                                  </label>
                                  <input id="contact-company" type="text" value={formData.company} onChange={handleChange("company")}
                                    placeholder="e.g. Clark Agribusiness Corp."
                                    className="w-full px-3 py-2 rounded-[2px] bg-[#07162A] border border-[#102A43] text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">Project Scope &amp; Site</p>
                              <div className="space-y-1">
                                <label htmlFor="contact-location" className="font-mono text-[10px] text-slate-400 uppercase flex items-center justify-between">
                                  <span>Proposed Site Location</span><span className="text-slate-500 font-normal lowercase">(optional)</span>
                                </label>
                                <input id="contact-location" type="text" value={formData.location} onChange={handleChange("location")}
                                  placeholder="e.g. Capas, Tarlac / San Fernando, Pampanga"
                                  className="w-full px-3 py-2 rounded-[2px] bg-[#07162A] border border-[#102A43] text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400" />
                              </div>
                              <div className="space-y-1">
                                <label htmlFor="contact-message" className="font-mono text-[10px] text-slate-400 uppercase">Technical Scope / Project Needs *</label>
                                <textarea id="contact-message" required rows={4} value={formData.message} onChange={handleChange("message")}
                                  placeholder="State capacity requirements, bird count targets, feedmill tonnage per hour, or solar kWp..."
                                  className="w-full px-3 py-2 rounded-[2px] bg-[#07162A] border border-[#102A43] text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 resize-none" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">Core Discipline Required</p>
                              <div className="flex flex-wrap gap-2">
                                {SERVICE_CATEGORIES.map(cat => {
                                  const selected = selectedService === cat.id;
                                  return (
                                    <button key={cat.id} type="button"
                                      onClick={() => setSelectedService(prev => prev === cat.id ? "" : cat.id)}
                                      className={["px-3 py-1.5 rounded-[2px] font-sans text-xs font-bold transition-colors border",
                                        selected ? "bg-amber-400 text-slate-950 border-amber-400" : "bg-[#07162A] border-[#102A43] text-slate-300 hover:border-amber-400/40"].join(" ")}>
                                      <span>{cat.title}</span>
                                      {selected && <span className="ml-1 font-mono">✓</span>}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Data Privacy Consent */}
                    <div className="space-y-2 pt-1">
                      <label htmlFor="contact-privacy-consent" className="flex items-start gap-2.5 text-[11px] text-slate-300 leading-relaxed cursor-pointer">
                        <input
                          id="contact-privacy-consent"
                          type="checkbox"
                          required
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          className="mt-0.5 rounded text-amber-400 focus:ring-amber-400 shrink-0"
                        />
                        <span>
                          I consent to CCDI processing the personal details above to respond to my inquiry in accordance with the{" "}
                          <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-semibold">
                            Privacy Policy
                          </Link>{" "}
                          and{" "}
                          <Link to="/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-semibold">
                            Terms of Use
                          </Link>
                          . *
                        </span>
                      </label>
                      {formError && (
                        <p className="text-xs text-red-300 bg-red-950/50 border border-red-800/60 rounded-[2px] px-3 py-2">
                          {formError}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-1 space-y-2">
                      <button type="submit"
                        className="w-full py-3.5 px-6 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <span>{showAdvanced ? "Prepare Consultation Email" : "Prepare Quick Inquiry Email"}</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                      {!showAdvanced && (
                        <p className="text-center text-[10px] font-mono text-slate-500">
                          Need to include project details?{" "}
                          <button type="button" onClick={() => setShowAdvanced(true)}
                            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer">
                            Switch to Advanced Inquiry
                          </button>
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
