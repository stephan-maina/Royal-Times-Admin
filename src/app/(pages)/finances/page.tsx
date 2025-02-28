"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import MainCard from "@/components/MainCard";
import DriversTable from "@/components/reusable-tables/DriversTable";
import PromotionsTable from "@/components/reusable-tables/PromotionsTable";
import { renderRowDrivers } from "@/utils/renderRow-functions/renderRowDrivers";
import Paginations from "@/components/Paginations";
import { Drivers, Promotion, SortColumnType, Column } from "@/types";
import {
  expectedCommissionData,
  overviewDriversData,
  payoutsDriversData,
  pendingPayoutsData,
  promotionsData,
} from "@/utils/mockData";
import { EditCommissionModal } from "@/components/EditCommissionModal";
import { Toaster } from "react-hot-toast";
import { AddPromotionModal } from "@/components/AddPromotionModal"

const overviewTableColumns = [
  { header: "Driver", accessor: "name" },
  { header: "Amount", accessor: "amount" },
  { header: "Payment Method", accessor: "paymentMethod" },
  { header: "Date", accessor: "date" },
  { header: "Amount Owed", accessor: "amountOwed" },
];

const payoutsTableColumns = [
  { header: "Driver", accessor: "name" },
  { header: "Amount", accessor: "amount" },
  { header: "Payment Method", accessor: "paymentMethod" },
  { header: "Date", accessor: "date" },
];

const expectedCommissionColumns = [
  { header: "Driver", accessor: "name" },
  { header: "Unsubmitted Amount", accessor: "unsubmittedAmount" },
  { header: "Limit", accessor: "limit" },
  { header: "Activity Status", accessor: "activityStatus" },
];

const pendingPayoutsColumns = [
  { header: "Driver", accessor: "name" },
  { header: "Pending Amount", accessor: "pendingAmount" },
  { header: "Last Payment Date", accessor: "lastPaymentDate" },
  { header: "Activity Status", accessor: "activityStatus" },
];

const promotionsTableColumns: Column[] = [
  { header: "Name", accessor: "name" },
  { header: "Creation Date", accessor: "creationDate" },
  { header: "Discount", accessor: "discount" },
  { header: "Beneficiaries", accessor: "beneficiaries" },
  { header: "Completed Rides", accessor: "completedRides" },
  { header: "Status", accessor: "status" },
  { header: "Validity", accessor: "validity" },
];

const pageSize = 5;
const topButtons = ["Overview", "Commissions & Payouts", "Promotions"];
const commissionButtons = ["Commission Submission", "Dispatched Payouts", "Expected Commission", "Pending Payouts"];

const FinancePage = () => {
  const [selectedTopButton, setSelectedTopButton] = useState(topButtons[0]);
  const [selectedCommissionButton, setSelectedCommissionButton] = useState(commissionButtons[0]);
  const [loading, setLoading] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState<"Rides" | "Deliveries">("Rides");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumnType>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("December");
  const [showExpectedCommission, setShowExpectedCommission] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [promotionType, setPromotionType] = useState<"Rides" | "Deliveries">("Rides");
  const [searchPromotionTerm, setSearchPromotionTerm] = useState("");
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [isEditCommissionModalOpen, setIsEditCommissionModalOpen] = useState(false);
  const [isAddPromotionModalOpen, setIsAddPromotionModalOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleTopButtonClick = (button: string) => {
    setSelectedTopButton(button);
    if (button === "Overview") {
      setSelectedCommissionButton("Commission Submission");
      setShowTransactions(true);
    } else if (button === "Commissions & Payouts") {
      setSelectedCommissionButton("Dispatched Payouts");
      setShowTransactions(false);
    } else if (button === "Promotions") {
      setShowTransactions(false);
      setPromotionType("Rides");
    }
  };

  const handleExportClick = () => {
    setShowExportDropdown(!showExportDropdown);
  };

  const handleExportOptionClick = (option: string) => {
    switch (option) {
      case "This Device":
        // Trigger file input click
        document.getElementById("fileInput")?.click();
        break;
      case "iStock Images":
        window.open("https://www.istockphoto.com", "_blank");
        break;
      case "Pexels":
        window.open("https://www.pexels.com", "_blank");
        break;
      case "Bing Browser":
        window.open("https://www.bing.com/images", "_blank");
        break;
    }
    setShowExportDropdown(false);
  };

  const handleCommissionButtonClick = (button: string) => {
    setSelectedCommissionButton(button);
    setLoading(true);
    setShowExpectedCommission(button === "Expected Commission");

    if (button === "Commission Submission") {
      setSelectedTopButton("Overview");
      setShowTransactions(true);
    } else {
      setSelectedTopButton("Commissions & Payouts");
      setShowTransactions(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleTransactionTypeClick = (type: "Rides" | "Deliveries") => {
    setSelectedTransactionType(type);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getTableTitle = () => {
    switch (selectedCommissionButton) {
      case "Dispatched Payouts":
        return "Payouts to Drivers";
      case "Pending Payouts":
        return "Pending Payouts";
      case "Expected Commission":
        return "Expected Commission";
      default:
        return "Commission Submitted by Drivers";
    }
  };

  const getTableColumns = () => {
    switch (selectedCommissionButton) {
      case "Pending Payouts":
        return pendingPayoutsColumns;
      case "Expected Commission":
        return expectedCommissionColumns;
      case "Dispatched Payouts":
        return payoutsTableColumns;
      default:
        return overviewTableColumns;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (filterRef.current && !filterRef.current.contains(target)) {
        setShowFilterMenu(false);
      }
      if (sortRef.current && !sortRef.current.contains(target)) {
        setShowSortMenu(false);
      }
      if (exportRef.current && !exportRef.current.contains(target)) {
        setShowExportDropdown(false);
      }
      if (!target.closest(".month-dropdown")) {
        setShowMonthDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPaymentMethod, sortColumn]);

  const filterByActivityStatus = (data: Drivers[], status: string) => {
    return data.filter((driver) => driver.activityStatus === status);
  };

  const filteredDrivers = useMemo(() => {
    let result = selectedTopButton === "Overview"
      ? [...overviewDriversData]
      : showExpectedCommission
      ? [...expectedCommissionData]
      : selectedCommissionButton === "Pending Payouts"
      ? [...pendingPayoutsData]
      : [...payoutsDriversData];
  
    if (searchTerm) {
      result = result.filter((driver) =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (selectedPaymentMethod === "Bank" || selectedPaymentMethod === "Mpesa") {
      result = result.filter((driver) => driver.paymentMethod === selectedPaymentMethod);
    }
  
    if (selectedCommissionButton === "Pending Payouts") {
      if (selectedPaymentMethod === "pendingAmount") {
        result.sort((a, b) => Number(b.pendingAmount) - Number(a.pendingAmount));
      } else if (selectedPaymentMethod === "lastPaymentDate") {
        result.sort((a, b) => {
          const dateA = a.lastPaymentDate ? Date.parse(a.lastPaymentDate) : 0;
          const dateB = b.lastPaymentDate ? Date.parse(b.lastPaymentDate) : 0;
          return dateB - dateA;
        });
      }
    }
  
    if (selectedCommissionButton === "Expected Commission") {
      if (selectedPaymentMethod === "unsubmittedAmount") {
        result.sort((a, b) =>
          Number(b.unsubmittedAmount?.replace(/,/g, "")) -
          Number(a.unsubmittedAmount?.replace(/,/g, ""))
        );
      } else if (selectedPaymentMethod === "limit") {
        result.sort((a, b) =>
          Number(a.limit?.replace(/,/g, "")) -
          Number(b.limit?.replace(/,/g, ""))
        );
      }
    }
  
    if (sortColumn?.trim() === "amount") {
      result.sort((a, b) => Number(a.amount) - Number(b.amount));
    } else if (sortColumn === "date") {
      result.sort((a, b) => {
        const dateA = a.date ? Date.parse(a.date) : 0;
        const dateB = b.date ? Date.parse(b.date) : 0;
        return dateB - dateA;
      });
    } else if (sortColumn === "amountOwed") {
      result.sort((a, b) => Number(b.amountOwed) - Number(a.amountOwed));
    } else if (["Active", "Offline", "Inactive"].includes(sortColumn ?? "")) {
      result = filterByActivityStatus(result, sortColumn as string);
    }
    
    return result;
    
  }, [searchTerm, selectedPaymentMethod, sortColumn, selectedTopButton, showExpectedCommission, selectedCommissionButton]);
  
  const filteredPromotions = useMemo(() => {
    let result = [...promotionsData];
  
    if (searchPromotionTerm) {
      result = result.filter((promo) =>
        promo.name.toLowerCase().includes(searchPromotionTerm.toLowerCase())
      );
    }
  
    if (selectedPaymentMethod === "discount") {
      result.sort((a, b) => parseInt(b.discount) - parseInt(a.discount));
    } else if (selectedPaymentMethod === "beneficiaries") {
      result.sort((a, b) => a.beneficiaries - b.beneficiaries);
    } else if (selectedPaymentMethod === "completedRides") {
      result.sort((a, b) => b.completedRides - a.completedRides);
    }
  
    if (sortColumn === "Active") {
      result = result.filter((promo) => promo.status === "Active");
    } else if (sortColumn === "Inactive") {
      result = result.filter((promo) => promo.status === "Inactive");
    }
  
    return result;
  }, [searchPromotionTerm, selectedPaymentMethod, sortColumn]);

  const paginatedDrivers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredDrivers.slice(startIndex, startIndex + pageSize);
  }, [filteredDrivers, currentPage]);

  const clearFilters = () => {
    setSelectedPaymentMethod(null);
    setIsFiltered(false);
  };

  const clearSort = () => {
    setSortColumn(null);
    setIsSorted(false);
  };

  const resetResults = () => {
    setSearchTerm("");
    setSearchPromotionTerm("");
    setSelectedPaymentMethod(null);
    setSortColumn(null);
    setCurrentPage(1);
    setIsFiltered(false);
    setIsSorted(false);
  };

  const renderExpectedCommissionRows = (item: Drivers) => (
    <tr key={item.id} className="bg-white border-b">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={item.imageSrc}
            alt={item.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-sm">{item.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">{item.unsubmittedAmount}</td>
      <td className="px-6 py-4 text-sm">{item.limit}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-[10px] text-sm ${
            item.activityStatus === "Active"
              ? "bg-[#C1FFCB66] text-[#007C0C]"
              : "bg-[#FF00001A] text-[#FF0000]"
          }`}
        >
          {item.activityStatus}
        </span>
      </td>
    </tr>
  );

  const renderPendingPayoutsRows = (item: Drivers) => (
    <tr key={item.id} className="bg-white border-b">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={item.imageSrc}
            alt={item.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-sm">{item.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">Ksh {item.pendingAmount}</td>
      <td className="px-6 py-4 text-sm">{item.lastPaymentDate}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-[10px] text-sm ${
            item.activityStatus === "Active"
              ? "bg-[#C1FFCB66] text-[#007C0C]"
              : "bg-[#FF00001A] text-[#FF0000]"
          }`}
        >
          {item.activityStatus}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="mx-2">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <div className="bg-[#F5F5F5] flex gap-3 lg:gap-6 items-center px-3 lg:px-5 py-2 rounded-[10px] overflow-x-auto">
          {topButtons.map((button) => (
            <button
              key={button}
              onClick={() => handleTopButtonClick(button)}
              className={`text-xs md:text-sm font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 ${
                selectedTopButton === button ? "bg-white text-[#F58735]" : "text-black"
              }`}
              disabled={loading}
            >
              {button}
            </button>
          ))}
        </div>

        <div className="relative month-dropdown ml-auto">
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="flex items-center gap-3 px-3 py-1 border border-[#F58735] rounded-xl text-[#F58735] hover:bg-[#FFF8F5]"
          >
            <span className="font-sans font-medium text-sm">{selectedMonth}</span>
            <img alt="Dropdown" loading="lazy" width="12" height="12" decoding="async" src="/drop-icon-color.svg" />
          </button>
          {showMonthDropdown && (
            <div className="absolute bg-white border border-gray-300 rounded-xl mt-2 py-2 w-36 shadow-lg z-10 right-0">
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                <div
                  key={month}
                  className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                  onClick={() => {
                    setSelectedMonth(month);
                    setShowMonthDropdown(false);
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedTopButton === "Overview" && (
        <>
          <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
            <MainCard title="Cumulative Income" value="12,500,000" imageSrc="/material-symbols_money-bag-rounded.svg" imageBgColor="#E5E4FF" />
            <MainCard title="Cumulative Driver Revenue" value="2,000,000" imageSrc="/Group.svg" imageBgColor="#FFF3D6" />
            <MainCard title="Pending Payouts" value="10,000,000" imageSrc="/dashicons_money.svg" imageBgColor="#D9F7E8" />
            <MainCard title="Expected Commission Income" value="55,000,000" imageSrc="/solar_hand-money-bold (1).svg" imageBgColor="#FFDED1" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
            <MainCard title="Spent On Promotions" value="2,000,000" imageSrc="/majesticons_money-hand.svg" imageBgColor="#E5E4FF" />
            <MainCard title="Total Rides Income" value="1,500,000" imageSrc="/solar_money-bag-bold.svg" imageBgColor="#FFF3D6" />
            <MainCard title="Total Parcel Income" value="10,000,000" imageSrc="/carbon_delivery-parcel.svg" imageBgColor="#D9F7E8" />
            <div className="hidden md:block w-[calc(25%-1rem)]"></div>
          </div>

      {/* Hidden file input for "This Device" export */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => {
          console.log("File selected:", e.target.files?.[0]);
        }}
      />

          <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center mb-6">
            <div className="bg-[#F5F5F5] flex gap-3 lg:gap-6 items-center px-3 lg:px-5 py-2 rounded-[10px] overflow-x-auto">
              {commissionButtons.map((button) => (
                <button
                  key={button}
                  onClick={() => handleCommissionButtonClick(button)}
                  className={`text-xs md:text-sm font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 ${
                    selectedCommissionButton === button ? "bg-white text-[#F58735]" : "text-black"
                  }`}
                  disabled={loading}
                >
                  {button}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-3 md:mt-0">
            <button
        className="px-4 py-2 border-[#F58735] border-2 rounded-[10px] text-[#F58735] text-sm font-medium hover:bg-[#F58735] hover:text-white"
        onClick={() => setIsEditCommissionModalOpen(true)}
      >
        Edit Commission
      </button>
      {isEditCommissionModalOpen && (
        <EditCommissionModal onClose={() => setIsEditCommissionModalOpen(false)} />
      )}
              <div className="relative" ref={exportRef}>
        <button
          onClick={handleExportClick}
          className="flex items-center px-4 py-2 border-[#F58735] border-2 rounded-[10px] gap-3"
        >
          <img alt="Export" loading="lazy" width="11" height="11" decoding="async" src="/export-icon.svg" />
          <span className="text-[#F58735] text-sm font-medium">Export</span>
        </button>
        {showExportDropdown && (
          <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48">
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("This Device")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <span>This Device</span>
            </div>
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("iStock Images")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>iStock Images</span>
            </div>
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("Pexels")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Pexels</span>
            </div>
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("Bing Browser")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
              <span>Bing Browser</span>
            </div>
          </div>
        )}
      </div>
            </div>
          </div>

          {selectedCommissionButton === "Commission Submission" && (
            <>
              <div className="bg-[#F5F5F5] flex gap-3 lg:gap-4 items-center px-3 lg:px-5 py-2 rounded-[10px] w-[420px] md:w-[420px] shadow-md mb-4">
                <button
                  className={`text-xs md:text-sm font-sans font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 whitespace-nowrap ${
                    selectedTransactionType === "Rides" ? "bg-white text-[#F58735]" : "text-black"
                  }`}
                  onClick={() => handleTransactionTypeClick("Rides")}
                >
                  Transactions For Rides
                </button>
                <button
                  className={`text-xs md:text-sm font-sans font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 whitespace-nowrap ${
                    selectedTransactionType === "Deliveries" ? "bg-white text-[#F58735]" : "text-black"
                  }`}
                  onClick={() => handleTransactionTypeClick("Deliveries")}
                >
                  Transactions For Deliveries
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-center justify-between bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded-[10px] px-2 py-3 mb-6">
                <p className="pl-4 font-sans font-semibold text-sm md:text-base text-black dark:text-white">
                  Commission Submitted by Drivers
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white border border-gray-300 rounded-[10px] px-3 py-2 justify-between">
                    <input
                      placeholder="Search"
                      className="outline-none text-xs md:text-sm bg-transparent text-black placeholder:text-gray-500 w-full"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img alt="Search" width="10" height="10" src="/search-icon.svg" />
                  </div>
                  <div className="relative" ref={filterRef}>
                    <button
                      className="p-3 rounded-[10px] bg-white border border-gray-300"
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                      <img alt="Filter" width="12" height="12" src="/filter-icon.svg" />
                    </button>
                    {showFilterMenu && (
                      <div className="absolute bg-white border right-1 border-gray-300 rounded-xl mt-2 py-2 w-48 shadow-lg z-10">
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSelectedPaymentMethod("Bank");
                            setIsFiltered(true);
                          }}
                        >
                          Bank
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSelectedPaymentMethod("Mpesa");
                            setIsFiltered(true);
                          }}
                        >
                          Mpesa
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative" ref={sortRef}>
                    <button
                      className="p-3 rounded-[10px] bg-white border border-gray-300"
                      onClick={() => setShowSortMenu(!showSortMenu)}
                    >
                      <img alt="Sort" width="12" height="12" src="/sort-icon.svg" />
                    </button>
                    {showSortMenu && (
                      <div className="absolute bg-white border right-2 border-gray-300 rounded-xl mt-2 py-2 w-36 shadow-lg z-10">
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("amount");
                            setIsSorted(true);
                          }}
                        >
                          Amount
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("date");
                            setIsSorted(true);
                          }}
                        >
                          Date
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("amountOwed");
                            setIsSorted(true);
                          }}
                        >
                          Amount Owed
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {(isFiltered || isSorted) && (
                  <button
                    className="bg-[#F58735] text-white py-2 px-6 rounded-[10px]"
                    onClick={() => {
                      isFiltered ? clearFilters() : clearSort();
                    }}
                  >
                    {isFiltered ? "Clear Filters" : "Clear Sortings"}
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}

      {selectedTopButton === "Commissions & Payouts" && (
        <>
          <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
            <MainCard title="Submitted Commission" value="2,000,000" imageSrc="/material-symbols_money-bag-rounded.svg" imageBgColor="#E5E4FF" />
            <MainCard title="Dispatched Payouts" value="12,500,000" imageSrc="/solar_hand-money-bold (2).svg" imageBgColor="#FFF3D6" />
            <MainCard title="Expected Commission" value="10,000,000" imageSrc="/solar_hand-money-bold.svg" imageBgColor="#D9F7E8" />
            <MainCard title="Pending Payouts" value="500,000" imageSrc="/Vector (2).svg" imageBgColor="#FFDED1" />
          </div>

      {/* Hidden file input for "This Device" export */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => {
          console.log("File selected:", e.target.files?.[0]);
        }}
      />
          <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center mb-6">
            <div className="bg-[#F5F5F5] flex gap-3 lg:gap-6 items-center px-3 lg:px-5 py-2 rounded-[10px] overflow-x-auto">
              {commissionButtons.map((button) => (
                <button
                  key={button}
                  onClick={() => handleCommissionButtonClick(button)}
                  className={`text-xs md:text-sm font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 ${
                    selectedCommissionButton === button ? "bg-white text-[#F58735]" : "text-black"
                  }`}
                  disabled={loading}
                >
                  {button}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-3 md:mt-0">
            <button
        className="px-4 py-2 border-[#F58735] border-2 rounded-[10px] text-[#F58735] text-sm font-medium hover:bg-[#F58735] hover:text-white"
        onClick={() => setIsEditCommissionModalOpen(true)}
      >
        Edit Commission
      </button>
      {isEditCommissionModalOpen && (
        <EditCommissionModal onClose={() => setIsEditCommissionModalOpen(false)} />
      )}
              <div className="relative" ref={exportRef}>
        <button
          onClick={handleExportClick}
          className="flex items-center px-4 py-2 border-[#F58735] border-2 rounded-[10px] gap-3"
        >
          <img alt="Export" loading="lazy" width="11" height="11" decoding="async" src="/export-icon.svg" />
          <span className="text-[#F58735] text-sm font-medium">Export</span>
        </button>
        {showExportDropdown && (
          <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48">
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("This Device")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <span>This Device</span>
            </div>
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("iStock Images")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>iStock Images</span>
            </div>
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("Pexels")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Pexels</span>
            </div>
            <div
              className="px-4 py-3 text-sm cursor-pointer hover:bg-[#F58735] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              onClick={() => handleExportOptionClick("Bing Browser")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
              <span>Bing Browser</span>
            </div>
          </div>
        )}
      </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center justify-between bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded-[10px] px-2 py-3 mb-6">
            <p className="pl-4 font-sans font-semibold text-sm md:text-base text-black dark:text-white">
              {getTableTitle()}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white border border-gray-300 rounded-[10px] px-3 py-2 justify-between">
                <input
                  placeholder="Search"
                  className="outline-none text-xs md:text-sm bg-transparent text-black placeholder:text-gray-500 w-full"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img alt="Search" width="10" height="10" src="/search-icon.svg" />
              </div>
              <div className="relative" ref={filterRef}>
                <button
                  className="p-3 rounded-[10px] bg-white border border-gray-300"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <img alt="Filter" width="12" height="12" src="/filter-icon.svg" />
                </button>
                {showFilterMenu && (
                  <div className="absolute bg-white border right-1 border-gray-300 rounded-xl mt-2 py-2 w-48 shadow-lg z-10">
                    {selectedCommissionButton === "Dispatched Payouts" && (
                      <>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white whitespace-nowrap"
                          onClick={() => {
                            setSelectedPaymentMethod("Bank");
                            setIsFiltered(true);
                          }}
                        >
                          Bank
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSelectedPaymentMethod("Mpesa");
                            setIsFiltered(true);
                          }}
                        >
                          Mpesa
                        </div>
                      </>
                    )}
                    {selectedCommissionButton === "Pending Payouts" && (
                      <>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white whitespace-nowrap"
                          onClick={() => {
                            setSelectedPaymentMethod("pendingAmount");
                            setIsFiltered(true);
                          }}
                        >
                          Pending Amount
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white whitespace-nowrap"
                          onClick={() => {
                            setSelectedPaymentMethod("lastPaymentDate");
                            setIsFiltered(true);
                          }}
                        >
                          Last Payment Date
                        </div>
                      </>
                    )}
                    {selectedCommissionButton === "Expected Commission" && (
                      <>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white whitespace-nowrap"
                          onClick={() => {
                            setSelectedPaymentMethod("unsubmittedAmount");
                            setIsFiltered(true);
                          }}
                        >
                          Unsubmitted Amount
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white whitespace-nowrap"
                          onClick={() => {
                            setSelectedPaymentMethod("limit");
                            setIsFiltered(true);
                          }}
                        >
                          Limit
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="relative" ref={sortRef}>
                <button
                  className="p-3 rounded-[10px] bg-white border border-gray-300"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  <img alt="Sort" width="12" height="12" src="/sort-icon.svg" />
                </button>
                {showSortMenu && (
                  <div className="absolute bg-white border right-2 border-gray-300 rounded-xl mt-2 py-2 w-36 shadow-lg z-10">
                    {selectedCommissionButton === "Dispatched Payouts" && (
                      <>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("amount");
                            setIsSorted(true);
                          }}
                        >
                          Amount
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("date");
                            setIsSorted(true);
                          }}
                        >
                          Date
                        </div>
                      </>
                    )}
                    {selectedCommissionButton === "Pending Payouts" && (
                      <>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("Active");
                            setIsSorted(true);
                          }}
                        >
                          Active
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("Offline");
                            setIsSorted(true);
                          }}
                        >
                          Offline
                        </div>
                      </>
                    )}
                    {selectedCommissionButton === "Expected Commission" && (
                      <>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("Active");
                            setIsSorted(true);
                          }}
                        >
                          Active
                        </div>
                        <div
                          className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                          onClick={() => {
                            setSortColumn("Inactive");
                            setIsSorted(true);
                          }}
                        >
                          Inactive
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            {(isFiltered || isSorted) && (
              <button
                className="bg-[#F58735] text-white py-2 px-6 rounded-[10px]"
                onClick={() => {
                  isFiltered ? clearFilters() : clearSort();
                }}
              >
                {isFiltered ? "Clear Filters" : "Clear Sortings"}
              </button>
            )}
          </div>
        </>
      )}

      {selectedTopButton === "Promotions" && (
        <>
          <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
            <MainCard title="Submitted Commission" value="58,000" imageSrc="/lsicon_badge-promotion-filled.svg" imageBgColor="#E5E4FF" />
            <MainCard title="Dispatched Payouts" value="4" imageSrc="/Group (1).svg" imageBgColor="#FFF3D6" />
            <MainCard title="Expected Commission" value="7,004" imageSrc="/Vector (1).svg" imageBgColor="#D9F7E8" />
            <MainCard title="Pending Payouts" value="6,540" imageSrc="/ic_round-discount.svg" imageBgColor="#FFDED1" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center mb-6">
            <div className="bg-[#F5F5F5] flex gap-3 lg:gap-4 items-center px-3 lg:px-5 py-2 rounded-[10px] w-[400px] md:w-[340px] shadow-md">
              <button
                className={`text-xs md:text-sm font-sans font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 whitespace-nowrap ${
                  promotionType === "Rides" ? "bg-white text-[#F58735]" : "text-black"
                }`}
                onClick={() => {
                  setPromotionType("Rides");
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1000);
                }}
              >
                Ride Promotions
              </button>
              <button
                className={`text-xs md:text-sm font-sans font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 whitespace-nowrap ${
                  promotionType === "Deliveries" ? "bg-white text-[#F58735]" : "text-black"
                }`}
                onClick={() => {
                  setPromotionType("Deliveries");
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1000);
                }}
              >
                Delivery Promotions
              </button>
            </div>

            <div className="flex items-center gap-3 mt-3 md:mt-0">
            <button
        className="px-4 py-2 border-[#F58735] border-2 rounded-[10px] text-[#F58735] text-sm font-medium hover:bg-[#F58735] hover:text-white"
        onClick={() => setIsAddPromotionModalOpen(true)}
      >
        Add Promotion
      </button>
      {isAddPromotionModalOpen && (
        <AddPromotionModal onClose={() => setIsAddPromotionModalOpen(false)} />
      )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center justify-between bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded-[10px] px-2 py-3 mb-6">
            <h2 className="text-lg font-semibold pl-4">
              Promotions for {promotionType}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white border border-gray-300 rounded-[10px] px-3 py-2 justify-between">
                <input
                  placeholder="Search promotions"
                  className="outline-none text-xs md:text-sm bg-transparent text-black placeholder:text-gray-500 w-full"
                  type="text"
                  value={searchPromotionTerm}
                  onChange={(e) => setSearchPromotionTerm(e.target.value)}
                />
                <img alt="Search" width="10" height="10" src="/search-icon.svg" />
              </div>
              <div className="relative" ref={filterRef}>
                <button
                  className="p-3 rounded-[10px] bg-white border border-gray-300"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <img alt="Filter" width="12" height="12" src="/filter-icon.svg" />
                </button>
                {showFilterMenu && (
                  <div className="absolute bg-white border right-1 border-gray-300 rounded-xl mt-2 py-2 w-48 shadow-lg z-10">
                    <div
                      className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                      onClick={() => {
                        setSelectedPaymentMethod("discount");
                        setIsFiltered(true);
                      }}
                    >
                      Discount
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                      onClick={() => {
                        setSelectedPaymentMethod("beneficiaries");
                        setIsFiltered(true);
                      }}
                    >
                      Beneficiaries
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                      onClick={() => {
                        setSelectedPaymentMethod("completedRides");
                        setIsFiltered(true);
                      }}
                    >
                      Completed Rides
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={sortRef}>
                <button
                  className="p-3 rounded-[10px] bg-white border border-gray-300"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  <img alt="Sort" width="12" height="12" src="/sort-icon.svg" />
                </button>
                {showSortMenu && (
                  <div className="absolute bg-white border right-1 border-gray-300 rounded-xl mt-2 py-2 w-36 shadow-lg z-10">
                    <div
                      className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                      onClick={() => {
                        setSortColumn("Active");
                        setIsSorted(true);
                      }}
                    >
                      Active
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer text-black hover:bg-[#F58735] hover:text-white"
                      onClick={() => {
                        setSortColumn("Inactive");
                        setIsSorted(true);
                      }}
                    >
                      Inactive
                    </div>
                  </div>
                )}
              </div>
            </div>
            {(isFiltered || isSorted) && (
              <button
                className="bg-[#F58735] text-white py-2 px-6 rounded-[10px]"
                onClick={() => {
                  isFiltered ? clearFilters() : clearSort();
                }}
              >
                {isFiltered ? "Clear Filters" : "Clear Sortings"}
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <button
                disabled
                type="button"
                className="text-white bg-[#F58735] hover:bg-[#e06c23] focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="white"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            </div>
          ) : filteredPromotions.length > 0 ? (
            <>
              <PromotionsTable columns={promotionsTableColumns} data={filteredPromotions} />

              <Paginations
                totalResults={filteredPromotions.length}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center text-[#F58735] py-10">
              <p>No results found for the promotion!</p>
              <button
                className="bg-[#F58735] text-white py-2 px-6 rounded-[10px] mt-4"
                onClick={resetResults}
              >
                Clear the Results
              </button>
            </div>
          )}
        </>
      )}

      {!selectedTopButton.includes("Promotions") && (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <button
                disabled
                type="button"
                className="text-white bg-[#F58735] hover:bg-[#e06c23] focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="white"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            </div>
          ) : paginatedDrivers.length > 0 ? (
            <>
              <DriversTable
                columns={getTableColumns()}
                data={paginatedDrivers}
                renderRowDrivers={selectedCommissionButton === "Pending Payouts" ? renderPendingPayoutsRows : renderRowDrivers}
              />
              <Paginations
                totalResults={filteredDrivers.length}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center text-[#F58735] py-10">
              <p>No results found for driver!</p>
              <button
                className="bg-[#F58735] text-white py-2 px-6 rounded-[10px] mt-4"
                onClick={resetResults}
              >
                Clear the Results
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FinancePage;