// components/Pagination.tsx
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center justify-between pb-5">
      <div className="flex items-center gap-1">
        <p className="font-sans font-medium text-sm">
          Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} of
        </p>
        <span className="font-sans font-medium text-sm">{totalCount}</span>
      </div>

      <div className="border flex items-center border-gray-400 gap-6 rounded-xl p-1">
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <Image src="/left-arrow.svg" alt="Previous" width={12} height={12} />
        </button>
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <Image src="/right-arrow.svg" alt="Next" width={12} height={12} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
