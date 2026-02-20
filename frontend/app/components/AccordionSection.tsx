"use client";

import { useState } from "react";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function AccordionSection({
  title,
  children,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left text-xl font-semibold hover:bg-gray-50 transition"
      >
        {title}
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && <div className="px-6 pb-6 border-t">{children}</div>}
    </div>
  );
}
