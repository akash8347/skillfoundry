


"use client";

import { useState, useEffect } from "react";

export default function HtmlCssPlayground({ initialHTML = "", initialCSS = "" }) {
  const [html, setHtml] = useState(initialHTML);
  const [css, setCss] = useState(initialCSS);
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const combined = `
        <html>
          <head><style>${css}</style></head>
          <body>${html}</body>
        </html>`;
      setSrcDoc(combined);
    }, 300);

    return () => clearTimeout(timeout);
  }, [html, css]);

  return (
    <div className="border rounded-xl my-6 overflow-hidden shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100">
        <div className="p-2 border-r">
          <p className="text-xs text-gray-500 mb-1">HTML</p>
          <textarea
            className="w-full h-32 p-2 rounded bg-white font-mono text-sm"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>
        <div className="p-2">
          <p className="text-xs text-gray-500 mb-1">CSS</p>
          <textarea
            className="w-full h-32 p-2 rounded bg-white font-mono text-sm"
            value={css}
            onChange={(e) => setCss(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-4 border-t">
        <iframe
          srcDoc={srcDoc}
          title="Live Output"
          sandbox=""
          frameBorder="0"
          width="100%"
          className="rounded"
          style={{ minHeight: "100px", height: "auto", overflow: "hidden" }}
        />
      </div>
    </div>
  );
}
