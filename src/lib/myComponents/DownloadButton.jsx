"use client";

export default function DownloadButton({ filename, label }) {
  const handleDownload = async () => {
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
      alert("You are not authorized or file is missing.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl shadow"
    >
      ⬇️ {label}
    </button>
  );
}
