import React, { useState } from 'react';
import {
  Building2,
  Sliders,
  GraduationCap,
  Palette,
  Bell,
  Save,
  CheckCircle,
  Upload,
  Sparkles,
  School
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsTabs({ schoolConfig, onSaveConfig }) {
  const [activeSection, setActiveSection] = useState('identity');
  const [formData, setFormData] = useState({
    name: schoolConfig?.name || "DEEPTI MONTESSORI SCHOOL",
    hindiName: schoolConfig?.hindiName || "दीप्ति मोंटेसरी स्कूल",
    udise: schoolConfig?.udise || "08120304501",
    affiliationBody: schoolConfig?.affiliationBody || "RBSE",
    affiliationNo: schoolConfig?.affiliationNo || "RAJ-SCH-2018-9941",
    affiliationYear: schoolConfig?.affiliationYear || "2018",
    session: schoolConfig?.session || "2026-27",
    category: schoolConfig?.category || "Secondary (Class 1 to 10)",
    medium: schoolConfig?.medium || ["Hindi", "English"],
    hasPrePrimary: schoolConfig?.hasPrePrimary ?? true,
    address: schoolConfig?.address || "Plot 42, Knowledge Park Road, Sector 5, Jaipur, Rajasthan - 302020",
    mobile: schoolConfig?.mobile || "+91 98290 12345",
    email: schoolConfig?.email || "office@deeptischool.edu.in",
    principal: schoolConfig?.principal || "Sudarshan Maurya",
    role: schoolConfig?.role || "Owner",
    theme: schoolConfig?.theme || "Royal Indigo (#130070) & Slate Grey (#808080)",
    notificationPosition: schoolConfig?.notificationPosition || "Top Right"
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: 'identity', label: 'Identity & Branding', icon: Building2 },
    { id: 'config', label: 'School Configuration', icon: Sliders },
    { id: 'academic', label: 'Academic & Affiliation', icon: GraduationCap },
    { id: 'theme', label: 'App Theme Selector', icon: Palette },
    { id: 'notification', label: 'Notification Style', icon: Bell },
  ];

  const themeOptions = [
    { id: 'royal', name: 'Royal Indigo (#130070) & Slate Grey (#808080)', primary: '#130070', secondary: '#808080', bg: '#F5F3FF', badge: 'Active Standard' },
    { id: 'crimson', name: 'Crimson Red', primary: '#BE123C', secondary: '#9CA3AF', bg: '#FFF1F2', badge: 'Classic' },
    { id: 'blue', name: 'Classic Blue', primary: '#0284C7', secondary: '#94A3B8', bg: '#F0F9FF', badge: 'Corporate' },
    { id: 'orange', name: 'Professional Orange', primary: '#EA580C', secondary: '#A8A29E', bg: '#FFF7ED', badge: 'Energetic' },
    { id: 'purple', name: 'Royal Purple', primary: '#7C3AED', secondary: '#A1A1AA', bg: '#FAF5FF', badge: 'Modern' },
  ];

  const notificationPositions = [
    'Top Right',
    'Top Center',
    'Bottom Right',
    'Bottom Center'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMediumToggle = (lang) => {
    setFormData(prev => {
      const exists = prev.medium.includes(lang);
      return {
        ...prev,
        medium: exists ? prev.medium.filter(m => m !== lang) : [...prev.medium, lang]
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveConfig(formData);
      setSavedSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sections.map(sec => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                  : 'bg-[#F0EBFA] border border-[#DCD4FD] text-slate-700 hover:bg-[#ECE7FE]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Settings Card */}
      <form onSubmit={handleSave} className="bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] p-6 sm:p-8 shadow-sm space-y-6">
        {/* SECTION 1: Identity & Branding */}
        {activeSection === 'identity' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#DCD4FD]/60 pb-3">
              <h3 className="text-base font-bold text-slate-900">Identity & Branding</h3>
              <p className="text-xs text-[#808080]">School legal details shown on receipts, marksheet, and letters</p>
            </div>

            {/* Logo Preview Row */}
            <div className="flex items-center gap-5 p-4 bg-[#ECE7FE]/40 rounded-2xl border border-[#DCD4FD]">
              <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md shadow-emerald-800/20 shrink-0">
                DM
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">School Crest & Emblem</h4>
                <p className="text-xs text-[#808080]">PNG or SVG format (Transparent, 512x512 max)</p>
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-[#F0EBFA] border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload School Logo</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  School Name (English) *
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-semibold uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  विद्यालय का नाम (हिंदी) *
                </label>
                <input
                  type="text"
                  name="hindiName"
                  value={formData.hindiName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Campus Address *
                </label>
                <textarea
                  rows="2"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Official Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  School Mobile / Office Helpline
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: School Configuration */}
        {activeSection === 'config' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#DCD4FD]/60 pb-3">
              <h3 className="text-base font-bold text-slate-900">School Configuration</h3>
              <p className="text-xs text-[#808080]">Category, medium of instruction, and branch structure</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  School Category Level
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
                >
                  <option value="Primary (Class 1 to 5)">Primary (Class 1 to 5)</option>
                  <option value="Upper Primary (Class 1 to 8)">Upper Primary (Class 1 to 8)</option>
                  <option value="Secondary (Class 1 to 10)">Secondary (Class 1 to 10)</option>
                  <option value="Senior Secondary (Class 1 to 12)">Senior Secondary (Class 1 to 12)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Active Academic Session
                </label>
                <input
                  type="text"
                  name="session"
                  value={formData.session}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-bold font-mono"
                />
              </div>
            </div>

            {/* Toggle Switch: Pre-Primary */}
            <div className="flex items-center justify-between p-4 bg-[#ECE7FE]/40 rounded-2xl border border-[#DCD4FD]">
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase">Pre-Primary Section Attached?</p>
                <p className="text-xs text-[#808080] mt-0.5">Enables Nursery, LKG, and UKG modules and student rosters</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="hasPrePrimary"
                  checked={formData.hasPrePrimary}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#DCD4FD] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Medium checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                School Medium of Instruction (Select Applicable)
              </label>
              <div className="flex items-center gap-4">
                {['Hindi', 'English'].map(lang => (
                  <label
                    key={lang}
                    onClick={() => handleMediumToggle(lang)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      formData.medium.includes(lang)
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-[#F0EBFA] border-[#DCD4FD] text-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.medium.includes(lang)}
                      onChange={() => {}}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>{lang} Medium</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Academic Details */}
        {activeSection === 'academic' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#DCD4FD]/60 pb-3">
              <h3 className="text-base font-bold text-slate-900">Academic & Affiliation Details</h3>
              <p className="text-xs text-[#808080]">Government codes required for RTE and Board certifications</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  UDISE+ Code (Govt of India)
                </label>
                <input
                  type="text"
                  name="udise"
                  value={formData.udise}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Affiliation Body
                </label>
                <select
                  name="affiliationBody"
                  value={formData.affiliationBody}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
                >
                  <option value="RBSE">RBSE (Rajasthan Board of Secondary Education)</option>
                  <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                  <option value="ICSE">ICSE / CISCE Board</option>
                  <option value="State Board">Other State Board</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Affiliation / Recognition Number
                </label>
                <input
                  type="text"
                  name="affiliationNo"
                  value={formData.affiliationNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Affiliation Year
                </label>
                <input
                  type="text"
                  name="affiliationYear"
                  value={formData.affiliationYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-[#ECE7FE]/40 border border-[#DCD4FD] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: App Theme Selector */}
        {activeSection === 'theme' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#DCD4FD]/60 pb-3">
              <h3 className="text-base font-bold text-slate-900">App Theme Selector</h3>
              <p className="text-xs text-[#808080]">Personalize dashboard accents, buttons, and highlights</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themeOptions.map(th => {
                const isSelected = formData.theme === th.name;
                return (
                  <div
                    key={th.id}
                    onClick={() => setFormData(prev => ({ ...prev, theme: th.name }))}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/30'
                        : 'border-[#DCD4FD] bg-[#F0EBFA] hover:border-[#130070]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-white"
                        style={{ backgroundColor: th.primary }}
                      >
                        {isSelected && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{th.name}</p>
                        <p className="text-[11px] text-[#808080]">{th.badge}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#808080] uppercase">
                      {th.primary}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 5: Notification Style Selector */}
        {activeSection === 'notification' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#DCD4FD]/60 pb-3">
              <h3 className="text-base font-bold text-slate-900">Notification Style Selector</h3>
              <p className="text-xs text-[#808080]">Position where alerts, toasts, and SMS sync notices appear</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {notificationPositions.map(pos => {
                const isSelected = formData.notificationPosition === pos;
                return (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, notificationPosition: pos }))}
                    className={`p-4 rounded-xl border text-xs font-bold text-center transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-[#DCD4FD] bg-[#F0EBFA] text-slate-600 hover:bg-[#ECE7FE]'
                    }`}
                  >
                    <span>{pos}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sticky Save Button (at bottom of screen) */}
        <div className="pt-4 border-t border-[#DCD4FD]/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {savedSuccess ? 'Configuration saved to local database!' : 'Unsaved changes are preserved in browser cache'}
          </span>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 text-xs font-extrabold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-md shadow-emerald-700/25 hover:scale-[1.02]"
          >
            {savedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-200" />
                <span>SAVED!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'SAVING...' : 'SAVE CONFIGURATION'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
