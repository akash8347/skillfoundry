"use client";
export default function Tip({ children }) {
  return (
    <div className="border-l-4 my-4 border-blue-500 bg-blue-50 p-4 text-blue-800 rounded-md text-sm">
      💡 <span className="font-medium">Tip:</span> {children}
    </div>
  );
}
