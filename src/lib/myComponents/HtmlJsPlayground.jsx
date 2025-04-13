"use client";

import { useEffect, useRef, useState } from "react";

export default function HtmlJsPlayground({ initialHTML = "", initialJS = "" }) {
  const [html, setHtml] = useState(initialHTML);
  const [js, setJs] = useState(initialJS);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      // Combine HTML and JS into a complete working page
      const completeContent = `
        <html>
          <body>
            ${html}
            <script>
              ${js}
            <\/script>
          </body>
        </html>
      `;

      doc.open();
      doc.write(completeContent);
      doc.close();
    }
  }, [html, js]);

  return (
    <div className="w-full border rounded-lg p-4 mt-6 bg-white shadow-sm">
      <div className="flex gap-4 mb-4 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">HTML</label>
          <textarea
            className="w-full h-60 border rounded p-2 font-mono text-sm"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">JavaScript</label>
          <textarea
            className="w-full h-60 border rounded p-2 font-mono text-sm"
            value={js}
            onChange={(e) => setJs(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Preview</label>
        <iframe
          ref={iframeRef}
          className="w-full h-80 border rounded"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
