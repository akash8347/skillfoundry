// components/Note.jsx
export default function Note({ children }) {
    return (
      <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-500 px-4 py-4 rounded-md shadow-sm">
        <div className="text-yellow-800 dark:text-yellow-200 font-medium">
          📝 <span className="font-semibold">Note:</span> {children}
        </div>
      </div>
    );
  }
  