"use client";
import { useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import DownloadButton from "./DownloadButton";

const pythonFiles = new Set([
  "30_DAYS_OF_PYTHON.pdf",
  "50_PYTHON_GAME_PROJECTS.pdf",
  "100_PYTHON_PROJECTS.pdf",
  "ARTIFICIAL_INTELLIGENCE_WITH_PYTHON.pdf",
  "AUTOMATION_USING_PYTHON.pdf",
  "WEB_DEVELOPMENT_USING_PYTHON.pdf",
]);

const javascriptFiles = new Set([
  "30_DAYS_OF_JAVASCRIPT.pdf",
  "CSS.pdf",
  "HTML.pdf",
  "JS-100-INTERVIEW-QUESTIONS.pdf",
  "JS-100-QUIZ.pdf",
]);

const allMaterials = [
  { filename: "30_DAYS_OF_PYTHON.pdf", label: "30 Days of Python" },
  { filename: "50_PYTHON_GAME_PROJECTS.pdf", label: "50 Python Game Projects" },
  { filename: "100_PYTHON_PROJECTS.pdf", label: "100 Python Projects" },
  { filename: "ARTIFICIAL_INTELLIGENCE_WITH_PYTHON.pdf", label: "Artificial Intelligence with Python" },
  { filename: "AUTOMATION_USING_PYTHON.pdf", label: "Automation Using Python" },
  { filename: "WEB_DEVELOPMENT_USING_PYTHON.pdf", label: "Web Development Using Python" },
  { filename: "30_DAYS_OF_JAVASCRIPT.pdf", label: "30 Days of JavaScript" },
  { filename: "CSS.pdf", label: "CSS Made Easy" },
  { filename: "HTML.pdf", label: "HTML Made Easy" },
  { filename: "JS-100-INTERVIEW-QUESTIONS.pdf", label: "100+ Interview Questions" },
  { filename: "JS-100-QUIZ.pdf", label: "100+ Quizzes/MCQs" },
];

export default function Materials() {
  const [pythonMaterials, setPythonMaterials] = useState([]);
  const [jsMaterials, setJsMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("/api/course-access");
        const data = await res.json();
        const allowed = data.materials || [];

        const allowedMaterials = allMaterials.filter(m => allowed.includes(m.filename));
        const python = allowedMaterials.filter(m => pythonFiles.has(m.filename));
        const js = allowedMaterials.filter(m => javascriptFiles.has(m.filename));

        setPythonMaterials(python);
        setJsMaterials(js);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const renderSection = (title, materials) => {
    if (materials.length === 0) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
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
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">📚 Downloadable Materials</h2>
        <p className="text-gray-600 mt-2">
          Access all the premium learning materials for this course below.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          <span className="ml-3 text-gray-600 text-lg">Loading materials...</span>
        </div>
      ) : (
        <>
          {renderSection("🐍 Python Downloads", pythonMaterials)}
          {renderSection("🟨 JavaScript Downloads", jsMaterials)}
        </>
      )}
    </div>
  );
}
