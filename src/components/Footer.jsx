import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
            $
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">SubTrack PWA</span>
          <span>© 2026</span>
        </div>
        <p className="text-center md:text-right">
          Responsive Subscription & Personal Finance Management System
        </p>
      </div>
    </footer>
  );
};