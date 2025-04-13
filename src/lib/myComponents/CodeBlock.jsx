export default function CodeBlock({ children, language = "html" }) {
    return (
      <pre className="bg-gray-900 text-white rounded-xl p-4 overflow-auto text-sm">
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
    );
  }
  