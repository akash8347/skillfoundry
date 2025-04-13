"use client";

import { useState } from "react";

export default function JsPlayground({ initialJs = "",children  }) {
  const [jsCode, setJsCode] = useState(children  || initialJs);
  const [output, setOutput] = useState("");

  const runCode = () => {
    const logs = [];
    const originalLog = console.log;

    // Capture console.log output
    console.log = (...args) => {
      logs.push(args.join(" "));
    };

    try {
      // eslint-disable-next-line no-eval
      eval(jsCode);
    } catch (error) {
      logs.push("❌ " + error.message);
    }

    console.log = originalLog; // restore original
    setOutput(logs.join("\n"));
  };

  return (
    <div className="border rounded-xl my-6 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 p-2">
        <p className="text-xs text-gray-500 mb-1">JavaScript</p>
        <textarea
          className="w-full h-32 p-2 rounded bg-white font-mono text-sm"
          value={jsCode}
          onChange={(e) => setJsCode(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center px-4 py-2 border-t bg-gray-50">
        <button
          onClick={runCode}
          className="bg-black text-white text-sm px-4 py-1 rounded hover:opacity-90"
        >
          ▶️ Run
        </button>
      </div>

      <div className="bg-black text-green-400 font-mono text-sm p-4 min-h-[100px] whitespace-pre-wrap">
        {output || "Console output will appear here..."}
      </div>
    </div>
  );
}
    