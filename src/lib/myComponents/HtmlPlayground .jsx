"use client";

import { useState, useEffect } from "react";

export default function HtmlPlayground({ initialHTML = "" }) {
  const [html, setHtml] = useState(initialHTML);

  return (
    <div className="border rounded-xl my-6 overflow-hidden shadow-md">
      <div className="bg-gray-100 p-2">
        <p className="text-xs text-gray-500 mb-1">HTML</p>
        <textarea
          className="w-full h-32 p-2 rounded bg-white font-mono text-sm"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      </div>

      <div className="bg-white p-4 border-t h-[300px]">
        <iframe
          srcDoc={html}
          title="HTML Output"
          sandbox=""
          frameBorder="0"
          width="100%"
          height="100%"
          className="rounded"
        />
      </div>
    </div>
  );
}
