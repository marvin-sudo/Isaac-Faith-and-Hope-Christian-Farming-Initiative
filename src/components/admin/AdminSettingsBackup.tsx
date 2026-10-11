import React, { useState } from 'react';
import {
  Download,
  UploadCloud,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import {
  exportAllAdminData,
  importAllAdminData,
  resetToOfficialDefaults
} from '../../data/adminStore';

interface AdminSettingsBackupProps {
  onRefreshAll: () => void;
}

export const AdminSettingsBackup: React.FC<AdminSettingsBackupProps> = ({
  onRefreshAll,
}) => {
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleDownloadBackup = () => {
    const jsonStr = exportAllAdminData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ifhcfi-admin-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setFeedbackMsg('Backup JSON downloaded successfully.');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleCopyJson = () => {
    const jsonStr = exportAllAdminData();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const ok = importAllAdminData(importText.trim());
    if (ok) {
      onRefreshAll();
      setImportText('');
      setFeedbackMsg('Database backup restored successfully.');
      setTimeout(() => setFeedbackMsg(null), 3000);
    } else {
      alert('Failed to parse backup JSON. Please check file format.');
    }
  };

  const handleResetDefaults = () => {
    resetToOfficialDefaults();
    onRefreshAll();
    setShowResetConfirm(false);
    setFeedbackMsg('Successfully reset all modules to official IFHCFI defaults.');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#164E33]">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Database Integrity &amp; Migration Controls</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
          Data Management &amp; System Backup
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Export your entire website state (programmes, news, photos, events, stories, and inquiries) to JSON or restore an earlier backup.
        </p>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#164E33] flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Export Database Backup
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Downloads a complete JSON snapshot of all newly authored programmes, updates, gallery items, and messages.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={handleDownloadBackup}
              className="px-4 py-2.5 bg-[#164E33] hover:bg-[#0D281A] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON File</span>
            </button>
            <button
              onClick={handleCopyJson}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        {/* Reset to Seed Defaults Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Restore Official Seed Data
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Resets all programmes (including the Aid Combat Center), verified news articles, seed photos, and sample messages back to official deployment defaults.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Official Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* Import Backup Box */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-emerald-700" />
          <span>Restore Backup from JSON</span>
        </h3>
        <p className="text-xs text-stone-600">
          Paste exported JSON string to restore a previous snapshot into local storage:
        </p>

        <form onSubmit={handleImportSubmit} className="space-y-3">
          <textarea
            rows={5}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder='Paste {"version": "2.0", "programmes": [...]} here...'
            className="w-full p-3 font-mono text-xs bg-stone-50 border border-stone-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
          />
          <button
            type="submit"
            disabled={!importText.trim()}
            className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-40 cursor-pointer"
          >
            Apply &amp; Restore Data
          </button>
        </form>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-xs animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Confirm Reset to Default Seed Data
              </h3>
              <p className="text-stone-600 mt-1 leading-relaxed">
                This will overwrite any newly created custom programmes with the official baseline seed data (12 core initiatives + Aid Combat Center flagship). Are you sure?
              </p>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-5 py-2 font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl cursor-pointer"
              >
                Yes, Restore Baseline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
