import React, { useState, useEffect, Suspense, lazy } from "react";
import { useAuth } from "./context/AuthContext";
import { useSubscriptions } from "./context/SubscriptionContext";
import { fetchExchangeRates } from "./services/api";
import { AuthScreen } from "./components/authscreen";
import { Navbar } from "./components/Navbar";
import { SummaryCards } from "./components/SummaryCards";
import { SubscriptionCard } from "./components/SubscriptionCard";
import { Footer } from "./components/Footer";

const SubscriptionForm = lazy(() =>
  import("./components/Subscriptionform").then((module) => ({
    default: module.SubscriptionForm || module.default
  }))
);

export default function App() {
  const { currentUser, logout } = useAuth();
  const { subscriptions, loading, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);

  // Dark Mode State with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Currency & Filter State
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sync dark mode class to <html> root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Fetch exchange rates once on mount
  useEffect(() => {
    async function loadRates() {
      try {
        const rates = await fetchExchangeRates("USD");
        setExchangeRates(rates);
      } catch (err) {
        console.error("Failed to load exchange rates:", err);
      }
    }
    loadRates();
  }, []);

  // Filter subscriptions based on search query and category
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const itemTitle = sub.title || sub.name || "";
    const matchesSearch = itemTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || sub.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (sub) => {
    setEditingSubscription(sub);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingSubscription(null);
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    if (editingSubscription && editingSubscription.id) {
      await updateSubscription(editingSubscription.id, formData);
    } else {
      await addSubscription(formData);
    }
  };

  // If user is not authenticated, render AuthScreen
  if (!currentUser) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <div>
        {/* Navigation Bar */}
        <Navbar
          onOpenAddModal={() => {
            setEditingSubscription(null);
            setIsModalOpen(true);
          }}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          currentUser={currentUser}
          onLogout={logout}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Summary Metric Cards */}
          <SummaryCards
            subscriptions={subscriptions}
            exchangeRates={exchangeRates}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />

          {/* Search and Category Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="entertainment">Entertainment</option>
              <option value="productivity">Productivity</option>
              <option value="utilities">Utilities</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
            </select>
          </div>

          {/* Subscription Cards Grid */}
          {loading ? (
            <p className="text-center text-slate-500 py-12">Loading subscriptions...</p>
          ) : filteredSubscriptions.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <p className="text-slate-500 mb-4">No subscriptions found.</p>
              <button
                onClick={() => {
                  setEditingSubscription(null);
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl"
              >
                + Add Your First Subscription
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  exchangeRate={exchangeRates[selectedCurrency] || 1}
                  selectedCurrency={selectedCurrency}
                  onEdit={() => handleEdit(sub)}
                  onDelete={() => deleteSubscription(sub.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <Suspense fallback={null}>
        <SubscriptionForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          initialData={editingSubscription}
        />
        </Suspense>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}