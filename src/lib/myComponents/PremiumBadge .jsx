// PremiumBadge.jsx
import React from "react";
import { FaStar,FaBolt } from "react-icons/fa";
import { IoFlashOutline } from "react-icons/io5";

import clsx from "clsx";

const colorMap = {
  purple: { bg: "#f3e8ff", text: "#6b21a8", border: "#8b5cf6" },
  yellow: { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" },
  blue: { bg: "#dbeafe", text: "#1e3a8a", border: "#3b82f6" },
  pink: { bg: "#fce7f3", text: "#9d174d", border: "#ec4899" },
};

const PremiumBadge = ({ text = "Premium Resources", className = "", color = "purple" }) => {
  const selected = colorMap[color] || colorMap.purple;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium shadow-md",
        className
      )}
      style={{
        backgroundColor: selected.bg,
        color: selected.text,
        border: `1px solid ${selected.border}`,
        boxShadow: `0 2px 6px ${selected.border}33` // subtle shadow in the border color
      }}
    >
      <IoFlashOutline className="w-3 h-3" />
      {text}
    </span>
  );
};

export default PremiumBadge;
