import { useState, useEffect, useRef } from "react";

interface DropdownProps {
  buttonLabel: string;
  children: React.ReactNode;
}

const Dropdown = ({ buttonLabel, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer px-4 py-2 hover:text-white"
      >
        {buttonLabel}
      </span>

      {isOpen && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[160px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

