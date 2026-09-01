import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export const SubscriptionCard = ({
  subscription = {},
  exchangeRate = 1,
  selectedCurrency = "USD",
  onEdit,
  onDelete,
}) => {
  if (!subscription) return null;

  // Safe property extraction with fallbacks
  const title = subscription.title || subscription.name || "Untitled";
  const category = subscription.category || "General";
  const billingCycle = subscription.billingCycle || "Monthly";
  const renewalDate = subscription.renewalDate || "N/A";
  const rawCost = Number(subscription.cost) || 0;
  const convertedCost = (rawCost * (exchangeRate || 1)).toFixed(2);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            {subscription.imageUrl ? (
              <img
                src={subscription.imageUrl}
                alt={title}
                className="w-10 h-10 rounded-xl object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base">
                {title.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base">
                {title}
              </h3>
              <p className="text-xs text-slate-400 capitalize">
                {category}
              </p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium capitalize">
            {billingCycle}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {selectedCurrency} {convertedCost}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Renews: {renewalDate}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onEdit}
          className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          title="Edit"
          type="button"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          title="Delete"
          type="button"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};