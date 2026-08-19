import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', queryType: 'General Admission', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Thank you! Your enquiry has been received. Our team will contact you within 24 hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cbse-light text-cbse-blue text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-cbse-gold" />
          <span>Bengaluru Campus • Whitefield Technology Corridor</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Contact & Location Details
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We welcome prospective families, educationists, and partners to visit our campus or connect with our administrative officers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-xs">
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cbse-navy text-cbse-gold flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Campus Address</h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  St. Joseph English High School<br />
                  Survey No. 48/2, Varthur Main Road,<br />
                  Near ITPL, Whitefield, Bengaluru,<br />
                  Karnataka - 560066
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cbse-blue text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Telephone & Admissions Desk</h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-mono">
                  +91 80 2845 7890<br />
                  +91 98801 23456 (Admissions Hotline)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Email Addresses</h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  General: info@vidyamandir-bengaluru.edu.in<br />
                  Admissions: admissions@vidyamandir-bengaluru.edu.in<br />
                  Principal: principal@vidyamandir-bengaluru.edu.in
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-cbse-gold flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Office Visiting Hours</h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Monday to Friday: 08:30 AM - 04:00 PM<br />
                  Saturday: 09:00 AM - 01:00 PM<br />
                  Sunday & Gazetted Holidays: Closed
                </p>
              </div>
            </div>

          </div>

          {/* Child Helpline & POCSO Card */}
          <div className="bg-rose-50 dark:bg-rose-950/40 rounded-2xl p-4 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-rose-800 dark:text-rose-300">
              <ShieldAlert className="w-4 h-4" />
              <span>Grievance Redressal & POCSO Helpline</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              For any urgent student safety or child rights grievances, contact our Child Protection Officer at <strong>+91 80 2845 7899</strong> or Govt Childline <strong>1098</strong>.
            </p>
          </div>
        </div>

        {/* Contact Enquiry Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
          <h3 className="text-xl font-bold font-serif text-cbse-navy dark:text-white mb-2">
            Send an Online Enquiry
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Fill in the form below and our admissions counseling team will get back to you promptly.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Deshmukh"
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. anand@gmail.com"
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98450 12345"
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Subject of Enquiry *</label>
                  <select
                    value={formData.queryType}
                    onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                  >
                    <option>General Admission 2026-27</option>
                    <option>RTE 25% Quota Enquiry</option>
                    <option>Senior Secondary Streams (Class 11)</option>
                    <option>Transport & Bus Route Information</option>
                    <option>Alumni Association Query</option>
                    <option>Careers & Faculty Recruitment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Message / Question *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your query or request for campus visit..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-cbse-navy text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-cbse-blue transition-colors shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Enquiry Submitted Successfully!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out. An admissions counselor will get in touch with you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', queryType: 'General Admission', message: '' });
                }}
                className="px-4 py-2 rounded-xl bg-cbse-light text-cbse-blue font-bold text-xs hover:bg-slate-200"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
