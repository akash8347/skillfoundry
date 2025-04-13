"use client";

import React, { useState, useEffect } from "react";

const HtmlCssJsPlayground = ({ initialHTML = "", initialCSS = "", initialJS = "" }) => {
  const [html, setHtml] = useState(initialHTML);
  const [css, setCss] = useState(initialCSS);
  const [js, setJs] = useState(initialJS);
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              ${js}
            </script>
          </body>
        </html>
      `);
    }, 300);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="w-full my-6 border rounded-xl shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 text-sm bg-gray-100">
        <textarea
          className="p-2 font-mono border-b md:border-r h-48 resize-none"
          placeholder="HTML"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <textarea
          className="p-2 font-mono border-b md:border-r h-48 resize-none"
          placeholder="CSS"
          value={css}
          onChange={(e) => setCss(e.target.value)}
        />
        <textarea
          className="p-2 font-mono h-48 resize-none"
          placeholder="JavaScript"
          value={js}
          onChange={(e) => setJs(e.target.value)}
        />
      </div>
      <iframe
        className="w-full h-72 border-t"
        srcDoc={srcDoc}
        title="Live Output"
        sandbox="allow-scripts"
        frameBorder="0"
      />
    </div>
  );
};

export default HtmlCssJsPlayground;
