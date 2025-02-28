import React from 'react';
import { Promotion } from '@/types';

interface Column {
    header: string;
    accessor: keyof Promotion;
}  

interface PromotionsTableProps {
  columns: Column[];
  data: Promotion[];
}

const PromotionsTable = ({ columns, data }: PromotionsTableProps) => {
  const renderRow = (item: Promotion) => (
    <tr key={item.id} className="bg-white border-b hover:bg-pink-50 transition">
      <td className="px-6 py-4">
        <span className="font-medium text-sm">{item.name}</span>
      </td>
      <td className="px-6 py-4 text-sm">{item.creationDate}</td>
      <td className="px-6 py-4 text-sm">{item.discount}</td>
      <td className="px-6 py-4 text-sm">{item.beneficiaries}</td>
      <td className="px-6 py-4 text-sm">{item.completedRides}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-[10px] text-sm ${
            item.status === "Active"
              ? "bg-[#C1FFCB66] text-[#007C0C]"
              : "bg-[#FF00001A] text-[#FF0000]"
          }`}
        >
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm">{item.validity}</td>
    </tr>
  );

  return (
    <div className="relative overflow-x-auto bg-white rounded-[10px]">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead className="text-xs text-gray-700 bg-[#F5F5F5]">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionsTable;