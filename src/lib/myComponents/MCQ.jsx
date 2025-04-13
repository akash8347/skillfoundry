"use client";
import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

export default function MCQ({ question, options, correctAnswer, explanation }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    if (selected !== null) setSubmitted(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div className="border rounded-xl p-4 my-6 shadow-md bg-white dark:bg-gray-900">
      <p className="font-medium mb-4">{question}</p>

      <ul className="space-y-2">
        {options.map((option, idx) => {
          const isSelected = selected === idx;
          const isAnswer = correctAnswer === idx;

          let borderColor = "border-gray-300";
          let bgColor = "bg-white dark:bg-gray-800";
          let icon = null;

          if (submitted) {
            if (isSelected && isAnswer) {
              bgColor = "bg-green-100 dark:bg-green-800";
              borderColor = "border-green-400";
              icon = <Check size={18} className="text-green-600" />;
            } else if (isSelected && !isAnswer) {
              bgColor = "bg-red-100 dark:bg-red-800";
              borderColor = "border-red-400";
              icon = <X size={18} className="text-red-600" />;
            } else if (!isSelected && isAnswer) {
              bgColor = "bg-green-50 dark:bg-green-900";
              borderColor = "border-green-400";
              icon = <Check size={18} className="text-green-600" />;
            }
          }

          return (
            <li
            key={idx}
            onClick={() => !submitted && setSelected(idx)}
            className={`
              cursor-pointer flex items-center justify-between p-3 rounded border
              ${borderColor} 
              ${
                !submitted && isSelected
                  ? "bg-blue-100 dark:bg-blue-800 border-blue-400"
                  : bgColor
              }
              hover:bg-gray-100 dark:hover:bg-gray-700
            `}
          >
            <span>{option}</span>
            {icon}
          </li>
          
          );
        })}
      </ul>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-4 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Submit
        </button>
      )}

      {submitted && (
        <div className="mt-4">
          <p className={`font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
            {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
          </p>

          <button
            onClick={() => setShowExplanation((prev) => !prev)}
            className="text-sm text-blue-600 mt-2 flex items-center space-x-1"
          >
            {showExplanation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span>{showExplanation ? "Hide Explanation" : "Show Explanation"}</span>
          </button>

          {showExplanation && (
            <div className="mt-2 p-3 rounded bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
