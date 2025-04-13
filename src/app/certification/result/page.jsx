"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar1 from "@/lib/myComponents/Navbar1";

export default function CertificationResultPage() {
  const router = useRouter();
  const [score, setScore] = useState(null);
  const [saving, setSaving] = useState(false);
  const passingScore = 1;

  useEffect(() => {
    const savedScore = parseInt(localStorage.getItem("certification_score"));
    if (isNaN(savedScore)) {
      router.push("/certification/exam"); // Redirect if no score
    } else {
      setScore(savedScore);
    }
  }, [router]);

  const passed = score !== null && score >= passingScore;

  useEffect(() => {
    const saveResultToBackend = async () => {
      try {
        setSaving(true);
        const res = await fetch("/api/save-certification-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score }),
        });

        const data = await res.json();
        if (!data.success) throw new Error("Could not save result");
      } catch (err) {
        console.error("Error saving exam result:", err);
      } finally {
        setSaving(false);
      }
    };

    if (passed) {
      saveResultToBackend();
    }
  }, [passed, score]);

  if (score === null) return <p className="p-6">Loading result...</p>;

  return (
    <>
      <Navbar1 />
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Certification Result</h2>
        <p className="text-lg mb-6">
          You scored <strong>{score}</strong> out of 50.
        </p>

        {passed ? (
          <>
            <p className="text-green-600 text-xl font-semibold mb-4">
              🎉 Congratulations! You passed.
            </p>
            <button
              onClick={() => router.push("/certification/certificate")}
              className="bg-green-600 text-white px-6 py-2 rounded"
              disabled={saving}
            >
              {saving ? "Saving..." : "Generate Certificate"}
            </button>
          </>
        ) : (
          <>
            <p className="text-red-600 text-xl font-semibold mb-4">
              ❌ You did not pass. Try again!
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("certification_score");
                router.push("/certification/exam");
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Retry Exam
            </button>
          </>
        )}
      </div>
    </>
  );
}
