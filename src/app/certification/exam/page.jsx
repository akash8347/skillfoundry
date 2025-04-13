"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar1 from "@/lib/myComponents/Navbar1";

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Machine Language"],
    correctAnswer: 0,
  },
 
 
  // ... add more until you reach 50
];

const QUESTIONS_PER_PAGE = 5;

export default function CertificationExamPage() {
  const router = useRouter();
  const [currentBatch, setCurrentBatch] = useState(0); // 0, 1, 2...
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({}); // {index: selectedOption}

  const totalBatches = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const start = currentBatch * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(start, end);

  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Your exam progress will be lost.";
    };
    window.addEventListener("beforeunload", confirmExit);
    return () => window.removeEventListener("beforeunload", confirmExit);
  }, []);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmitBatch = () => {
    let batchScore = 0;

    currentQuestions.forEach((q, i) => {
      const actualIndex = start + i;
      if (answers[actualIndex] === q.correctAnswer) {
        batchScore += 1;
      }
    });

    const newScore = score + batchScore;
    setScore(newScore);

    if (currentBatch + 1 < totalBatches) {
      setCurrentBatch(currentBatch + 1);
    } else {
      localStorage.setItem("certification_score", newScore);
      router.push("/certification/result");
    }
  };

  const isBatchComplete = currentQuestions.every((_, i) => {
    const index = start + i;
    return answers.hasOwnProperty(index);
  });

  return (
    <>
    <Navbar1/>
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Questions {start + 1} to {Math.min(end, questions.length)} of {questions.length}
      </h2>

      <div className="space-y-8">
        {currentQuestions.map((q, i) => {
          const questionIndex = start + i;
          return (
            <div key={questionIndex}>
              <p className="font-medium text-lg mb-2">
                {questionIndex + 1}. {q.question}
              </p>
              <ul className="space-y-2">
                {q.options.map((option, idx) => (
                  <li
                    key={idx}
                    className={`border px-3 py-2 rounded cursor-pointer transition ${
                      answers[questionIndex] === idx ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleOptionSelect(questionIndex, idx)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmitBatch}
          disabled={!isBatchComplete}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {currentBatch + 1 === totalBatches ? "Finish Exam" : "Next"}
        </button>
      </div>
    </div>


    </>

  );
}
