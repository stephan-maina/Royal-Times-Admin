import { useState } from "react";

interface PaginationProps {
  totalResults: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalResults, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageSizes = [5, 10, 5];
  const totalPages = pageSizes.length;

  const startIndex = pageSizes.slice(0, currentPage - 1).reduce((sum, num) => sum + num, 0) + 1;
  const endIndex = startIndex + pageSizes[currentPage - 1] - 1;

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between py-5">
      <p className="font-medium text-sm">
        Showing {startIndex}-{Math.min(endIndex, totalResults)} of {totalResults}
      </p>
      <div className="border flex items-center border-gray-400 gap-4 rounded-md px-3 py-1">
        <button 
          onClick={handlePrev} 
          disabled={currentPage === 1} 
          className="disabled:opacity-50"
        >
          <img src="/left-arrow.svg" alt="Prev" width={12} height={12} />
        </button>
        <div className="border-l border-gray-400 h-5"></div>
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages} 
          className="disabled:opacity-50"
        >
          <img src="/right-arrow.svg" alt="Next" width={12} height={12} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;