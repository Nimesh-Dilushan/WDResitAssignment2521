import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import categoriesData from "../data/categories.json";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase";

export const SubscriptionForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    cost: "",
    billingCycle: "Monthly",
    category: "entertainment",
    renewalDate: "",
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        cost: "",
        billingCycle: "Monthly",
        category: "entertainment",
        renewalDate: "",
        imageUrl: ""
      });
    }
    setImageFile(null);
    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      let finalImageUrl = formData.imageUrl || "";
      
      if (imageFile && storage) {
        const fileRef = ref(storage, `logos/${Date.now()}_${imageFile.name}`);
        await uploadBytes(fileRef, imageFile);
        finalImageUrl = await getDownloadURL(fileRef);
      }

      const payload = {
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        imageUrl: finalImageUrl
      };

      if (onSubmit) {
        await onSubmit(payload);
      }
      onClose();
    } catch (err) {
      console.error("Submission failed:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl relative animate-in fade-in zoom-in duration-150">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          {initialData ? "Edit Subscription" : "New Subscription"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Service Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Netflix, Spotify"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Cost (USD)
              </label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="9.99"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Billing Cycle
              </label>
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            >
              {categoriesData && categoriesData.length > 0 ? (
                categoriesData.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="productivity">Productivity</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Renewal Date
            </label>
            <input
              type="date"
              required
              value={formData.renewalDate}
              onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Custom Icon / Logo
            </label>
            <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 text-xs">
              <Upload size={16} />
              <span>{imageFile ? imageFile.name : "Select image file"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition text-sm shadow-md disabled:opacity-50"
          >
            {uploading ? "Saving..." : initialData ? "Save Changes" : "Create Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
};