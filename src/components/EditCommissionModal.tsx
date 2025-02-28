"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export const EditCommissionModal = ({ onClose }: { onClose: () => void }) => {
  const [commissionRate, setCommissionRate] = useState("");
  const [commissionLimit, setCommissionLimit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Done button submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);

      // Show success toast with checkmark in orange background
      toast.success("Successfully Edited Commission! Redirecting back...",
        
        {
        icon: (
          <div className="flex items-center justify-center w-6 h-6 bg-[#F58735] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="white"
              height="14"
              width="14"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ),
        duration: 3000,
      });

      setTimeout(() => {
        onClose();
      }, 3000);
    }, 2000);
  };

  // Handle Cancel button click
  const handleCancel = () => {
    // Show error toast with X in red background
    toast.error("Editing unsuccessful! Redirecting...", {
      icon: (
        <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
            height="14"
            width="14"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.95-10.95a.75.75 0 011.06 0L10 9.94l1.89-1.89a.75.75 0 111.06 1.06L11.06 11l1.89 1.89a.75.75 0 11-1.06 1.06L10 12.06l-1.89 1.89a.75.75 0 11-1.06-1.06L8.94 11l-1.89-1.89a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ),
      duration: 3000,
    });

    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80" aria-hidden="true"></div>

      <div
        role="dialog"
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg rounded-xl sm:max-w-[800px]"
        tabIndex={-1}
      >
        {/* Header with left arrow button */}
        <div className="flex items-center gap-2 border-b pb-2">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#E6E6E6] hover:bg-[#D1D1D1] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left h-4 w-4"
            >
              <path d="M12 19l-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">Edit Commission Rate & Limit</h2>
        </div>

        {/* Form Inputs */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="text-[16px] font-sans font-medium" htmlFor="CommissionRates">
                Commission Rates *
              </label>
              <input
                id="CommissionRates"
                placeholder="Commission Rates"
                className="border border-gray-300 p-3 text-base mt-1 w-full rounded-[10px] focus:bg-[#F5F5F5]"
                type="text"
                value={commissionRate}
                name="CommissionRates"
                onChange={(e) => setCommissionRate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-[16px] font-sans font-medium" htmlFor="CommissionLimitAmount">
                Commission Limit Amount *
              </label>
              <input
                id="CommissionLimitAmount"
                placeholder="How Much?"
                className="border border-gray-300 p-3 text-base mt-1 w-full rounded-[10px] focus:bg-[#F5F5F5]"
                type="text"
                value={commissionLimit}
                name="CommissionLimitAmount"
                onChange={(e) => setCommissionLimit(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Buttons positioned on the right */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-12 py-3 font-sans font-medium text-base border border-[#F58735] bg-white rounded-xl text-[#F58735]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-16 py-[13px] font-sans font-medium text-base bg-[#F58735] rounded-xl text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Done"}
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </>
  );
};
