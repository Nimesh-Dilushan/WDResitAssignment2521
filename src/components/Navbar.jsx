import React from "react";
import { LayoutDashboard, PlusCircle, LogOut, Sun, Moon } from "lucide-react";

export const Navbar = ({ onOpenAddModal, darkMode, toggleDarkMode, currentUser, onLogout }) => {
  return (
    <>
      {/* Desktop & Tablet Top Navigation */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 dark:shadow-none">
            $
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            SubTrack
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {currentUser && (
            <>
              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
              >
                <PlusCircle size={18} />
                <span>Add Subscription</span>
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition"
                title="Log Out"
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Mobile Top App Bar */}
      <header className="flex md:hidden items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            $
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-100">SubTrack</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {currentUser && (
            <button onClick={onLogout} className="p-2 text-slate-500 hover:text-red-600">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      {currentUser && (
        <nav className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-2.5 justify-around items-center z-40 shadow-lg">
          <button className="flex flex-col items-center gap-1 text-indigo-600 dark:text-indigo-400">
            <LayoutDashboard size={20} />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300 dark:shadow-none hover:scale-105 active:scale-95 transition"
            aria-label="Add Subscription"
          >
            <PlusCircle size={24} />
          </button>
        </nav>
      )}
    </>
  );
};