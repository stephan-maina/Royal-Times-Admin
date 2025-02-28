import Image from "next/image";
import React from "react";

interface MainCardProps {
  title: string; // Title for the card
  value: string; // Value to display
  imageSrc: string; // Source for the icon/image
  imageBgColor?: string; // Custom background color (can be a Tailwind class or a color code)
}

const MainCard: React.FC<MainCardProps> = ({
  title,
  value,
  imageSrc,
  imageBgColor = "bg-slate-100", // Default background color (Tailwind class)
}) => {
  // Check if the imageBgColor is a custom color code (starts with #)
  const isCustomColor = imageBgColor.startsWith("#");

  return (
    <div className="flex justify-between items-center px-6 py-5 w-full md:w-[25%] shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-105">
      {/* Left Section */}
      <div className="flex flex-col gap-2">
        <p className="font-sans text-sm font-normal">{title}</p>
        <span className="font-sans font-semibold text-xl">{value}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center">
        <div
          className="flex items-center justify-center p-4 rounded-2xl"
          style={isCustomColor ? { backgroundColor: imageBgColor } : undefined} // Apply custom color if provided
        >
          <Image src={imageSrc} alt={title} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default MainCard;
