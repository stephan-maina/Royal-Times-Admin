"use client";

import { useState, useEffect, useRef } from 'react';
import ActivityPieChart from "@/components/ActivityPieChart";
import AverageGraph from "@/components/AverageGraph";
import CustomerSatisfactionGraph from "@/components/CustomerSatisfactionGraph";
import DriverGraphSatisfaction from "@/components/DriverGraphSatisfaction";
import IncomePieChart from "@/components/IncomePieChart";
import MainCard from "@/components/MainCard";
import RevenueOverviewGraph from "@/components/RevenueOverviewGraph";
import Image from "next/image";

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Move the custom hook to the top
const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

const AnalyticsPage = () => {
  // State declarations
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('Deliveries');
  const [showIncomeMonths, setShowIncomeMonths] = useState(false);
  const [selectedIncomeMonth, setSelectedIncomeMonth] = useState('June');
  const [showCustomerMonths, setShowCustomerMonths] = useState(false);
  const [selectedCustomerMonth, setSelectedCustomerMonth] = useState('June');
  const [showDriverMonths, setShowDriverMonths] = useState(false);
  const [selectedDriverMonth, setSelectedDriverMonth] = useState('June');

  // Ref for dropdowns
  const exportOptionsRef = useClickOutside(() => setShowExportOptions(false));
  const deliveryOptionsRef = useClickOutside(() => setShowDeliveryOptions(false));
  const incomeMonthsRef = useClickOutside(() => setShowIncomeMonths(false));
  const customerMonthsRef = useClickOutside(() => setShowCustomerMonths(false));
  const driverMonthsRef = useClickOutside(() => setShowDriverMonths(false));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Handle the file upload here
      console.log('File selected:', file);
    }
  };

  const handleExportOption = (option: string) => {
    switch (option) {
      case 'This Device':
        // Trigger file input click
        document.getElementById('fileInput')?.click();
        break;
      case 'iStock Images':
        window.open('https://www.istockphoto.com', '_blank');
        break;
      case 'Pexels':
        window.open('https://www.pexels.com', '_blank');
        break;
      case 'Bing Browser':
        window.open('https://www.bing.com/images', '_blank');
        break;
    }
    setShowExportOptions(false);
  };

  return (
    <div className="mx-2">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
        <MainCard title="Total Deliveries Revenue" value="2,000,000" imageSrc="/cumulative.svg" imageBgColor="#E5E4FF" />
        <MainCard title="Total Driver Payouts" value="Ksh 1,500,000" imageSrc="/analytic-icon-2.svg" imageBgColor="#FFF3D6" />
        <MainCard title="Total Profit" value="10,000,000" imageSrc="/analytic-icon-3.svg" imageBgColor="#D9F7E8" />
        <MainCard title="Total Commission Submitted" value="5,000,000" imageSrc="/analytic-icon-4.svg" imageBgColor="#FFDED1" />
      </div>
      <div className="flex items-center justify-end gap-2 mb-3">
        <button className="flex items-center gap-3 px-3 py-2 border border-[#F58735] rounded-xl">
          <Image src="/calender-icon.svg" alt="" width={14} height={14} />
          <span className="font-sans font-medium text-sm text-[#F58735]">2025</span>
        </button>

        <div className="relative" ref={exportOptionsRef}>
          <button
            className="flex items-center gap-3 px-3 py-2 border border-[#F58735] rounded-xl"
            onClick={() => setShowExportOptions(!showExportOptions)}
          >
            <Image src="/export-icon.svg" alt="" width={14} height={14} />
            <span className="font-sans font-medium text-sm text-[#F58735]">Export</span>
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          {/* Export options dropdown */}
          {showExportOptions && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48">
              {['This Device', 'iStock Images', 'Pexels', 'Bing Browser'].map((option) => (
                <div
                  key={option}
                  className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
                  onClick={() => handleExportOption(option)}
                >
                  {option === 'This Device' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                  )}
                  {option === 'iStock Images' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  )}
                  {option === 'Pexels' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  )}
                  {option === 'Bing Browser' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                  )}
                  <span className="text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Div 1 */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/2 shadow-lg rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="font-sans font-bold text-base md:text-lg mb-3">Revenue overview (KES)</h1>
            <div className="relative" ref={deliveryOptionsRef}>
              <button
                className="flex items-center gap-3 px-4 py-1 border border-[#F58735] rounded-xl"
                onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
              >
                <span className="font-sans font-medium text-sm text-[#F58735]">
                  {selectedDeliveryOption}
                </span>
                <Image src="/drop-icon-color.svg" alt="" width={12} height={12} />
              </button>
              {showDeliveryOptions && (
                <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                  {['Deliveries', 'Rides', 'Others'].map((option) => (
                    <div
                      key={option}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        option === selectedDeliveryOption ? 'bg-[#F58735] text-white' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setSelectedDeliveryOption(option);
                        setShowDeliveryOptions(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <RevenueOverviewGraph />
        </div>
        <div className="w-full md:w-1/2 shadow-lg rounded-xl border border-gray-200 p-4">
          <h1 className="font-sans font-bold text-base md:text-lg mb-3">Activity Statistics</h1>
          <div className="flex items-center justify-center">
            <ActivityPieChart />
          </div>
        </div>
      </div>
      {/* Div 2 */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/2 shadow-lg rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="font-sans font-bold text-base md:text-lg mb-3">Average Working Hours</h1>
          </div>
          <AverageGraph />
        </div>
        <div className="w-full md:w-1/2 shadow-lg rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="font-sans font-bold text-base md:text-lg mb-3">Income by Payment Method</h1>
            <div className="relative" ref={incomeMonthsRef}>
              <button
                className="flex items-center gap-3 px-3 py-1 border border-[#F58735] rounded-xl"
                onClick={() => setShowIncomeMonths(!showIncomeMonths)}
              >
                <span className="font-sans font-medium text-sm text-[#F58735]">{selectedIncomeMonth}</span>
                <Image src="/drop-icon-color.svg" alt="" width={12} height={12} />
              </button>
              {showIncomeMonths && (
                <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                  {months.map((month) => (
                    <div
                      key={month}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        month === selectedIncomeMonth ? 'bg-[#F58735] text-white' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setSelectedIncomeMonth(month);
                        setShowIncomeMonths(false);
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <IncomePieChart />
          </div>
        </div>
      </div>
      {/* Div 3 */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/2 shadow-lg rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="font-sans font-bold text-lg mb-3">Customer Satisfaction</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-3 px-3 py-1 border border-[#F58735] rounded-xl">
                <span className="font-sans font-medium text-sm text-[#F58735]">Parcel</span>
                <Image src="/drop-icon-color.svg" alt="" width={12} height={12} />
              </button>
              <div className="relative" ref={customerMonthsRef}>
                <button
                  className="flex items-center gap-3 px-4 py-1 border border-[#F58735] rounded-xl"
                  onClick={() => setShowCustomerMonths(!showCustomerMonths)}
                >
                  <span className="font-sans font-medium text-sm text-[#F58735]">{selectedCustomerMonth}</span>
                  <Image src="/drop-icon-color.svg" alt="" width={12} height={12} />
                </button>
                {showCustomerMonths && (
                  <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                    {months.map((month) => (
                      <div
                        key={month}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          month === selectedCustomerMonth ? 'bg-[#F58735] text-white' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setSelectedCustomerMonth(month);
                          setShowCustomerMonths(false);
                        }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <CustomerSatisfactionGraph />
        </div>
        <div className="w-full md:w-1/2 shadow-lg rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="font-sans font-bold text-lg mb-3">Driver Satisfaction</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-3 px-3 py-1 border border-[#F58735] rounded-xl">
                <span className="font-sans font-medium text-sm text-[#F58735]">Parcel</span>
                <Image src="/drop-icon-color.svg" alt="" width={12} height={12} />
              </button>
              <div className="relative" ref={driverMonthsRef}>
                <button
                  className="flex items-center gap-3 px-4 py-1 border border-[#F58735] rounded-xl"
                  onClick={() => setShowDriverMonths(!showDriverMonths)}
                >
                  <span className="font-sans font-medium text-sm text-[#F58735]">{selectedDriverMonth}</span>
                  <Image src="/drop-icon-color.svg" alt="" width={12} height={12} />
                </button>
                {showDriverMonths && (
                  <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                    {months.map((month) => (
                      <div
                        key={month}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          month === selectedDriverMonth ? 'bg-[#F58735] text-white' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setSelectedDriverMonth(month);
                          setShowDriverMonths(false);
                        }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DriverGraphSatisfaction />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;