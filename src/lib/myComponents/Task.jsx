"use client";
export default function Task({ children }) {
  return (
    <div className="border-l-4 my-4 border-green-500 bg-green-50 p-4 text-green-800 rounded-md text-sm">
      📝 <span className="font-medium">Task:</span> {children}
    </div>
  );
}
