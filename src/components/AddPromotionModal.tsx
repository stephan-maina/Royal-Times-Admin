"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export const AddPromotionModal = ({ onClose }: { onClose: () => void }) => {
  const [promotionTitle, setPromotionTitle] = useState("");
  const [promotionAmount, setPromotionAmount] = useState("");
  const [promotionMessage, setPromotionMessage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [maxDiscountedTrips, setMaxDiscountedTrips] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate a network request
    setTimeout(() => {
      toast.success(
        <span style={{ 
          fontSize: '0.875rem',
          fontWeight: 600,    
          fontFamily: 'DM Sans'
        }}>
          Successfully Added Promotion! Redirecting to....
        </span>,
        {
          icon: (
            <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="white"
                height="14"
                width="14"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.296a1 1 0 00-1.408 0L8 12.586 4.704 9.296a1 1 0 10-1.408 1.408l4 4a1 1 0 001.408 0l8-8a1 1 0 000-1.408z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

          ),
          duration: 3000,
        }
      );
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 2000);
  };

  const handleCancel = () => {
    toast.error(
      <span style={{ 
        whiteSpace: "nowrap",
        fontSize: '0.875rem',
        fontWeight: 600,   
        fontFamily: 'DM Sans' 
       }}>
        Adding unsuccessful! Redirecting...
      </span>,
      {
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
      }
    );
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleAudienceClick = (audience: string) => {
    if (selectedAudience.includes(audience)) {
      setSelectedAudience(selectedAudience.filter((a) => a !== audience));
    } else {
      setSelectedAudience([...selectedAudience, audience]);
    }
  };

  return (
    <>
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        style={{ pointerEvents: "auto" }}
        data-aria-hidden="true"
        aria-hidden="true"
      ></div>
      <div
        role="dialog"
        aria-describedby="radix-:ror:"
        aria-labelledby="radix-:roq:"
        data-state="open"
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[800px]"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <form className="w-full max-h-[90vh] overflow-hidden flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 text-center sm:text-left border-b py-1">
            <div className="flex items-center gap-2">
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
              <h2 id="radix-:roq:" className="text-lg font-semibold leading-none tracking-tight">
                Add Promotion
              </h2>
            </div>
          </div>
          <div className="flex flex-col py-4 gap-5 overflow-auto flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="promotion-title">
                  Promotion Title *
                </label>
                <input
              id="promotionTitle"
              placeholder="Promotion Title"
              className="border border-gray-300 p-3 text-base mt-1 w-full rounded-[10px] focus:bg-[#F5F5F5]"
              type="text"
              value={promotionTitle}
              onChange={(e) => setPromotionTitle(e.target.value)}
              required
            />
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="promotion-amount">
                  Promotion Amount (%) *
                </label>
                <input
              id="promotionAmount"
              placeholder="Promotion Amount (%)"
              className="border border-gray-300 p-3 text-base mt-1 w-full rounded-[10px] focus:bg-[#F5F5F5]"
              type="text"
              value={promotionAmount}
              onChange={(e) => setPromotionAmount(e.target.value)}
              required
            />
              </div>


              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="promotion-message">
                  Promotion Message *
                </label>
                <textarea
              id="promotionMessage"
              placeholder="Promotion Message"
              className="border border-gray-300 p-3 text-base mt-1 w-full rounded-[10px] focus:bg-[#F5F5F5]"
              value={promotionMessage}
              onChange={(e) => setPromotionMessage(e.target.value)}
              required
            />
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="expiration-date">
                  Expiration Date *
                </label>
                <input
              id="expirationDate"
              placeholder="Expiration Date"
              className="border border-gray-300 p-3 text-base mt-1 w-full rounded-[10px] focus:bg-[#F5F5F5]"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="max-discounted-trips">
                  Max Discounted Trips *
                </label>
                         <input
              id="maxDiscountedTrips"
              placeholder="Max Discounted Trips"
              className="border border-gray-300 p-3 text-base mt-1 w-full rounded-[10px] focus:bg-[#F5F5F5]"
              type="text"
              value={maxDiscountedTrips}
              onChange={(e) => setMaxDiscountedTrips(e.target.value)}
              required
            />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Target Audience</p>
              <p className="text-sm text-muted-foreground">Set who the promotion’s beneficiaries will be</p>
              <div className="w-full h-px bg-gray-200 my-2"></div>
              <div className="flex gap-2">
  {["3 Days Old Accounts", "1 Month Old Accounts", "Nairobi", "30 Days Inactivity"].map((audience) => (
    <button
      key={audience}
      type="button"
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-[#D1DBE8] text-sm transition-transform duration-200 
        ${selectedAudience.includes(audience) 
          ? "bg-[#F58735] text-white" 
          : "bg-white text-black"} 
        hover:bg-[#F58735] hover:text-white hover:scale-105`}
      onClick={() => handleAudienceClick(audience)}
    >
      <span>{audience}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-x h-4 w-4 transition-colors duration-200 hover:stroke-white"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  ))}
</div>

            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-12 py-3 font-sans font-medium text-base border border-[#F58735] bg-white rounded-xl text-[#F58735]"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-16 py-[13px] font-sans font-medium text-base bg-[#F58735] rounded-xl text-white"
            >
              Next
            </button>
          </div>
        </form>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={onClose}
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
            className="lucide lucide-x h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
};