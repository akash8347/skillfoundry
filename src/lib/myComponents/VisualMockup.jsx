"use client";

import {
  Lightbulb,
  LayoutDashboard,
  Code2,
  BookOpen,
  Wrench,
  Image,
  Palette,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

// Color theme mapping
const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  yellow: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  gray: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300",
  },
};

// Icon mapping
const iconMap = {
  lightbulb: Lightbulb,
  dashboard: LayoutDashboard,
  code: Code2,
  book: BookOpen,
  tools: Wrench,
  image: Image,
  palette: Palette,
  globe: Globe,
};

// Padding options
const sizeMap = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

export default function VisualMockup({
  children,
  title = "Visual Representation",
  color = "blue",
  icon,
  size = "md",
  alignment = "left",
}) {
  const theme = colorMap[color] || colorMap.blue;
  const IconComponent = iconMap[icon] || null;
  const padding = sizeMap[size] || sizeMap.md;
  const alignClass = alignment === "center" ? "justify-center text-center" : "justify-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl border ${theme.border} shadow-lg overflow-hidden my-6`}
    >
      <div
        className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 ${alignClass} ${theme.bg} ${theme.text} border-b ${theme.border}`}
      >
        {IconComponent && <IconComponent className="w-4 h-4" />}
        {title}
      </div>
      <div className={`bg-white ${padding}`}>{children}</div>
    </motion.div>
  );
}
