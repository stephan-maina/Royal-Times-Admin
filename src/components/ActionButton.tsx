import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  variant?: 'edit' | 'export';
  children: React.ReactNode;
}

const ActionButton = ({ 
  icon, 
  variant = 'edit',
  children,
  className,
  ...props 
}: ActionButtonProps) => {
  return (
    <button
    className={cn(
      "group flex items-center justify-center gap-2 rounded-full border-2 border-[#F97316] px-6 py-3",
      "text-[#F97316] transition-all duration-300 hover:bg-[#F97316] hover:text-white",
      "focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
    {icon && (
      <span className="transition-transform duration-300 group-hover:translate-y-[-2px]">
        {icon}
      </span>
    )}
  </button>

  );
};

export default ActionButton;