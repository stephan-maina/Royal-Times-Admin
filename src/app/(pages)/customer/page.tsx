"use client";

import MainCard from "@/components/MainCard";
import { CustomerTable } from "@/components/reusable-tables/CustomerTable"; // Named import
import { renderRowCustomer } from "@/utils/renderRow-functions/renderRowCustomer";
import { filterData, FilterCriteria } from "@/utils/filterData";
import { sortData } from "@/utils/sortData";
import { useState } from "react";
import {
  OnlineCustomers,
  inactiveCustomers,
  deletedCustomers,
  blockedCustomers,
  blockedColumnscustomers,
  OnlineColumnscustomers,
  inactiveColumnscustomers,
  deletedColumnscustomers,
} from "@/mockdata/data";
import Image from "next/image";
import Pagination from "@/components/Pagination";

const CustomerPage = () => {
  const [selectedButton, setSelectedButton] = useState("Online");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Use the exported FilterCriteria type for filters
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [loading, setLoading] = useState(false);

  const buttons = ["Online", "Inactive", "Deleted", "Blocked"];

  const getTableData = () => {
    switch (selectedButton) {
      case "Online":
        return { data: OnlineCustomers, columns: OnlineColumnscustomers };
      case "Inactive":
        return { data: inactiveCustomers, columns: inactiveColumnscustomers };
      case "Deleted":
        return { data: deletedCustomers, columns: deletedColumnscustomers };
      case "Blocked":
        return { data: blockedCustomers, columns: blockedColumnscustomers };
      default:
        return { data: [], columns: [] };
    }
  };

  const { data, columns } = getTableData();

  // Filter and sort data
  const filteredData = filterData<typeof data[number]>(data, searchTerm, filters);
  const sortedData = sortData(filteredData, sortColumn, sortOrder);

  const handleButtonClick = (button: string) => {
    setLoading(true);
    setSelectedButton(button);
    setTimeout(() => setLoading(false), 300);
  };

  const handleSortClick = (column: string) => {
    const order = sortColumn === column && sortOrder === "desc" ? "asc" : "desc";
    setSortColumn(column);
    setSortOrder(order);
  };

  // Use FilterCriteria here so that the type matches the utility function
  const handleFilterClick = (filter: FilterCriteria) => {
    setFilters(filter);
  };

  // Boolean indicating if any filter/search is applied
  const isAnyFilterApplied = Boolean(
    searchTerm || sortColumn || Object.keys(filters).length > 0
  );

  return (
    <div className="mx-2">
      {/* Top section with Cards */}
      <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
        <MainCard
          title="Registered Customers"
          value="10,000"
          imageSrc="/reg-customers.svg"
          imageBgColor="#E5E4FF"
        />
        <MainCard
          title="Active Customers"
          value="Ksh 200"
          imageSrc="/active-customers.svg"
          imageBgColor="#FFF3D6"
        />
        <MainCard
          title="Customer Satisfaction"
          value="80%"
          imageSrc="/cus-satisfaction.svg"
          imageBgColor="#D9F7E8"
        />
        <MainCard
          title="Total Rides Booked"
          value="15,000"
          imageSrc="/total-rides.svg"
          imageBgColor="#FFF3D6"
        />
      </div>

      {/* Bottom section */}
      <div className="mb-5">
        {/* Buttons and Add Customer button */}
        <div className="flex flex-col mb-4 md:flex-row justify-between items-center gap-3">
          <div className="bg-[#F5F5F5] flex gap-3 lg:gap-6 items-center px-3 lg:px-5 py-2 rounded-[10px] overflow-x-auto w-full md:w-auto">
            {buttons.map((button) => (
              <button
                key={button}
                onClick={() => handleButtonClick(button)}
                className={`text-xs md:text-sm font-sans font-medium rounded-[10px] px-3 hover:bg-[#FFF8F5] py-2 whitespace-nowrap ${
                  selectedButton === button ? "bg-white text-[#F58735]" : "text-black"
                }`}
              >
                {button}
              </button>
            ))}
          </div>

          <button className="flex items-center px-4 py-2 border-[#F58735] border-2 rounded-[10px] gap-3">
            <Image src="/plus icon.svg" alt="Add Customer Icon" width={11} height={11} />
            <span className="font-san text-[#F58735] text-sm font-medium">Add Customer</span>
          </button>
        </div>

        {/* Loading State or CustomerTable Component */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F58735]"></div>
          </div>
        ) : (
          <CustomerTable
            key={selectedButton}
            columns={columns}
            data={sortedData}
            renderRowCustomer={(item) => renderRowCustomer(item, selectedButton)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFilterClick={handleFilterClick}
            onSortClick={handleSortClick}
            selectedButton={selectedButton}
            resetFilters={() => {
              setSearchTerm("");
              setSortColumn(null);
              setSortOrder("asc");
              setFilters({});
            }}
            isAnyFilterApplied={isAnyFilterApplied}
          />
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default CustomerPage;