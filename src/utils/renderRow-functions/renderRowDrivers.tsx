import React from 'react';
import { Drivers } from "@/types";

export const renderRowDrivers = (item: Drivers) => {
  return (
    <tr key={item.id} className="bg-white border-b hover:bg-pink-50 transition">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={item.imageSrc || "/default-avatar.jpg"}
            alt={item.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-sm">{item.name}</span>
        </div>
      </td>
      {item.amount && <td className="px-6 py-4 text-sm">KES {item.amount}</td>}
      {item.paymentMethod && <td className="px-6 py-4 text-sm">{item.paymentMethod}</td>}
      {item.date && <td className="px-6 py-4 text-sm">{item.date}</td>}
      {item.amountOwed && <td className="px-6 py-4 text-sm">KES {item.amountOwed}</td>}
      {item.unsubmittedAmount && <td className="px-6 py-4 text-sm">KES {item.unsubmittedAmount}</td>}
      {item.limit && <td className="px-6 py-4 text-sm">KES {item.limit}</td>}
      {item.activityStatus && (
        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-[10px] text-sm ${
              item.activityStatus === "Active"
                ? "bg-[#C1FFCB66] text-[#007C0C]"
                : item.activityStatus === "Inactive"
                ? "bg-[#FF00001A] text-[#FF0000]"
                : "bg-[#FFA5001A] text-[#FFA500]"
            }`}
          >
            {item.activityStatus}
          </span>
        </td>
      )}
      {item.pendingAmount && <td className="px-6 py-4 text-sm">KES {item.pendingAmount}</td>}
      {item.lastPaymentDate && <td className="px-6 py-4 text-sm">{item.lastPaymentDate}</td>}
    </tr>
  );
};