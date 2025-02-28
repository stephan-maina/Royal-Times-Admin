"use client";

import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Icon for close button

interface ModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>}

        {/* Modal Content */}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
