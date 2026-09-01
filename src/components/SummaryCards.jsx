import React from "react";
import { DollarSign, Layers, Calendar, Globe } from "lucide-react";

export const SummaryCards = ({
  subscriptions = [],
  exchangeRates = {},
  selectedCurrency = "USD",
  setSelectedCurrency = () => {}
}) => {
  const rate = exchangeRates[selectedCurrency] || 1;

  // Calculate monthly total cost normalized to USD first
  const totalMonthlyUSD = subscriptions.reduce((acc, item) => {
    const cost = parseFloat(item.cost) || 0;
    if (item.billingCycle === "Yearly") {
      return acc + cost / 12;
    }
    return acc + cost;
  }, 0);

  const convertedMonthly = (totalMonthlyUSD * rate).toFixed(2);
  const convertedYearly = (totalMonthlyUSD * 12 * rate).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Monthly Total Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Monthly Spend
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <DollarSign size={16} />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {selectedCurrency} {convertedMonthly}
        </div>
        <p className="text-xs text-slate-400 mt-1">Normalized monthly cost</p>
      </div>

      {/* Yearly Projection Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Yearly Forecast
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Calendar size={16} />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {selectedCurrency} {convertedYearly}
        </div>
        <p className="text-xs text-slate-400 mt-1">Projected 12-month expense</p>
      </div>

      {/* Active Subscriptions Count */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Active Services
          </span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Layers size={16} />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {subscriptions.length}
        </div>
        <p className="text-xs text-slate-400 mt-1">Total active subscriptions</p>
      </div>

      {/* Currency Switcher Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Display Currency
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Globe size={16} />
          </div>
        </div>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="w-full mt-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500"
        >
          {Object.keys(exchangeRates).length > 0 ? (
            Object.keys(exchangeRates).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))
          ) : (
            <>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="LKR">LKR</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};