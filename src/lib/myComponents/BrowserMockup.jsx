// components/BrowserMockup.jsx
export default function BrowserMockup({ children }) {
    return (
      <div className="rounded-xl shadow-xl border border-gray-200 overflow-hidden my-6">
        <div className="bg-gray-100 px-4 py-2 flex gap-2">
          <span className="h-3 w-3 bg-red-400 rounded-full" />
          <span className="h-3 w-3 bg-yellow-400 rounded-full" />
          <span className="h-3 w-3 bg-green-400 rounded-full" />
        </div>
        <div className="p-4 bg-white">{children}</div>
      </div>
    );
  }
  