import React from 'react';
import { Drivers } from '@/types';

interface Column {
  header: string;
  accessor: string;
}

interface DriversTableProps {
  columns: Column[];
  data: Drivers[];
  renderRowDrivers: (item: Drivers) => JSX.Element;
}

const DriversTable = ({ columns, data, renderRowDrivers }: DriversTableProps) => {
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
          {data.map(renderRowDrivers)}
        </tbody>
      </table>
    </div>
  );
};

export default DriversTable;