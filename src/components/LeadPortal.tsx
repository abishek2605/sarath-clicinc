import React, { useState, useEffect } from 'react';
import { Lock, X, Table, Users, Sparkles, Trash2, Download, Send, CheckCircle } from 'lucide-react';
import { LeadSubmission } from '../types';

interface LeadPortalProps {
  onClose: () => void;
}

export default function LeadPortal({ onClose }: LeadPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [showWebhookSuccess, setShowWebhookSuccess] = useState(false);

  // Load leads from localStorage
  const loadLeads = () => {
    const data = JSON.parse(localStorage.getItem('bonitaa_leads') || '[]');
    setLeads(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bonitaa123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Access Code. Please enter clinical default bonitaa123.');
    }
  };

  const handleDeleteLead = (index: number) => {
    const updated = [...leads];
    updated.splice(index, 1);
    localStorage.setItem('bonitaa_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bonitaa_leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleTriggerWebhook = () => {
    setShowWebhookSuccess(true);
    setTimeout(() => {
      setShowWebhookSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 text-white" id="staff-portal-modal">
      <div className="relative w-full max-w-4xl bg-[#111111] border border-gold/30 rounded-lg p-6 sm:p-8 shadow-2xl flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors"
          id="close-staff-portal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 1. PASSWORD AUTHENTICATION SCREEN */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12 text-center space-y-6" id="staff-auth-screen">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xl text-white">Staff Lead Portal</h3>
              <p className="text-xs text-gray-400 mt-1">
                Enter your secure coordinator password to view captured leads.
              </p>
              <p className="text-[10px] text-gold/60 mt-1 uppercase tracking-widest">
                Clinical Default: bonitaa123
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter staff password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#181818] border border-gray-800 rounded px-4 py-3 text-sm text-center text-white focus:outline-none focus:border-gold"
                  id="portal-pass-input"
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-black font-bold text-xs uppercase tracking-widest py-3 px-4 rounded hover:bg-gold/90 transition-colors cursor-pointer"
                id="portal-auth-submit"
              >
                Unlock Inquiries
              </button>
            </form>
          </div>
        ) : (
          /* 2. MAIN LEADS DASHBOARD */
          <div className="space-y-6 text-left" id="staff-dashboard">
            {/* Header copy */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-900 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-gold/15 text-gold font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    Administrative Console
                  </span>
                  <span className="text-xs text-green-500 flex items-center gap-1 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    Live Connection
                  </span>
                </div>
                <h3 className="font-sans font-bold text-xl text-white mt-2">
                  Captured Inquiries Database
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Review skin and hair appointments registered via Google Ads landing page.
                </p>
              </div>

              {/* Stats / Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handleExportJSON}
                  disabled={leads.length === 0}
                  className="bg-gray-900 hover:bg-gray-850 text-white border border-gray-800 font-bold text-xs uppercase tracking-widest py-2.5 px-4 rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  id="portal-export-btn"
                >
                  <Download className="w-4 h-4" />
                  JSON Dump
                </button>
                <button
                  onClick={handleTriggerWebhook}
                  disabled={leads.length === 0}
                  className="bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-2.5 px-4 rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  id="portal-webhook-btn"
                >
                  <Send className="w-4 h-4" />
                  CRM Sync
                </button>
              </div>
            </div>

            {/* Webhook notification */}
            {showWebhookSuccess && (
              <div className="bg-green-950/40 border border-green-800 text-green-300 p-4 rounded flex items-center gap-2 animate-fade-in text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                <span>Success: API Webhook payload successfully pushed to CRM/GHL connector mock endpoint!</span>
              </div>
            )}

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black/60 border border-gray-900 p-5 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Enquiries</p>
                  <p className="text-xl font-bold text-white mt-1">{leads.length}</p>
                </div>
              </div>

              <div className="bg-black/60 border border-gray-900 p-5 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Latest Source</p>
                  <p className="text-xs font-bold text-white mt-1 leading-snug truncate max-w-[150px]">
                    {leads.length > 0 ? leads[0].name : 'No submissions'}
                  </p>
                </div>
              </div>

              <div className="bg-black/60 border border-gray-900 p-5 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Top Treatment</p>
                  <p className="text-xs font-bold text-white mt-1 leading-snug">
                    {leads.length > 0 ? leads[0].treatment : 'No submissions'}
                  </p>
                </div>
              </div>
            </div>

            {/* Leads Table list */}
            <div className="bg-black/40 border border-gray-900 rounded-lg overflow-hidden">
              {leads.length === 0 ? (
                <div className="p-12 text-center text-gray-500 text-sm">
                  No inquiries have been recorded yet. Submissions from the hero and popup forms will appear here in real time.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-black border-b border-gray-900 text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                        <th className="p-4">Name</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Treatment</th>
                        <th className="p-4">Preferred Time</th>
                        <th className="p-4">Submitted At</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-900 text-gray-300">
                      {leads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-gray-950/50">
                          <td className="p-4 font-bold text-white">{lead.name}</td>
                          <td className="p-4">
                            <a href={`tel:${lead.phone}`} className="hover:text-gold transition-colors">
                              {lead.phone}
                            </a>
                          </td>
                          <td className="p-4">
                            <span className="bg-gold/10 text-gold font-semibold text-[10px] px-2 py-0.5 rounded border border-gold/15 uppercase">
                              {lead.treatment}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">
                            {lead.preferredTime || 'Immediate (Exit Pop)'}
                          </td>
                          <td className="p-4 text-[11px] text-gray-500">
                            {new Date(lead.submittedAt).toLocaleString()}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteLead(idx)}
                              className="text-gray-500 hover:text-red-500 transition-colors p-1"
                              title="Delete Lead Record"
                              id={`delete-lead-${idx}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
