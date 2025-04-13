"use client";
import Link from "next/link";
export default function DownloadSection() {
  const handleDownload = async (filename) => {
    const res = await fetch(`/api/secure-download/${filename}`);

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert("Unauthorized or file not found");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <button
        onClick={() => handleDownload("30_DAYS_OF_JAVASCRIPT.pdf")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Download 30_DAYS_OF_JAVASCRIPT
      </button>
      <button
        onClick={() => handleDownload("CSS.pdf")}
        className="block bg-green-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Download CSS Guide
      </button>
      <button
        onClick={() => handleDownload("HTML.pdf")}
        className="block bg-green-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Download HTML Guide
      </button>

      <button
        onClick={() => handleDownload("JS-100-INTERVIEW-QUESTIONS.pdf")}
        className="block bg-green-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Download   100+INTERVIEW-QUESTIONS Guide
      </button>

      <button
        onClick={() => handleDownload("JS-100-QUIZ.pdf")}
        className="block bg-green-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Download   100-QUIZ/MCQs Guide
      </button>
      <button

        className="block bg-green-600 text-white px-4 py-2 rounded"
      >
        <Link className="text-white " href="/Dashboard/project">
        100+ Web projects
        </Link>
       
      </button>


    
    </div>
  );
}
