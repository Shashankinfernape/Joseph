import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  GooglePlayLogo,
  AppStoreLogo,
  Bird as Owl
} from '@phosphor-icons/react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 text-sm border-t-4 border-primary">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-700">
          
          {/* Col 1: School Info & Mascot */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg animate-bounce">
                <Owl weight="duotone" size={32} />
              </div>
              <span className="font-display font-bold text-2xl">
                St. Joseph English High School CBSE School
              </span>
            </div>
            
            <p className="leading-relaxed text-slate-300">
              An elite educational institution fostering academic excellence and holistic growth for the next generation of leaders.
            </p>

            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
              <div className="flex items-center gap-2 font-semibold text-blue-400 mb-2">
                <ShieldCheck size={20} weight="duotone" />
                <span>CBSE Compliance</span>
              </div>
              <p className="text-xs text-slate-400 space-y-1">
                <span className="block">Affiliation No: <strong className="text-slate-200">830942</strong></span>
                <span className="block">School Code: <strong className="text-slate-200">45891</strong></span>
                <span className="block">Valid until: <strong className="text-slate-200">31-03-2029</strong></span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-6 md:pl-8">
            <h3 className="font-semibold text-lg tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 font-medium text-slate-300">
              <li><Link to="/admissions" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/70">›</span> Admissions 2026-27</Link></li>
              <li><Link to="/academics" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/70">›</span> Curriculum & Streams</Link></li>
              <li><Link to="/infrastructure" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/70">›</span> Campus Facilities</Link></li>
              <li><Link to="/mandatory-disclosure" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/70">›</span> Mandatory Public Disclosures</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/70">›</span> Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact & Apps */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg tracking-wide text-white">
              Contact & Social
            </h3>
            <div className="space-y-4 font-medium text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin size={20} weight="duotone" className="text-primary shrink-0 mt-0.5" />
                <span>Survey No. 48/2, Varthur Main Road, Whitefield, Bengaluru 560066</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} weight="duotone" className="text-primary shrink-0" />
                <span>+91 80 2845 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeSimple size={20} weight="duotone" className="text-primary shrink-0" />
                <span>info@vidyamandir.edu.in</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"><FacebookLogo size={20} weight="fill" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"><TwitterLogo size={20} weight="fill" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"><InstagramLogo size={20} weight="fill" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors"><YoutubeLogo size={20} weight="fill" /></a>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a href="#" className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors text-white">
                <GooglePlayLogo size={20} weight="fill" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] leading-none text-slate-400">GET IT ON</span>
                  <span className="text-xs font-bold leading-none">Google Play</span>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors text-white">
                <AppStoreLogo size={20} weight="fill" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] leading-none text-slate-400">Download on the</span>
                  <span className="text-xs font-bold leading-none">App Store</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-medium text-slate-400 text-xs sm:text-sm">
          <div>
            © {new Date().getFullYear()} St. Joseph English High School. {t('allRightsReserved')}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('privacyPolicy')}</Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link to="/accessibility" className="hover:text-white transition-colors">{t('accessibilityStatement')}</Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link to="/contact-us" className="hover:text-white transition-colors">{t('navContact')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
