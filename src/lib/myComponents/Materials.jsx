import { Download } from "lucide-react";
import DownloadButton from "./DownloadButton";

export default function Materials() {
  const materials = [
    { filename: "30_DAYS_OF_PYTHON.pdf", label: "30 Days of Python" },
    { filename: "50_PYTHON_GAME_PROJECTS.pdf", label: "50 Python Game Projects" },
    { filename: "100_PYTHON_PROJECTS.pdf", label: "100 Python Projects" },
    { filename: "ARTIFICIAL_INTELLIGENCE_WITH_PYTHON.pdf", label: "Artificial Intelligence with Python" },
    { filename: "AUTOMATION_USING_PYTHON.pdf", label: "Automation Using Python" },
    { filename: "WEB_DEVELOPMENT_USING_PYTHON.pdf", label: "Web Development Using Python" },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">📚 Downloadable Materials</h2>
        <p className="text-gray-600 mt-2">
          Access all the premium learning materials for this course below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {materials.map(({ filename, label }) => (
          <div
            key={filename}
            className="bg-white border rounded-2xl shadow hover:shadow-md transition p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-800">{label}</span>
            </div>
            <DownloadButton filename={filename} label="Download" />
          </div>
        ))}
      </div>
    </div>
  );
}
