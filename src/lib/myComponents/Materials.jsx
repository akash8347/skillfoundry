import DownloadButton from "./DownloadButton";

export default function Materials() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">📚 Downloadable Materials</h2>
      <p className="text-gray-600">
        Here you can download all the materials for the course.
      </p>

      <div className="space-y-4">
        <DownloadButton filename="html.pdf" label="HTML Cheatsheet" />
        <DownloadButton filename="CSS.pdf" label="CSS Guide" />
        <DownloadButton filename="30_DAYS_OF_JAVASCRIPT.pdf" label="30 days of JavaScript e-guide" />
        <DownloadButton filename="JS-100-INTERVIEW-QUESTIONS.pdf" label="100+ interview questions" />
        <DownloadButton filename="JS-100-QUIZ.pdf" label="100+ quizzes & mcqs" />

        
        {/* Add more as needed */}
      </div>
    </div>
  );
}