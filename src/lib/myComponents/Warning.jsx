// components/Warning.jsx
export default function Warning({ children }) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl my-4">
        ⚠️ {children}
      </div>
    );
  }
  